import Image from 'next/image';
import Navbar from './components/navbar';
import APMonitor from "@/app/components/FetchData/APMonitor";
import SlowSwitches from "@/app/components/FetchData/SlowSwitches";
import IPOnOff from "@/app/components/FetchData/IPOnOff";
import SwitchesOff from "@/app/components/FetchData/SwitchesOff"
import IPStats from "@/app/components/FetchData/IPStats";
export default function Home() {

    return (
        <main className="flex flex-col justify-between min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 dark:bg-gray-800">
            <div className="flex flex-wrap sm:flex-row min-[1345px]:flex-nowrap p-2 sm:p-4">
                <a
                    href="/MonitorActivity"
                    className="mb-4 mx-2 h-[520px] overflow-y-auto md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-900 opacity-0 animate-fade-in transition-opacity duration-1500 hover:opacity-100 hover:shadow-md hover:ring-1 hover:ring-blue-500 hover:bg-opacity-80"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Ausgefallene Access Points</h5>
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
                    </div>
                    <APMonitor></APMonitor>
                </a>

                <a
                    href="/SlowSwitches"
                    className="mb-4 mx-2 w-[450px] h-[520px] overflow-y-auto sm:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-900 opacity-0 animate-fade-in transition-opacity duration-1500 hover:opacity-100 hover:shadow-md hover:ring-1 hover:ring-blue-500 hover:bg-opacity-80"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Slow Switches</h5>
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
                    </div>
                    <SlowSwitches></SlowSwitches>
                </a>

                <a
                    href="/IPOnOff"
                    className="mb-4 mx-2 h-[520px] overflow-y-auto sm:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-900 opacity-0 animate-fade-in transition-opacity duration-1500 hover:opacity-100 hover:shadow-md hover:ring-1 hover:ring-blue-500 hover:bg-opacity-80"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Devices On/Off</h5>
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
                    </div>
                    <IPOnOff></IPOnOff>
                </a>
                <a
                    href="/IPOnOff"
                    className="mb-4 mx-2 h-[520px] overflow-y-auto sm:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-900 opacity-0 animate-fade-in transition-opacity duration-1500 hover:opacity-100 hover:shadow-md hover:ring-1 hover:ring-blue-500 hover:bg-opacity-80"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Devices On/Off</h5>
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
                    </div>
                    <IPStats></IPStats>
                </a>

                <a
                    href="/SwitchesOff"
                    className="mb-4 mx-2 h-[520px] sm:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-900 opacity-0 animate-fade-in transition-opacity duration-1500 hover:opacity-100 hover:shadow-md hover:ring-1 hover:ring-blue-500 hover:bg-opacity-80"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Ausgefallene Switches</h5>
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
                    </div>
                    <SwitchesOff></SwitchesOff>
                </a>
            </div>
        </main>

    );
}
