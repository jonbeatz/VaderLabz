'use client'

import { useEffect, useState } from 'react'
import { useCursor } from '@/lib/cursor-context'

interface CursorState {
  x: number
  y: number
  isHovering: boolean
  isVisible: boolean
}

export function CustomCursor() {
  const { cursorEnabled } = useCursor()
  const [state, setState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isVisible: false,
  })

  useEffect(() => {
    if (!cursorEnabled) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Detect touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    // Hide default OS cursor while custom dot is active
    document.body.style.cursor = 'none'

    setState((s) => ({ ...s, isVisible: true }))

    const onMove = (e: MouseEvent) => {
      setState((s) => ({ ...s, x: e.clientX, y: e.clientY }))
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setState((s) => ({ ...s, isHovering: true }))
      }
    }

    const onOut = () => {
      setState((s) => ({ ...s, isHovering: false }))
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      // Restore default OS cursor on cleanup
      document.body.style.cursor = ''
    }
  }, [cursorEnabled])

  if (!state.isVisible || !cursorEnabled) return null

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        left: state.x,
        top: state.y,
        width: state.isHovering ? 28 : 8,
        height: state.isHovering ? 28 : 8,
        borderRadius: '50%',
        backgroundColor: 'var(--accent)',
        opacity: 0.5,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.25s ease, height 0.25s ease, opacity 0.25s ease',
        mixBlendMode: 'difference',
      }}
    />
  )
}
