import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from "react";
import Navbar from "@/app/components/navbar";
import {useRouter} from "next/navigation";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard BKWB',
  description: 'IT Dashboard des Berufskolleg Werther Brücke '
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar></Navbar>
      {children}</body>
    </html>
  )
}
