'use client'
import {Key, useEffect, useState} from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';

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

export default function SlowSwitches() {
    const [isDarkMode, setIsDarkMode] = useState(true);

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
    }, []); // Empty dependency array ensures this runs only once on mount


    // Use useSWR's isLoading state
    const { data, error, isLoading } = useSWR('/api/slowswitches', fetcher, {
        revalidateOnMount: true,
        refreshInterval: 10000, // 10 seconds
        dedupingInterval: 10000 // Deduplicate requests for 10 seconds
    });

    // --- Conditional Rendering based on SWR states ---

    if (error) {
        console.error('Error fetching data:', error);
        return <div className="text-red-500 dark:text-red-400 p-4">Error fetching data: {error.status || 'Unknown error'}</div>; {/* Added padding */}
    }

    if (isLoading) {
        // Use the loader while loading
        return (
            <div className={"flex justify-center p-4"}>
                <l-mirage size="70" speed="2.5" color={isDarkMode ? 'white' : 'black'}></l-mirage>
            </div>
        );
    }

    // After loading, check if data is valid and not empty
    // Added check for Array.isArray(data)
    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <div className={"flex justify-center p-4"}>
                <div className="text-center text-gray-500 dark:text-gray-400">No data available.</div>
            </div>
        );
    }

    // Assuming the data is an array of objects, and the first key holds the composite string
    // Let's extract the composite string key name once, assuming it's consistent
    // Add a safety check in case data[0] is undefined or null
    const compositeStringKey = data.length > 0 && Object.keys(data[0]).length > 0 ? Object.keys(data[0])[0] : null;


    // Calculate the count of items.
    // Your original code used data.length - 1. This might mean the first row is a header/summary.
    // If the API uses columns: true or columns: [...] in csv-parse, the header row should already be removed.
    // Let's assume data.length is the correct number of data rows to display.
    // If the API *does* send an extra header row you don't want,
    // you might need to filter it out here or fix the API.
    const itemCount = data.length; // Assuming all items in data are valid rows


    return (
        <div className={"sm:grid grid-cols-1 content-center p-4"}> {/* Added padding */}

            {/* Table Display */}
            {/* Changed overflow-x-hidden to overflow-x-auto */}
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        {/* Applied standard header cell styling */}
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">ID</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Raum</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Gebäude</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Latenz</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {data.map((row, index) => {
                        // Get the full composite string from the row using the determined key name
                        const compositeString = compositeStringKey ? row[compositeStringKey] : null;

                        // Safely split the string to get individual parts
                        const parts = compositeString ? String(compositeString).trim().split(" ") : [];

                        // Safely extract parts using their expected indices
                        // **This is the fragile part based on your data structure**
                        const id = parts.length > 0 ? parts[0] : '';
                        const raum = parts.length > 3 ? parts[3] : '';
                        const gebaeude = parts.length > 8 ? parts[8] : '';
                        const latency = parts.length > 14 ? parts[14] : ''; // Assuming latency is at index 14


                        return (
                            <motion.tr
                                key={id !== 'N/A' ? id : index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{raum}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{gebaeude}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{latency}</td>
                            </motion.tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {/* Separator line */}
            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
            </div>

            {/* Count Stat */}
            <div className="flex justify-center"> {/* Center the stats div */}
                <motion.div
                    className="stats shadow-lg dark:shadow-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="stat place-items-center"> {/* Applied standard stat item styling */}
                        <div className="stat-title text-gray-500 dark:text-gray-400">Anzahl Einträge</div> {/* Applied standard title styling, changed text */}
                        <div className="stat-value text-blue-600 dark:text-blue-400">{itemCount-1}</div> {/* Applied standard value styling */}
                    </div>
                </motion.div>
            </div>

        </div>
    );
}