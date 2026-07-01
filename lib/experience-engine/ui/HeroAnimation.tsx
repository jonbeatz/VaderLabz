'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function HeroAnimation({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const letters = el.querySelectorAll<HTMLElement>('[data-hero-letter]')
    const ctx = gsap.context(() => {
      gsap.fromTo(letters,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.5, stagger: { each: 0.02, from: 'start' }, ease: 'power3.out', delay: 0.2 },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return <div ref={ref}>{children}</div>
}
