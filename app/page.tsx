import Image from 'next/image'; // Not used in this specific component output
import Navbar from './components/navbar'; // Not used in this specific component output
import APMonitor from "@/app/components/FetchData/APMonitor";
import IPStats from "@/app/components/FetchData/IPStats";

export default function Home() {
    return (
        <main className="flex flex-col bg-gray-50 justify-between min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 dark:bg-gray-800">
            {/* This parent div's padding (p-2 sm:p-4) contributes to the card not touching main's edges */}
            <div className="flex flex-wrap sm:flex-row min-[1345px]:flex-nowrap p-2 sm:p-4 justify-center">
                {/* Single box container - modified for width */}
                <div
                    className="mb-4 w-full h-[520px] overflow-y-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-800 opacity-0 animate-fade-in transition-opacity duration-1500"
                    style={{ animationFillMode: 'forwards' }} // Ensures opacity stays 1 after animation
                >
                    {/* Flex container for side-by-side layout on large screens */}
                    <div className="flex flex-col lg:flex-row lg:space-x-6 h-full">

                        {/* APMonitor Section Wrapper */}
                        <div className="flex-1 lg:w-1/2">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Ausgefallene Access Points</h5>
                            <div className="inline-flex items-center justify-center w-full">
                                <hr className="w-full max-w-xs h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                            </div>
                            <APMonitor />
                        </div>

                        {/* IPStats Section Wrapper */}
                        <div className="flex-1 lg:w-1/2 mt-8 lg:mt-0">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">IP Statistiken</h5>
                            <div className="inline-flex items-center justify-center w-full">
                                <hr className="w-full max-w-xs h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                            </div>
                            <IPStats />
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}