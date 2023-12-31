import Image from 'next/image';
import Navbar from '../components/navbar';
import SlowSwitches from "@/app/components/FetchData/SlowSwitches";

export default function Page() {
    return (
        <main className=" min-h-screen pt-2 lg:p-24 bg-gray-50 dark:bg-gray-800">
            <div className="mx-2 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-900 opacity-0 animate-fade-in transition-opacity duration-1500 hover:opacity-100 hover:shadow-md hover:ring-1 hover:ring-blue-500 hover:bg-opacity-80">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Slow Switches</h5>
                <SlowSwitches></SlowSwitches>
            </div>
        </main>
    );
}
