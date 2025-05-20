'use client'
import {ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key, useState, useEffect, useMemo} from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';

// Assuming your l-mirage loader is available globally or via CDN script include
// If using a library like ldrs, you might still need to register it:
// import { mirage } from 'ldrs';
// mirage.register();

const fetcher = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Add any necessary headers, such as authentication headers
            // 'Authorization': `Bearer ${yourToken}` // Example
        },
    });

    if (!response.ok) {
        // Throw the response itself or relevant info for better error handling in useSWR
        const error = new Error('An error occurred while fetching the data.');
        // Attach extra info to the error object.
        try {
            error.info = await response.json(); // Attempt to parse JSON error details
        } catch {
            error.info = response.statusText; // Fallback to status text
        }
        error.status = response.status;
        throw error;
    }

    return response.json();
};

export default function IPStats() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Use useSWR's isLoading state
    const { data, error, isLoading } = useSWR('/api/iponoff', fetcher, {
        revalidateOnMount: true,
        refreshInterval: 10000, // 10 seconds
        dedupingInterval: 10000 // Deduplicate requests for 10 seconds
    });

    // State for the calculated totals
    const [totalIPon, setTotalIPon] = useState(0);
    const [totalIPoff, setTotalIPoff] = useState(0);


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

    // Use useEffect to calculate totals whenever data changes
    useEffect(() => {
        if (data && Array.isArray(data)) {
            let on = 0;
            let off = 0;

            data.forEach((row) => {
                // **Important:** Still relying on fragile key order here.
                // Safest approach is named keys from the API.
                const onValue = parseInt(row.pcs_on, 10) || 0;
                const offValue = parseInt(row.pcs_off, 10) || 0;
                on += onValue;
                off += offValue;
            });

            setTotalIPon(on);
            setTotalIPoff(off);

        } else {
            // Reset totals if data becomes null, undefined, or not an array
            setTotalIPon(0);
            setTotalIPoff(0);
        }
    }, [data]); // Recalculate totals whenever 'data' changes

    // Use useMemo to calculate percentage efficiently
    const percentageIPOn = useMemo(() => {
        const total = totalIPon + totalIPoff;
        if (total === 0) return 0; // Avoid division by zero
        return Math.floor((totalIPon / total) * 100);
    }, [totalIPon, totalIPoff]); // Recalculate when totals change


    // --- Conditional Rendering based on SWR states ---

    if (error) {
        console.error('Error fetching data:', error);
        // Display error status or info if available
        return <div className="text-red-500 dark:text-red-400">Error fetching data: {error.status || 'Unknown error'}</div>;
    }

    if (isLoading) {
        // Use the loader while loading
        // Assuming 'l-mirage' is available globally due to CDN
        return (
            <div className={"flex justify-center p-4"}> {/* Added padding */}
                {/* Keeping the loader as requested, assuming CDN load */}
                <l-mirage size="70" speed="2.5" color={isDarkMode ? 'white' : 'black'}></l-mirage>
            </div>
        );
    }

    // After loading, check if data is valid and not empty
    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <div className={"flex justify-center p-4"}> {/* Added padding */}
                <div className="text-center text-gray-500 dark:text-gray-400">No data available.</div>
            </div>
        );
    }

    // --- Render the stats once data is loaded and valid ---
    return (
        <div className={"sm:grid grid-cols-1 content-center p-4"}> {/* Added padding */}

            <div className={"flex justify-center mb-4"}>
                <motion.div
                    className="stats stats-vertical shadow-lg dark:shadow-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="stat place-items-center">
                        <div className="stat-title text-gray-500 dark:text-gray-400">Devices On</div>
                        <div className="stat-value text-green-600 dark:text-green-400">{totalIPon}</div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-title text-gray-500 dark:text-gray-400">Devices Off</div>
                        <div className="stat-value text-red-600 dark:text-red-400">{totalIPoff}</div>
                    </div>
                </motion.div>
            </div>

            {/* Percentage Stat */}
            <motion.div
                className="flex justify-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="stats shadow-lg dark:shadow-gray-800">
                    <div className="stat place-items-center">
                        <div className="stat-title text-gray-500 mb-4 dark:text-gray-400">Percentage On</div>
                        <div className="stat-value">
                            <div className="radial-progress text-xl text-primary"
                                style={{ "--value": percentageIPOn, "--size": "5rem" }}
                                role="progressbar"
                            >
                                {percentageIPOn}%
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
            </div>

        </div>
    );
}