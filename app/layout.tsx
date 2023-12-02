import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from "react";
import Navbar from "@/app/components/navbar";
import {useRouter} from "next/navigation";
import {Doctype} from "domelementtype";
import Footer from "@/app/components/Footer";

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
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/mirage.js"></script>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
      </body>
    </html>
  )
}
