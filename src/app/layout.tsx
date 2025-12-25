import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Token Trading Table',
  description: 'Axiom Trade Pulse Replica',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

