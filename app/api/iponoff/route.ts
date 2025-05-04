import axios from 'axios';
import {parse} from 'csv-parse';
import iconv from 'iconv-lite';

export const revalidate = 0; // Consider adding const revalidate = 59; or similar if you want client-side caching between fetches

export async function GET() {
    try {
        if (!process.env.BKWB_USERNAME || !process.env.BKWB_PASSWORD) {
            throw new Error('BKWB_USERNAME or BKWB_PASSWORD is not defined');
        }
        const response = await axios.get(
            "https://webdav.bkwb.org/Groups/Domain Admins/ComputerÜberwachung/projekt 1/HTML/combined.csv",
            {
                auth: {
                    username: process.env.BKWB_USERNAME,
                    password: process.env.BKWB_PASSWORD,
                },
                responseType: 'arraybuffer', // Ensure the response is treated as an ArrayBuffer
            }
        );

        const parsedData = await new Promise((resolve, reject) => {
            const decodedData = iconv.decode(Buffer.from(response.data), 'utf-16le');
            parse(decodedData, {
                relax_column_count: true,
                // Use specific column names instead of columns: true
                // Assuming the order is 'Computer An', 'Computer Aus', 'Ort', 'Start Zeit', 'End Zeit'
                columns: ['location', 'pcs_on', 'pcs_off','start_time', 'end_time'],
                trim: true,
                skip_records_with_error: true // Optional: Skip rows that cause parsing errors
            }, (err, records) => {
                if (err) {
                    reject(err);
                } else {
                    // Optional: Filter out any potential header row if columns: true somehow didn't handle it fully
                    // Or if your CSV has extra header-like rows.
                    // This is usually not needed when columns: ['...'] is used correctly,
                    // as it expects data rows matching the header count *after* potentially skipping the first row.
                    // Let's trust columns: [...] for now.

                    resolve(records);
                }
            });
        });

        // Log the parsed data structure to verify in server logs
        console.log("API Parsed Data Structure:", JSON.stringify(parsedData ? parsedData.slice(0, 2) : null, null, 2)); // Log first 2 rows as sample

        return Response.json(parsedData);

    } catch (error: any) {
        console.error('Error fetching or parsing CSV:', error.message);
        // Return a proper error response
        return Response.json({ error: 'Failed to fetch data', details: error.message }, { status: 500 });
    }
}