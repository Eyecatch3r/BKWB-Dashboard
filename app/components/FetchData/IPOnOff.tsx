'use client'
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from 'react';
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
    const {data, error} = useSWR('/api/iponoff', fetcher);

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
                        {data.map((row: {
                            [x: string]: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined;
                        }, index: Key | null | undefined) => (
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
                <div></div>
            )) : (
                <div>Loading...</div>
            )}
        </div>
    );

}
