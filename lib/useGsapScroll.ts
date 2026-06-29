'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ---- Signature easing curve (Zera-inspired) ----
export const EASE_VADER = 'power3.inOut'

// ---- Hero entrance (call on page mount) ----
export function useHeroEntrance(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const letters = el.querySelectorAll('[data-hero-letter]')
      const sub = el.querySelector('[data-hero-sub]')
      const desc = el.querySelector('[data-hero-desc]')
      const actions = el.querySelector('[data-hero-actions]')

      const tl = gsap.timeline({ defaults: { ease: EASE_VADER } })

      tl.fromTo(
        letters,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.06 },
      )
        .fromTo(sub, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
        .fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
        .fromTo(actions, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.15')
    }, ref)

    return () => ctx.revert()
  }, [ref])
}

// ---- Panels: fade-up on scroll ----
export function useFadeUpPanels(selector: string) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = document.querySelectorAll(selector)
      panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: EASE_VADER,
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [selector])
}
