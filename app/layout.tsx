
import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Gurase Properties | Property Ownership in Saudi Arabia',
  description: 'Trusted partner for foreign property ownership in Saudi Arabia. We provide smooth, secure, and reliable solutions to help foreigners own real estate with confidence.',
  generator: 'v0.app',
  keywords: ['real estate', 'property ownership', 'Saudi Arabia', 'foreign property', 'real estate services'],
  icons: {
    icon: [
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/logo.png',
        type: 'image/png',
      },
    ],
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1B365D',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="so" className="scroll-smooth">
      <body className={`font-sans antialiased`}>
        
        {children}
        <Analytics />
      </body>
    </html>
  )
}
