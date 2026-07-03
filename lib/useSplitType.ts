'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { EASE } from './experience-engine/types'

gsap.registerPlugin(ScrollTrigger)

export function useSplitTypeReveal(
  selector: string,
  options?: {
    types?: 'lines' | 'words' | 'chars'
    stagger?: number
    duration?: number
    y?: number
    start?: string
    end?: string
  }
) {
  const defaults = {
    types: 'lines' as const,
    stagger: 0.08,
    duration: 0.7,
    y: 40,
    start: 'top 85%',
    end: 'top 40%',
  }

  const opts = { ...defaults, ...options }

  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    const instances: SplitType[] = []
    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        const st = new SplitType(el as HTMLElement, { types: opts.types })

        // Collect the lines/words/chars
        const split = opts.types === 'lines'
          ? st.lines
          : opts.types === 'words'
          ? st.words
          : st.chars

        if (!split) return
        instances.push(st)

        // Animate each line/word/char
        gsap.fromTo(
          split,
          { y: opts.y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: opts.duration,
            stagger: opts.stagger,
            ease: EASE,
            scrollTrigger: {
              trigger: el,
              start: opts.start as string,
              end: opts.end as string,
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    })

    return () => {
      ctx.revert()
      instances.forEach((st) => st.revert())
    }
  }, [selector, opts.types, opts.stagger, opts.duration, opts.y, opts.start, opts.end])
}
