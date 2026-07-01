'use client'

import { useEffect, useRef } from 'react'
import { TEXT_DIM } from '../types'

export function ScrollPrompt() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const scrolled = window.scrollY
      const maxScroll = window.innerHeight * 0.3
      const opacity = Math.max(0, 1 - scrolled / maxScroll)
      el.style.opacity = String(opacity)
      if (opacity <= 0) el.style.pointerEvents = 'none'
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div ref={ref} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none" style={{ transition: 'opacity 0.2s ease' }}>
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-[0.55rem] tracking-[0.2em]" style={{ color: TEXT_DIM }}>SCROLL</span>
        <svg width="14" height="14" viewBox="0 0 14 14" className="animate-bounce" style={{ animationDuration: '2s' }}>
          <line x1="7" y1="2" x2="7" y2="9" stroke={TEXT_DIM} strokeWidth="1" />
          <polyline points="4,6 7,10 10,6" fill="none" stroke={TEXT_DIM} strokeWidth="1" />
        </svg>
        <span className="font-mono text-[0.55rem] tracking-[0.2em]" style={{ color: TEXT_DIM }}>TO START EXPERIENCE</span>
      </div>
    </div>
  )
}
