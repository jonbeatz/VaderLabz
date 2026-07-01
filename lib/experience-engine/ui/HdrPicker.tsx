'use client'

import React, { useState } from 'react'
import { ACCENT, TEXT_DIM } from '../types'
import { AccordionSection } from './AccordionSection'
import { HDR_PRESETS, BLOOM_PRESETS, ROTATION_PRESETS, CAMERA_PRESETS, SABER_COLORS } from '../config'
import type { HdrPreset, BloomPreset, RotationPreset, CameraPreset, SaberColorPreset } from '../types'

interface HdrPickerProps {
  onHdrChange: (preset: HdrPreset) => void
  onBloomChange: (preset: BloomPreset) => void
  onRotationChange: (preset: RotationPreset) => void
  onCameraChange: (preset: CameraPreset) => void
  onSaberColorChange: (preset: SaberColorPreset) => void
  onMouseToggle: (enabled: boolean) => void
  onCursorToggle: (enabled: boolean) => void
  currentHdrIndex: number
  currentBloomIndex: number
  currentRotationIndex: number
  currentCameraIndex: number
  currentSaberColorIndex: number
  mouseEnabled: boolean
  cursorEnabled: boolean
  hdrEnabled?: boolean
  bloomEnabled?: boolean
  saberEnabled?: boolean
  cameraEnabled?: boolean
  mouseEnabledToggle?: boolean
}

const btnBase = 'w-full text-left font-mono text-[0.5rem] tracking-[0.15em] uppercase py-1.5 px-2 rounded transition-all duration-200'
const pillActive = (active: boolean) => ({
  color: active ? '#fff' : '#7788aa',
  background: active ? 'rgba(255,42,54,0.3)' : 'transparent',
  border: active ? '1px solid rgba(255,42,54,0.4)' : '1px solid rgba(255,255,255,0.08)',
})

export function HdrPicker({
  onHdrChange, onBloomChange, onRotationChange, onCameraChange, onSaberColorChange,
  onMouseToggle, onCursorToggle,
  currentHdrIndex, currentBloomIndex, currentRotationIndex, currentCameraIndex, currentSaberColorIndex,
  mouseEnabled, cursorEnabled,
  hdrEnabled = true, bloomEnabled = true, saberEnabled = true, cameraEnabled = true, mouseEnabledToggle = true,
}: HdrPickerProps) {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 font-mono transition-all duration-300 hover:text-white flex items-center justify-center rounded-full"
        style={{
          color: '#ff2a36',
          fontSize: '0.7rem',
          width: '22px',
          height: '22px',
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,42,54,0.25)',
        }}
        title="Toggle scene controls"
      >
        ✦
      </button>
    )
  }

  return (
    <div
      className="fixed bottom-6 left-6 z-[150] w-[280px] rounded-xl will-change-[backdrop-filter]"
      style={{
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
      }}
    >
      {hdrEnabled && (
        <AccordionSection title="HDR Environment" defaultOpen={false}>
          {HDR_PRESETS.map((p, i) => (
            <button key={p.label} onClick={() => onHdrChange(p)}
              className={btnBase}
              style={{ color: i === currentHdrIndex ? ACCENT : TEXT_DIM }}
            >{p.label}</button>
          ))}
        </AccordionSection>
      )}

      {bloomEnabled && (
        <AccordionSection title="Bloom Effect" defaultOpen={false}>
          {BLOOM_PRESETS.map((p, i) => (
            <button key={p.label} onClick={() => onBloomChange(p)}
              className={btnBase}
              style={{ color: i === currentBloomIndex ? ACCENT : TEXT_DIM }}
            >{p.label}</button>
          ))}
        </AccordionSection>
      )}

      {saberEnabled && (
        <AccordionSection title="Rotation Speed" defaultOpen={false}>
          {ROTATION_PRESETS.map((p, i) => (
            <button key={p.label} onClick={() => onRotationChange(p)}
              className={btnBase}
              style={{ color: i === currentRotationIndex ? ACCENT : TEXT_DIM }}
            >{p.label}</button>
          ))}
        </AccordionSection>
      )}

      {cameraEnabled && (
        <AccordionSection title="Camera Orbit" defaultOpen={false}>
          {CAMERA_PRESETS.map((p, i) => (
            <button key={p.label} onClick={() => onCameraChange(p)}
              className={btnBase}
              style={{ color: i === currentCameraIndex ? ACCENT : TEXT_DIM }}
            >{p.label}</button>
          ))}
        </AccordionSection>
      )}

      {saberEnabled && (
        <AccordionSection title="Saber Color" defaultOpen={false}>
          {SABER_COLORS.map((p, i) => (
            <button key={p.label} onClick={() => onSaberColorChange(p)}
              className={btnBase}
              style={{ color: i === currentSaberColorIndex ? ACCENT : TEXT_DIM }}
            >{p.label}</button>
          ))}
        </AccordionSection>
      )}

      {mouseEnabledToggle && (
        <AccordionSection title="Mouse FX" defaultOpen={false}>
          {/* Saber Move sub-section */}
          <div className="font-mono text-[0.6rem] tracking-[0.1em] mb-2 mt-1 flex items-center gap-2 px-2"
            style={{ color: '#667' }}
          >
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#ff2a36', display: 'inline-block' }} />
            Saber Move
          </div>
          <div className="flex gap-1.5 px-2 mb-2">
            <button onClick={() => onMouseToggle(true)}
              className="font-mono text-[0.6rem] tracking-[0.1em] px-3 py-1 rounded-full transition-all duration-300"
              style={pillActive(mouseEnabled)}
            >On</button>
            <button onClick={() => onMouseToggle(false)}
              className="font-mono text-[0.6rem] tracking-[0.1em] px-3 py-1 rounded-full transition-all duration-300"
              style={pillActive(!mouseEnabled)}
            >Off</button>
          </div>

          {/* Cursor Dot sub-section */}
          <div className="font-mono text-[0.6rem] tracking-[0.1em] mb-2 mt-1 flex items-center gap-2 px-2"
            style={{ color: '#667' }}
          >
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#ff2a36', display: 'inline-block' }} />
            Cursor Dot
          </div>
          <div className="flex gap-1.5 px-2">
            <button onClick={() => onCursorToggle(true)}
              className="font-mono text-[0.6rem] tracking-[0.1em] px-3 py-1 rounded-full transition-all duration-300"
              style={pillActive(cursorEnabled)}
            >On</button>
            <button onClick={() => onCursorToggle(false)}
              className="font-mono text-[0.6rem] tracking-[0.1em] px-3 py-1 rounded-full transition-all duration-300"
              style={pillActive(!cursorEnabled)}
            >Off</button>
          </div>
        </AccordionSection>
      )}

      {/* Close button — bottom-left */}
      <div className="flex items-center justify-start pb-2 pl-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '2px' }}
      >
        <button
          onClick={() => setOpen(false)}
          className="font-mono transition-all duration-300 hover:text-white flex items-center justify-center rounded-full"
          style={{
            color: '#ff2a36',
            fontSize: '0.7rem',
            width: '22px',
            height: '22px',
            background: 'rgba(255,42,54,0.15)',
            border: '1px solid rgba(255,42,54,0.25)',
          }}
          title="Close controls"
        >✕</button>
      </div>
    </div>
  )
}
