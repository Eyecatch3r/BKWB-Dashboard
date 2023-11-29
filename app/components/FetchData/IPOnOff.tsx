'use client'
import {ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key, useState, useEffect} from 'react';
import useSWR from 'swr';
import {RequestInfo} from 'undici-types';

const fetcher = async (url: RequestInfo) => {
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

export default function IPOnOff() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        // Logic to detect user's preferred color scheme
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDarkMode);
    }, []);

    const {data, error} = useSWR('/api/iponoff', fetcher, {
        revalidateOnMount: true, refreshInterval: 5000
    });

    if (error) {
        console.error('Error fetching data:', error);
        return <div>Error fetching data</div>;
    }

    return (
        <div className={"sm:grid grid-cols-1 content-center"}>
            {data ? ( !data.error ? (
                <div className="overflow-x-auto">
                    <table className={"min-w-full"}>
                        <thead>
                        <tr>
                            <th>Ort</th>
                            <th>Computer An</th>
                            <th>Computer Aus</th>
                            <th>Start Zeit</th>
                            <th>End Zeit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((row,index: Key | null | undefined) => (
                            <tr key={index}>
                                <td className={"td"} key={Object.keys(row)[0]}>
                                    {row[Object.keys(row)[2]]}
                                </td>
                                <td className={"td"} key={Object.keys(row)[1]}>
                                    {row[Object.keys(row)[0]]}
                                </td>
                                <td className={"td"} key={Object.keys(row)[2]}>
                                    {row[Object.keys(row)[1]]}
                                </td>
                                <td className={"td"} key={Object.keys(row)[3]}>
                                    {row[Object.keys(row)[3]]}
                                </td>
                                <td className={"td"} key="4">
                                    {row[Object.keys(row)[4]]}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={"flex justify-center"}> <l-mirage size="70" speed="2.5" color={!isDarkMode ? 'black' : 'white'}></l-mirage> </div>
            )): (<div className={"flex justify-center"}> <l-mirage size="70" speed="2.5" color={!isDarkMode ? 'black' : 'white'}></l-mirage> </div>)}
            <div className={"flex justify-center"}> <l-mirage size="70" speed="2.5" color={!isDarkMode ? 'black' : 'white'}></l-mirage> </div>
        </div>
    );

}
