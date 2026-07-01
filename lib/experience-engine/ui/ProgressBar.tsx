'use client'

import { useRef, useEffect } from 'react'
import { ACCENT, TEXT_DIM, type ChapterData } from '../types'

function getScrollProgress(): number {
  if (typeof window === 'undefined') return 0
  const total = document.documentElement.scrollHeight - window.innerHeight
  return total > 0 ? Math.min(window.scrollY / total, 1) : 0
}

export function ProgressBar({ chapters }: { chapters: ChapterData[] }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const update = () => {
      const p = getScrollProgress()
      bar.style.transform = `scaleY(${p})`
      const idx = Math.min(Math.floor(p * chapters.length), chapters.length - 1)
      document.querySelectorAll('.progress-dot').forEach((dot, i) => {
        (dot as HTMLElement).style.opacity = i === idx ? '1' : '0.25'
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [chapters.length])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col items-center gap-3">
      <div className="w-[2px] h-[120px] rounded-full overflow-hidden mb-1" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div ref={barRef} className="w-full origin-top" style={{ background: ACCENT, transform: 'scaleY(0)', height: '100%' }} />
      </div>
      {chapters.map((ch) => (
        <button
          key={ch.id}
          onClick={() => scrollToSection(ch.id)}
          className="progress-dot font-mono text-[0.55rem] tracking-[0.15em] uppercase transition-all duration-300 hover:opacity-100"
          style={{ color: ACCENT, opacity: 0.25 }}
          title={ch.title.replace(/<[^>]*>/g, '')}
        >
          {ch.marker}
        </button>
      ))}
      <button onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
        className="font-mono text-[0.55rem] tracking-[0.15em] uppercase transition-all duration-300 hover:opacity-100"
        style={{ color: ACCENT, opacity: 0.25 }}
        title="Bottom"
      >06</button>
    </div>
  )
}
