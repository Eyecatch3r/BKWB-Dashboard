import Image from 'next/image';
import Navbar from './components/navbar';
import APMonitor from "@/app/components/FetchData/APMonitor";
import SlowSwitches from "@/app/components/FetchData/SlowSwitches";
import IPOnOff from "@/app/components/FetchData/IPOnOff";
import SwitchesOff from "@/app/components/FetchData/SwitchesOff"
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-12 lg:p-16 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row justify-between p-2 sm:p-0">
                <a
                    href="/MonitorActivity"
                    className="w-full h-full sm:max-w-sm mx-2 mb-4 sm:mb-0 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-900 opacity-0 animate-fade-in transition-opacity duration-1500 hover:opacity-100 hover:shadow-md hover:ring-1 hover:ring-blue-500 hover:bg-opacity-80"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Ausgefallene Access Points</h5>
                    <APMonitor></APMonitor>
                </a>

                <a
                    href="/SlowSwitches"
                    className="w-full h-full sm:max-w-sm mx-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-900 opacity-0 animate-fade-in transition-opacity duration-1500 hover:opacity-100 hover:shadow-md hover:ring-1 hover:ring-blue-500 hover:bg-opacity-80"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Slow Switches</h5>
                    <SlowSwitches></SlowSwitches>
                </a>

                <a
                    href="/IPOnOff"
                    className="w-max h-full sm:max-w-sm mx-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-900 opacity-0 animate-fade-in transition-opacity duration-1500 hover:opacity-100 hover:shadow-md hover:ring-1 hover:ring-blue-500 hover:bg-opacity-80"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Devices On/Off</h5>
                    <IPOnOff></IPOnOff>
                </a>

                <a
                    href="/SwitchesOff"
                    className="w-max h-full sm:max-w-sm mx-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-900 opacity-0 animate-fade-in transition-opacity duration-1500 hover:opacity-100 hover:shadow-md hover:ring-1 hover:ring-blue-500 hover:bg-opacity-80"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Ausgefallene Switches</h5>
                    <SwitchesOff></SwitchesOff>
                </a>
            </div>
        </main>

    );
}
