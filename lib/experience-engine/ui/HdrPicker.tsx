'use client'

import React from 'react'
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
  currentHdrIndex: number
  currentBloomIndex: number
  currentRotationIndex: number
  currentCameraIndex: number
  currentSaberColorIndex: number
  mouseEnabled: boolean
  hdrEnabled?: boolean
  bloomEnabled?: boolean
  saberEnabled?: boolean
  cameraEnabled?: boolean
  mouseEnabledToggle?: boolean
}

const btnBase = 'w-full text-left font-mono text-[0.5rem] tracking-[0.15em] uppercase py-1.5 px-2 rounded transition-all duration-200'

export function HdrPicker({
  onHdrChange, onBloomChange, onRotationChange, onCameraChange, onSaberColorChange, onMouseToggle,
  currentHdrIndex, currentBloomIndex, currentRotationIndex, currentCameraIndex, currentSaberColorIndex,
  mouseEnabled, hdrEnabled = true, bloomEnabled = true, saberEnabled = true, cameraEnabled = true, mouseEnabledToggle = true,
}: HdrPickerProps) {
  return (
    <div
      className="fixed bottom-5 right-5 z-[150] w-[180px] rounded-xl will-change-[backdrop-filter]"
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

      <AccordionSection title="Rotation Speed" defaultOpen={false}>
        {ROTATION_PRESETS.map((p, i) => (
          <button key={p.label} onClick={() => onRotationChange(p)}
            className={btnBase}
            style={{ color: i === currentRotationIndex ? ACCENT : TEXT_DIM }}
          >{p.label}</button>
        ))}
      </AccordionSection>

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
          <button onClick={() => onMouseToggle(!mouseEnabled)}
            className={btnBase}
            style={{ color: mouseEnabled ? ACCENT : TEXT_DIM }}
          >{mouseEnabled ? 'On' : 'Off'}</button>
        </AccordionSection>
      )}
    </div>
  )
}
