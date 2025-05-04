'use client'
import {ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key, useState, useEffect, useMemo} from 'react';
import useSWR from 'swr';

// Assuming your l-mirage loader is available globally or via CDN script include


const fetcher = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Add any necessary headers, such as authentication headers
        },
    });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the data.');
        try {
            error.info = await response.json();
        } catch {
            error.info = response.statusText;
        }
        error.status = response.status;
        throw error;
    }

    return response.json();
};

export default function IPOnOff() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const { data, error, isLoading } = useSWR('/api/iponoff', fetcher, {
        revalidateOnMount: true,
        refreshInterval: 5000,
        // Consider adding fallbackData: [] if your API always returns an array
    });

    // Detect dark mode using useEffect (client-side only)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDarkMode);
            // Optional: listen for changes
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e) => setIsDarkMode(e.matches);
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, []);

    // --- Calculate totals *before* rendering ---
    const { totalIPon, totalIPoff } = useMemo(() => {
        let currentTotalIPon = 0;
        let currentTotalIPoff = 0;

        if (data && Array.isArray(data)) {
            data.forEach(row => {
                // **Safely access using the new named keys from the API**
                // Use || 0 in case the value is missing or not a number
                const onValue = parseInt(row.pcs_on, 10) || 0;
                const offValue = parseInt(row.pcs_off, 10) || 0;
                currentTotalIPon += onValue;
                currentTotalIPoff += offValue;
            });
        }

        return { totalIPon: currentTotalIPon, totalIPoff: currentTotalIPoff };
    }, [data]);

    // --- Derived state (percentage) ---
    const percentageIPOn = useMemo(() => {
        const total = totalIPon + totalIPoff;
        if (total === 0) return 0;
        return Math.floor((totalIPon / total) * 100);
    }, [totalIPon, totalIPoff]);


    // --- Conditional Rendering based on SWR states ---

    if (error) {
        console.error('Error fetching data:', error);
        return <div className="text-red-500 dark:text-red-400">Error fetching data: {error.status || 'Unknown error'}</div>;
    }

    if (isLoading) {
        return (
            <div className={"flex justify-center p-4"}>
                <l-mirage size="70" speed="2.5" color={isDarkMode ? 'white' : 'black'}></l-mirage>
            </div>
        );
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <div className={"flex justify-center p-4"}>
                <div className="text-center text-gray-500 dark:text-gray-400">No data available.</div>
            </div>
        );
    }


    return (
        <div className={"sm:grid grid-cols-1 content-center p-4"}>

            {/* Table Display */}
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Ort</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Computer An</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Computer Aus</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Start Zeit</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">End Zeit</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {/* Map directly over the data rows received from the API */}
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                {/* Access using the new named keys */}
                                {row.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                {/* Access using the new named keys */}
                                {row.pcs_on}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                {/* Access using the new named keys */}
                                {row.pcs_off}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                {/* Access using the new named keys */}
                                {row.start_time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                {/* Access using the new named keys */}
                                {row.end_time}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}