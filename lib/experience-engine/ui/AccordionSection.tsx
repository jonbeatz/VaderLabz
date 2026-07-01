'use client'

import React, { useState } from 'react'
import { ACCENT, TEXT_PRIMARY, TEXT_DIM } from '../types'

interface AccordionSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function AccordionSection({ title, children, defaultOpen = false }: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2.5 px-3 text-left transition-colors hover:bg-[rgba(255,255,255,0.02)]"
        aria-expanded={open}
      >
        <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase" style={{ color: TEXT_PRIMARY }}>{title}</span>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className="transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path d="M3 5l3 3 3-3" stroke="#555566" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="px-3 pb-3 space-y-2">{children}</div>
      )}
    </div>
  )
}
