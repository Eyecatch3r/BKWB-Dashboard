'use client'
import useSWR from 'swr';
import horizontalLine from "@/app/components/horizontalLine";
import {Key, useEffect, useState} from 'react';

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

export default function APMonitor() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        // Logic to detect user's preferred color scheme
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDarkMode);
    }, []);

    const { data, error } = useSWR('/api/apmonitor', fetcher, {
        revalidateOnMount: true, refreshInterval: 0
    });

    if (error) {
        console.log(error)
        console.error('Error fetching data:', error);
        return <div>Error fetching data</div>;
    }

    return (
        <div className={"sm:grid grid-cols-1 content-center"}>
            {data ? (!data.error ? (
                <div className="overflow-x-auto">
                    <table className={"min-w-full"}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Raum</th>
                            <th>Gebäude</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td className={"td"} key={Object.keys(row)[0]}>
                                    {row[Object.keys(row)[0]].trim().split(" ")[0]}
                                </td>
                                <td className={"td"} key={Object.keys(row)[0]}>
                                    {row[Object.keys(row)[0]].trim().split(" ")[3]}
                                </td>
                                <td className={"td"} key={Object.keys(row)[0]}>
                                    {row[Object.keys(row)[0]].trim().split(" ")[8]}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
                    </div>
                    <div className="inline-flex items-center justify-center w-full">
                        <div className="stats shadow">
                            <div className="stat place-items-center">
                                <div className="stat-title">Anzahl</div>
                                <div className="stat-value">{data.length - 1}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={"flex justify-center"}> <l-mirage size="70" speed="2.5" color={!isDarkMode ? 'black' : 'white'}></l-mirage> </div>
            )): (<div className={"flex justify-center"}><l-mirage className={"flex justify-center"} size="70" speed="2.5" color={!isDarkMode ? 'black' : 'white'}></l-mirage></div>)}
            {<div className={"flex justify-center"}> <l-mirage size="70" speed="2.5" color={!isDarkMode ? 'black' : 'white'}></l-mirage> </div>}
        </div>
    );


}
