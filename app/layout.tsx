import type { Metadata } from 'next'
import { poppins } from "@/app/fonts";
import './globals.css'

export const metadata: Metadata = {
  title: 'Rastreador de calorias',
  description: 'Generated by create next app',
  metadataBase: new URL('http://localhost:3000'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}

// TODO - move components too its own route folder