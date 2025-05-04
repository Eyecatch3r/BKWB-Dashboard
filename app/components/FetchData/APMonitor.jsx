'use client'
import useSWR from 'swr';
// import horizontalLine from "@/app/components/horizontalLine"; // Not used, can remove if not needed
import {Key, useEffect, useState, useMemo} from 'react'; // Added useMemo

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


// Helper function to parse the timestamp string and format it
function parseAndFormatTimestamp(timestampString) {
    if (!timestampString || typeof timestampString !== 'string') {
        return 'Invalid Timestamp Data'; // Handle empty or non-string input
    }

    // Expected format: "HH:mm:ss DD.MM.YYYY"
    const parts = timestampString.trim().split(" ");

    if (parts.length !== 2) {
        // This case means the combined time/date string wasn't correctly formed
        // e.g., it might be missing either time or date part after the split from the main string
        return 'Format Error';
    }

    const timePart = parts[0]; // e.g., "10:00:44"
    const datePart = parts[1]; // e.g., "02.05.2025"

    const timeParts = timePart.split(':');
    const dateParts = datePart.split('.');

    if (timeParts.length !== 3 || dateParts.length !== 3) {
        return 'Parse Error'; // Time or date parts didn't split correctly
    }

    const [hours, minutes, seconds] = timeParts.map(Number);
    // Note: Month is 0-indexed in Date constructor (0 for Jan, 11 for Dec)
    const [day, month, year] = dateParts.map(Number);

    // Basic validation for numbers and ranges
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) ||
        isNaN(day) || isNaN(month) || isNaN(year) ||
        month < 1 || month > 12 || day < 1 || day > 31 || year < 1000) {
        return 'Value Error';
    }


    // Create Date object.
    // Using new Date(year, monthIndex, day, hours, minutes, seconds)
    // We subtract 1 from the month because getMonth() returns 0-11
    const dateObj = new Date(year, month - 1, day, hours, minutes, seconds);

    // Check if the created date is valid (e.g., handles Feb 30th)
    if (isNaN(dateObj.getTime())) {
        return 'Invalid Date'; // e.g. invalid day/month combo
    }


    // Format the date for display
    // Using toLocaleString provides user-friendly output based on browser locale
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Use 24-hour format
    };

    return dateObj.toLocaleString(undefined, options);

    // Alternative: Custom format if you don't want locale formatting
    // const formattedDate = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
    // const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    // return `${formattedTime} ${formattedDate}`;
}


export default function APMonitor() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Use useSWR's isLoading state
    const { data, error, isLoading } = useSWR('/api/apmonitor', fetcher, {
        revalidateOnMount: true,
        refreshInterval: 5000 // Changed interval from 0 to 5000 (5 seconds) for refreshing data
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
    }, []); // Empty dependency array ensures this runs only once on mount

    // --- Conditional Rendering based on SWR states ---

    if (error) {
        console.error('Error fetching data:', error);
        // Display error status or info if available
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
    const compositeStringKey = Object.keys(data[0])[0]; // Get the name of the first key from the first object

    // Calculate the count of items.
    // Your original code used data.length - 1. This might mean the first row is a header/summary.
    // If the API uses columns: true in csv-parse, the header row should already be removed.
    // Let's assume data.length is the correct number of data rows to display.
    // If the API *does* send an extra header row you don't want,
    // you might need to filter it out here or fix the API.
    const itemCount = data.length; // Assuming all items in data are valid rows


    return (
        <div className={"sm:grid grid-cols-1 content-center p-4"}> {/* Added padding */}

            {/* Table Display */}
            <div className="overflow-x-auto shadow-md rounded-lg"> {/* Added shadow and rounded corners */}
                <table className="text-center min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">ID</th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Raum</th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Gebäude</th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Ausfallzeitpunkt</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {data.map((row, index) => {
                        // Get the full composite string from the row
                        const compositeString = row[compositeStringKey]; // Access using the determined key name

                        // Split the string to get individual parts
                        const parts = compositeString ? compositeString.trim().split(" ") : [];

                        // Safely extract parts using their expected indices
                        // **This is the fragile part based on your data structure**
                        const id = parts.length > 0 ? parts[0] : 'N/A';
                        const raum = parts.length > 3 ? parts[3] : 'N/A';
                        const gebaeude = parts.length > 8 ? parts[8] : 'N/A';
                        const timestampPart1 = parts.length > 14 ? parts[14] : null; // Time string
                        const timestampPart2 = parts.length > 15 ? parts[15] : null; // Date string

                        // Combine the time and date parts for parsing
                        const fullTimestampString = (timestampPart1 && timestampPart2) ? `${timestampPart1} ${timestampPart2}` : null;


                        return (
                            // Use a unique key for the row, ideally the ID if it's unique
                            // Fallback to index if ID might not be unique or parts are missing
                            <tr key={id !== 'N/A' ? id : index}>
                                {/* Removed key from td elements */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{raum}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{gebaeude}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                    {/* Pass the combined timestamp string to the parsing function */}
                                    {parseAndFormatTimestamp(fullTimestampString)}
                                </td>
                            </tr>
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
            <div className="inline-flex items-center justify-center w-full">
                <div className="stats shadow-lg dark:shadow-gray-800"> {/* Added shadow */}
                    <div className="stat place-items-center">
                        <div className="stat-title text-gray-500 dark:text-gray-400">Anzahl Einträge</div> {/* More descriptive title */}
                        <div className="stat-value text-blue-600 dark:text-blue-400">{itemCount}</div> {/* Added text color */}
                    </div>
                </div>
            </div>

            {/* Removed the extra loader divs */}

        </div>
    );
}