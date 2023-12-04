import axios from 'axios';
import {parse} from 'csv-parse';
import iconv from 'iconv-lite';
export const dynamic = "force-dynamic";
export async function GET() {
    try {
        // Check if the environment variables are defined
        if (!process.env.BKWB_USERNAME || !process.env.BKWB_PASSWORD) {
            throw new Error('BKWB_USERNAME or BKWB_PASSWORD is not defined');
        }
        const response = await axios.get(
            "https://webdav.bkwb.org/Groups/Domain Admins/Monitoring/Rohdaten/NTMonitorSlow.csv",
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
    } catch (error: any) {
        console.error('Error fetching or parsing CSV:', error.message);
        return Response.json({ error: error.message });
    }
}