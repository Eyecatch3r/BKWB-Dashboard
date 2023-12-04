'use client'
import {ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key, useState, useEffect} from 'react';
import useSWR from 'swr';
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

export default function IPStats() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    let [IPon, setIPon] = useState(0);
    let [IPoff, setIPoff] = useState(0);
    const {data, error} = useSWR('/api/iponoff', fetcher, {
        revalidateOnMount: true, refreshInterval: 5000
    });

    useEffect(() => {
        if (data) {
            const [newIPon, newIPoff] = getListOfIPs(data);
            setIPon(newIPon);
            setIPoff(newIPoff);
        }
    }, [data]);



    if (error) {
        console.error('Error fetching data:', error);
        return <div>Error fetching data</div>;
    }

    function getListOfIPs(data) {
        let on = 0;
        let off = 0;

        data.forEach((row) => {
            on += parseInt(row[Object.keys(row)[0]]);
            off += parseInt(row[Object.keys(row)[1]]);
        });

        return [on, off];
    }

    function getPercentageIPOn(){
        return Math.floor((IPon/(IPon+IPoff))*100)
    }

    return (
        <div className={"sm:grid grid-cols-1 content-center"}>
            {data ? ( !data.error ? (
                <>
                    <div className={"flex justify-center mb-4"}>
                        <div className="stats stats-vertical shadow">

                            <div className="stat place-items-center">
                                <div className="stat-title">Devices On</div>
                                <div className="stat-value">{IPon}</div>
                            </div>

                            <div className="stat place-items-center">
                                <div className="stat-title">Devices Off</div>
                                <div className="stat-value">{IPoff}</div>
                            </div>
                        </div>
                    </div>
                    <div className={"flex justify-center mb-4"}>
                        <div className="stats shadow">
                            <div className="stat">
                                <div className="stat-title">Percentage</div>
                                <div className="stat-title">
                                    <div className="radial-progress text-primary"
                                         style={{"--value": getPercentageIPOn()}}
                                         role="progressbar">{getPercentageIPOn()}%
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </>
            ) : (
                <div className={"flex justify-center"}> <l-mirage size="70" speed="2.5" color={!isDarkMode ? 'black' : 'white'}></l-mirage> </div>
            )): (<div className={"flex justify-center"}> <l-mirage size="70" speed="2.5" color={!isDarkMode ? 'black' : 'white'}></l-mirage> </div>)}
            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
            </div>
        </div>
    );

}

