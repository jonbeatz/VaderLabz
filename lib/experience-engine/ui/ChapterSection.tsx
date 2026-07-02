'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EASE, TEXT_PRIMARY, TEXT_DIM } from '../types'

gsap.registerPlugin(ScrollTrigger)

export function ChapterSection({ chapter, onReadMore }: {
  chapter: { id: string; marker: string; title: string; subtitle: string; summary: string; detail?: string }
  onReadMore: () => void
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 35%', toggleActions: 'play none none reverse' },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id={chapter.id} ref={sectionRef} className="relative min-h-screen flex items-center py-16 md:py-24">
      <div className="w-full">
        <div className="relative">
          {/* Soft glow behind glass — matched to original */}
          <div className="absolute -inset-4 rounded-2xl opacity-30 blur-xl" style={{ background: 'radial-gradient(ellipse at center, rgba(255,42,54,0.15) 0%, transparent 70%)' }} />
          <div
            ref={panelRef}
            className="relative max-w-[440px] ml-[6%] md:ml-[15%] p-6 md:p-8 rounded-xl md:rounded-2xl will-change-[backdrop-filter]"
            style={{
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.04)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              opacity: 0.99,
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-[0.6rem] tracking-[0.2em] text-[#ff2a36]">{chapter.marker}</span>
              <svg width="40" height="1"><line x1="0" y1="0.5" x2="40" y2="0.5" stroke="rgba(255,42,54,0.15)" strokeWidth="1" /></svg>
            </div>

            <h2
              className="font-sans text-3xl md:text-4xl font-semibold leading-[1.1] mb-1"
              style={{ color: TEXT_PRIMARY }}
              suppressHydrationWarning
              dangerouslySetInnerHTML={{ __html: chapter.title }}
            />
            <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-5" style={{ color: TEXT_DIM }}>
              {chapter.subtitle}
            </div>
            <svg width="60" height="1" className="mb-5"><line x1="0" y1="0.5" x2="60" y2="0.5" stroke="rgba(255,42,54,0.2)" strokeWidth="1" /></svg>
            <p className="text-sm leading-[1.8] mb-7" style={{ color: '#9999aa' }}>
              {chapter.summary}
            </p>
            <button
              onClick={onReadMore}
              className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-[#ff2a36] hover:opacity-70 transition-opacity uppercase"
            >
              Read More
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M5 3l4 4-4 4" stroke="#ff2a36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
