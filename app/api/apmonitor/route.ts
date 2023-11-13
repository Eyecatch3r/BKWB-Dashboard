import axios from 'axios';
import {parse} from 'csv-parse';
import iconv from 'iconv-lite';

export async function GET() {
    try {
        const response = await axios.get(
            "https://webdav.bkwb.org/Groups/Domain Admins/Monitoring/Rohdaten/APMonitor.csv",
            {
                auth: {
                    username: process.env.BKWB_USERNAME,
                    password: process.env.BKWB_PASSWORD,
                },
                responseType: 'arraybuffer', // Ensure the response is treated as an ArrayBuffer
            }
        );

        // Parse CSV data using csv-parse
        const parsedData = await new Promise((resolve, reject) => {
            const decodedData = iconv.decode(Buffer.from(response.data), 'utf-16le');
            parse(decodedData, { columns: true, trim: true }, (err, records) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(records);
                }
            });
        });

        return Response.json(parsedData);
    } catch (error) {
        console.error('Error fetching or parsing CSV:', error.message);
        return Response.json({ error: error.message });
    }
}