import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Control Caravanes',
  description: 'App per gestionar l\'àrea de caravanes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}