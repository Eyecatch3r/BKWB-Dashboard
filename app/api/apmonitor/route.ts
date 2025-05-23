import axios from 'axios';
import {parse} from 'csv-parse';
import iconv from 'iconv-lite';

let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 30 * 1000; // 30 seconds

export const revalidate = 0
export async function GET() {
    const now = Date.now();
    if (cache.data && (now - cache.timestamp < CACHE_DURATION)) {
        return Response.json(cache.data);
    }
    try {
        // Check if the environment variables are defined
        if (!process.env.BKWB_USERNAME || !process.env.BKWB_PASSWORD) {
            throw new Error('BKWB_USERNAME or BKWB_PASSWORD is not defined');
        }
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
        cache = { data: parsedData, timestamp: now };
        return Response.json(parsedData);
    } catch (error: any) {
        console.error('Error fetching or parsing CSV:', error.message);
        return Response.json({ error: error.message });
    }
}