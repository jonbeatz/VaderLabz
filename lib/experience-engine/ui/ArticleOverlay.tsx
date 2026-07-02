'use client'

import { useEffect, useState } from 'react'
import { TEXT_PRIMARY, TEXT_MUTED } from '../types'
import type { ChapterData } from '../types'

export function ArticleOverlay({ chapter, onClose }: { chapter: ChapterData; onClose: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 250)
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      style={{
        background: visible ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0)',
        backdropFilter: visible ? 'blur(16px)' : 'blur(0px)',
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div
        className="relative w-full max-w-[700px] p-8 md:p-12 my-8"
        style={{
          background: 'rgba(10,10,12,0.9)',
          border: '1px solid rgba(255,42,54,0.1)',
          borderRadius: '16px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
          transitionDelay: '0.1s',
        }}
      >
        <button onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center font-mono text-sm text-[#555566] hover:text-[#ff2a36] transition-colors"
          aria-label="Close article"
        >✕</button>

        <div className="font-mono text-xs tracking-[0.15em] text-[#ff2a36] mb-3">{chapter.marker}</div>
        <h2 className="font-sans text-3xl md:text-4xl font-semibold leading-tight mb-6"
          style={{ color: TEXT_PRIMARY }}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: chapter.title }}
        />

        <div className="flex items-center gap-3 mb-6">
          <svg width="40" height="1"><line x1="0" y1="0.5" x2="40" y2="0.5" stroke="rgba(255,42,54,0.3)" strokeWidth="1" /></svg>
          <svg width="4" height="4" viewBox="0 0 4 4"><circle cx="2" cy="2" r="2" fill="#ff2a36" /></svg>
          <svg width="40" height="1"><line x1="0" y1="0.5" x2="40" y2="0.5" stroke="rgba(255,42,54,0.15)" strokeWidth="1" /></svg>
        </div>

        <div className="text-sm md:text-base leading-[1.9] space-y-4" style={{ color: TEXT_MUTED }}>
          {chapter.detail.split('\n\n').filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </div>
  )
}
