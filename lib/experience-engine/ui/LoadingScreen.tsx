'use client'

import { useEffect, useRef, useState } from 'react'
import { ACCENT } from '../types'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const total = 60
    const t = setInterval(() => {
      frame++
      setProgress(Math.min(Math.round((frame / total) * 100), 100))
      if (frame >= total) { clearInterval(t); setTimeout(onComplete, 200) }
    }, 40)
    return () => clearInterval(t)
  }, [onComplete])

  return (
    <div id="vader-loading" className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      <div className="font-mono text-sm font-bold tracking-[0.25em] mb-12">
        <span style={{ color: '#f0f0f0' }}>VADER</span><span style={{ color: '#ff2a36' }}>LABZ</span>
      </div>
      <div className="w-[200px] md:w-[280px] h-[3px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
        <div ref={barRef} className="h-full bg-[#ff2a36] rounded-full transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>
      <div className="text-xs font-mono tracking-[0.15em] text-[#555566] mt-4">{progress}%</div>
    </div>
  )
}
