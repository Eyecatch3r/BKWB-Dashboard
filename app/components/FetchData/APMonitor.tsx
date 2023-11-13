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

export default function APMonitor() {
    const {data: data, error} = useSWR('/api/apmonitor', fetcher);

    if (error) {
        console.log(error)
        console.error('Error fetching data:', error);
        return <div>Error fetching data</div>;
    }

    console.log(data)

    return (
        <div className={"sm:grid grid-cols-1 content-center"}>
            {data ? (
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
                                {Object.entries(row).map(([key, value]) => {
                                    const trimmedValue = value.trim();
                                    const trimmedValueArray = trimmedValue.split(" ");
                                    return (
                                        <td key={key}>
                                            {trimmedValueArray[0]}
                                        </td>
                                    );
                                })}
                                {Object.entries(row).map(([key, value]) => {
                                    const trimmedValue = value.trim();
                                    const trimmedValueArray = trimmedValue.split(" ");
                                    return (
                                        <td key={key}>
                                            {trimmedValueArray[3]}
                                        </td>
                                    );
                                })}
                                {Object.entries(row).map(([key, value]) => {
                                    const trimmedValue = value.trim();
                                    const trimmedValueArray = trimmedValue.split(" ");
                                    return (
                                        <td key={key}>
                                            {trimmedValueArray[8]}
                                        </td>
                                    );
                                })}
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
