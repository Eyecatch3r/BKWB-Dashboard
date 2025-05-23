'use client'
import {Key, useEffect, useState} from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';

const fetcher = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Add any necessary headers, such as authentication headers
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return response.json();
};

function isEmpty(data) {
    let currentRow;
    data.map(row => {
        currentRow = row[Object.keys(row)[0]]
    })

    return !!currentRow
}

export default function SlowSwitches() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        // Logic to detect user's preferred color scheme
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDarkMode);
    }, []);

    const {data: data, error} = useSWR('/api/switchesoff', fetcher, {
        revalidateOnMount: true,
        refreshInterval: 10000, // 10 seconds
        dedupingInterval: 10000 // Deduplicate requests for 10 seconds
    });
    if (error) {
        console.log(error)
        console.error('Error fetching data:', error);
        return <div>Error fetching data</div>;
    }

    return (
        <div className={"sm:grid grid-cols-1 content-center"}>
            {data ? ( !data.error ? (
                <div className="overflow-x-hidden">
                    {isEmpty(data) ? (<div>
                        <table className={"text-center table min-w-full"}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Raum</th>
                                <th>Gebäude</th>
                                <th>IP</th>
                                <th>OffZeit</th>
                                <th>OffDatum</th>
                                <th>AktZeit</th>
                                <th>AktDatum</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((row, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <td className={"td"} key={Object.keys(row)[0]}>
                                        {row[Object.keys(row)[0]] ? row[Object.keys(row)[0]].trim().split(",")[0] : "Alle Erreichbar"}
                                    </td>
                                    <td className={"td"} key={Object.keys(row)[0]}>
                                        {row[Object.keys(row)[1]] ? row[Object.keys(row)[1]].trim().split(",")[0] : ""}
                                    </td>
                                    <td className={"td"} key={Object.keys(row)[0]}>
                                        {row[Object.keys(row)[2]] ? row[Object.keys(row)[2]].trim().split(",")[0] : ""}
                                    </td>
                                    <td className={"td"} key={Object.keys(row)[0]}>
                                        {row[Object.keys(row)[3]] ? row[Object.keys(row)[3]].trim().split(",")[0] : ""}
                                    </td>
                                </motion.tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
                        </div>
                        <motion.div
                            className="inline-flex items-center justify-center w-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="stats shadow">
                                <div className="stat place-items-center">
                                    <div className="stat-title">Anzahl</div>
                                    <div className="stat-value">{data.length - 1}</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>): (<p>Alles Erreichbar</p>)}
                </div>
            ) : (
                <div className={"flex justify-center"}> <l-mirage size="70" speed="2.5" color={!isDarkMode ? 'black' : 'white'}></l-mirage> </div>
            )): (<div className={"flex justify-center"}> <l-mirage size="70" speed="2.5" color={!isDarkMode ? 'black' : 'white'}></l-mirage> </div>)}

        </div>
    );

}
