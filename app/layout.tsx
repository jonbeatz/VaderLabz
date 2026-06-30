import type { Metadata } from 'next'
import { Cormorant_Garamond, Space_Mono } from 'next/font/google'
import { LenisProvider } from '@/lib/lenis-provider'
import { CustomCursor } from '@/components/CustomCursor'
import { StudioRails } from '@/components/StudioRails'
import { CursorProvider } from '@/lib/cursor-context'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VaderLabz — Dev Lab & AI Playground',
  description:
    'Building, breaking, and learning. Full-stack AI experiments, personal projects, and new ideas forged in the dark.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${spaceMono.variable}`}>
      <body>
        <CursorProvider>
        <LenisProvider>
          <StudioRails />
          <CustomCursor />
          {children}
        </LenisProvider>
        </CursorProvider>
      </body>
    </html>
  )
}
