import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VaderLabz — Dev Lab & AI Playground',
  description: 'Building, breaking, and learning. Full-stack AI experiments, personal projects, and new ideas forged in the dark.',
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
