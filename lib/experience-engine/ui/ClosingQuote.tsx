'use client'

import { useEffect, useRef } from 'react'
import { EASE, TEXT_PRIMARY, TEXT_DIM, ACCENT } from '../types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ClosingQuote() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 45%', toggleActions: 'play none none reverse' },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="min-h-[60vh] flex items-center justify-center py-24">
      <div className="text-center max-w-[650px] px-6">
        <div
          className="relative p-8 md:p-12 rounded-2xl will-change-[backdrop-filter]"
          style={{
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.04)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 60px rgba(255,42,54,0.06)',
            opacity: 0.99,
          }}
        >
          <div className="font-sans text-3xl md:text-5xl italic leading-tight mb-3" style={{ color: TEXT_PRIMARY }}>
            <span className="text-5xl" style={{ color: ACCENT }}>&ldquo;</span>Build, break, and learn. Forged in the dark.<span className="text-5xl" style={{ color: ACCENT }}>&rdquo;</span>
          </div>
          <div className="font-mono text-xs tracking-[0.15em] uppercase" style={{ color: TEXT_DIM }}>
            &mdash; VaderLabz
          </div>
          <div className="flex items-center justify-center gap-3 mt-8 mb-6">
            <svg width="40" height="1"><line x1="0" y1="0.5" x2="40" y2="0.5" stroke="rgba(255,42,54,0.3)" strokeWidth="1" /></svg>
            <svg width="4" height="4" viewBox="0 0 4 4"><circle cx="2" cy="2" r="2" fill="#ff2a36" /></svg>
            <svg width="40" height="1"><line x1="0" y1="0.5" x2="40" y2="0.5" stroke="rgba(255,42,54,0.15)" strokeWidth="1" /></svg>
          </div>
          <div className="font-sans text-2xl italic" style={{ color: ACCENT }}>Vader Protocol v1.0</div>
          <div className="mt-2 font-mono text-[0.55rem] tracking-[0.3em] uppercase" style={{ color: TEXT_DIM }}>
            Experience Made With VaderLabz
          </div>
        </div>
      </div>
    </section>
  )
}
