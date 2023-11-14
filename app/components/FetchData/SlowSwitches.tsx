'use client'
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

export default function SlowSwitches() {
    const {data: data, error} = useSWR('/api/slowswitches', fetcher);
    if (error) {
        console.log(error)
        console.error('Error fetching data:', error);
        return <div>Error fetching data</div>;
    }

    return (
        <div className={"sm:grid grid-cols-1 content-center"}>
            {data ? (
                <div className="overflow-x-hidden">
                    <table className={"min-w-full"}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Raum</th>
                            <th>Gebäude</th>
                            <th>Latenz</th>
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
                                <td className={"td"} key={Object.keys(row)[0]}>
                                    {row[Object.keys(row)[0]].trim().split(" ")[14]}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );

}
