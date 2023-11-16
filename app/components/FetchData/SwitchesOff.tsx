'use client'
import useSWR from 'swr';
import {debug} from "util";

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
    const {data: data, error} = useSWR('/api/switchesoff', fetcher);
    if (error) {
        console.log(error)
        console.error('Error fetching data:', error);
        return <div>Error fetching data</div>;
    }

    return (
        <div className={"sm:grid grid-cols-1 content-center"}>
            {data ? (
                <div className="overflow-x-hidden">
                    {isEmpty(data)? (<div><table className={"min-w-full"}>
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
                            <tr key={index}>
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
                            </tr>
                        ))}
                        </tbody>
                    </table>
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
                        </div>
                        <div className="inline-flex items-center justify-center w-full">
                        <h3 className={"bold"}>Anzahl: {data.length - 1}</h3>
                        </div>
                    </div>): (<p>Alles Erreichbar</p>)}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );

}
