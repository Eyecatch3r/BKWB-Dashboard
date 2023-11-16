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

export default function IPOnOff() {
    const { data, error } = useSWR('/api/iponoff', fetcher);

    if (error) {
        console.error('Error fetching data:', error);
        return <div>Error fetching data</div>;
    }

    return (
        <div className={"sm:grid grid-cols-1 content-center"}>
            {data ? (
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
                        {data.map((row, index) => (
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
                <div>Loading...</div>
            )}
        </div>
    );

}
