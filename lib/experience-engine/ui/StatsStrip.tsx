'use client'

import { useEffect, useRef } from 'react'
import { ACCENT, TEXT_DIM } from '../types'
import type { StatData } from '../types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function StatsStrip({ stats, ease }: { stats: StatData[]; ease: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelectorAll('.stat-item'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease, stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 50%', toggleActions: 'play none none reverse' },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [ease])

  return (
    <section ref={ref} className="py-20">
      <div className="flex items-center justify-center gap-4 md:gap-12 flex-wrap px-6">
        {stats.map((s, i) => (
          <div key={s.label} className="flex items-center gap-4 md:gap-12">
            <div className="stat-item flex flex-col items-center gap-1">
              <span className="font-sans text-3xl md:text-5xl font-bold leading-none" style={{ color: ACCENT }}>{s.num}</span>
              <span className="font-mono text-[0.55rem] tracking-[0.2em]" style={{ color: TEXT_DIM }}>{s.label}</span>
            </div>
            {i < stats.length - 1 && (
              <div className="w-px h-10 hidden md:block" style={{ background: 'rgba(255,255,255,0.04)' }} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
