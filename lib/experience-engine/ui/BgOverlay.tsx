'use client'

import React from 'react'

export function BgOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="fixed inset-0 z-[-1]">
        <img
          src="/media/vaderBG-2.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.65) saturate(0.9)' }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.75) 100%)'
        }} />
      </div>
      <div className="fixed inset-0 z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 90%, rgba(0,0,0,0.95) 100%)',
        }}
      />
      <div className="fixed top-1/4 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] z-0 pointer-events-none opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #ff2a36 0%, transparent 70%)',
          transform: 'translate(30%, -20%)',
        }}
      />
      {children}
    </div>
  )
}
