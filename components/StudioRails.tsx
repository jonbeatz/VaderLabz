'use client'

import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  { label: 'STORY', href: '#story' },
  { label: 'PHILOSOPHY', href: '#philosophy' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'PROOF', href: '#proof' },
  { label: 'CONNECT', href: '#connect' },
]

export function StudioRails() {
  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const p = totalHeight > 0 ? window.scrollY / totalHeight : 0
      setProgress(Math.min(1, Math.max(0, p)))

      // Determine active section
      const sections = NAV_ITEMS.map((item) => document.querySelector(item.href))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i]
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2) {
            setActiveIndex(i)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Left rail — page label */}
      <div className="studio-rail studio-rail--left">
        <div className="studio-rail__label">
          <span className="studio-rail__dot" />
          VADERLABZ / DEV LAB
        </div>
      </div>

      {/* Right rail — navigation */}
      <nav className="studio-rail studio-rail--right">
        <div className="studio-rail__nav">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`studio-rail__link ${i === activeIndex ? 'studio-rail__link--active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </div>
        {/* Scroll progress bar */}
        <div className="studio-rail__progress-track">
          <div
            className="studio-rail__progress-fill"
            style={{ transform: `scaleY(${progress})` }}
          />
        </div>
      </nav>
    </>
  )
}
