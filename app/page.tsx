import Image from 'next/image';
import Navbar from './components/navbar';
import APMonitor from "@/app/components/FetchData/APMonitor";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 dark:bg-gray-800">
            <div className="flex justify-between p-10">
                <a href="#"
                   className="mx-2 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-900 opacity-0 animate-fade-in transition-opacity duration-1500 hover:opacity-100 hover:shadow-md hover:ring-1 hover:ring-blue-500 hover:bg-opacity-80">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Monitor Activity</h5>
                    <APMonitor></APMonitor>
                </a>

                <a href="#"
                   className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-900 opacity-0 animate-fade-in transition-opacity duration-1500 hover:opacity-100 hover:shadow-md hover:ring-1 hover:ring-blue-500 hover:bg-opacity-80">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Slow Switches</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">placeholder</p>
                </a>
            </div>
        </main>
    );
}
