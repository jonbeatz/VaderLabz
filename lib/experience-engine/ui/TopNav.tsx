'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EASE, TEXT_PRIMARY, TEXT_DIM, ACCENT } from '../types'

gsap.registerPlugin(ScrollTrigger)

export function TopNav({ chapters, archiveLinkUrl, archiveLinkTitle }: {
  chapters: { id: string; marker: string; title: string }[]
  archiveLinkUrl?: string
  archiveLinkTitle?: string
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-4"
      style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, transparent 100%)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <nav className="flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-sm font-bold tracking-[0.25em] transition-colors duration-300 hover:opacity-80"
          style={{ color: TEXT_PRIMARY }}
        >
          <span style={{ color: TEXT_PRIMARY }}>VADER</span><span style={{ color: ACCENT }}>LABZ</span>
        </button>
        <div className="flex gap-5 md:gap-8">
          {chapters.map((ch) => (
            <button key={ch.id} onClick={() => {
              const el = document.getElementById(ch.id)
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 80
                window.scrollTo({ top, behavior: 'smooth' })
              }
            }}
              className="font-mono text-[0.55rem] tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#ff2a36]"
              style={{ color: TEXT_DIM }}
            >{ch.marker}</button>
          ))}
          <button onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
            className="font-mono text-[0.55rem] tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#ff2a36]"
            style={{ color: TEXT_DIM }}
          >06</button>
          {archiveLinkUrl && (
            <a href={archiveLinkUrl}
              className="font-mono text-[0.5rem] tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#ff2a36] ml-2"
              style={{ color: '#444466' }}
              title={archiveLinkTitle || ''}
            >°</a>
          )}
        </div>
      </nav>
    </header>
  )
}
