'use client'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@/node_modules/@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {usePathname} from "next/navigation";

function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ');
    }


export default function navbar() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const pathname = usePathname();
    // Define your navigation links
    const navigation = [
        { name: 'Dashboard', href: '/', current: pathname === '/' },
        { name: 'Monitor Activity', href: '/MonitorActivity', current: pathname === '/MonitorActivity' },
        { name: 'Slow Switches', href: '/SlowSwitches', current: pathname === '/SlowSwitches' },
        { name: 'Check Devices', href: '/IPOnOff', current: pathname === '/IPOnOff' },
        { name: 'Offline Switches', href: '/SwitchesOff', current: pathname === '/SwitchesOff' }
    ];
    return (
        <Disclosure as="nav" className="bg-gray-800 dark:bg-gray-700">
        {({ open }) => (
        <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-750 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
    <span className="absolute -inset-0.5" />
    <span className="sr-only">Open main menu</span>
    {open ? (
        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
    ) : (
        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
    )}
    </Disclosure.Button>
    </div>
    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
    <div className="flex shrink-0 items-center">
    <img
        className="h-8 w-auto dark:invert"
    src="/BKWB logo.png"
    alt="Your Company"
        />
        </div>
        <div className="hidden sm:ml-6 sm:block">
    <div className="flex space-x-4">
        {navigation.map((item) => (
                <a
                    key={item.name}
            href={item.href}
            className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:dark:bg-gray-800 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium'
)}
    aria-current={item.current ? 'page' : undefined}
        >
        {item.name}
        </a>
))}
    </div>
    </div>
    </div>
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

    </div>
    </div>
    </div>

    <Disclosure.Panel className="sm:hidden">
    <div className="space-y-1 px-2 pb-3 pt-2">
        {navigation.map((item) => (
                <Disclosure.Button
                    key={item.name}
            as="a"
            href={item.href}
            className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
)}
    aria-current={item.current ? 'page' : undefined}
        >
        {item.name}
        </Disclosure.Button>
))}
    </div>
    </Disclosure.Panel>
    </>
)}
    </Disclosure>
)
}
