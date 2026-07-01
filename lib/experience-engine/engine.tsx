'use client'

import React, { useState, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { HDR_PRESETS, BLOOM_PRESETS, ROTATION_PRESETS, CAMERA_PRESETS, SABER_COLORS } from './config'
import { EASE, ACCENT } from './types'
const TEXT_DIM = '#555566'
import type { ExperienceConfig, HdrPreset, BloomPreset, RotationPreset, CameraPreset, SaberColorPreset } from './types'

// UI — statically imported
import { TopNav } from './ui/TopNav'
import { ChapterSection } from './ui/ChapterSection'
import { ArticleOverlay } from './ui/ArticleOverlay'
import { LoadingScreen } from './ui/LoadingScreen'
import { ScrollPrompt } from './ui/ScrollPrompt'
import { StatsStrip } from './ui/StatsStrip'
import { ClosingQuote } from './ui/ClosingQuote'
import { HeroAnimation } from './ui/HeroAnimation'
import { BgOverlay } from './ui/BgOverlay'
import { HdrPicker } from './ui/HdrPicker'
import { BackToTop } from './ui/BackToTop'

// Cursor context
import { useCursor } from '@/lib/cursor-context'

// 3D Scene — dynamic import (no SSR)
const Scene3D = dynamic(
  () => import('./scene/Scene3D').then((m) => m.Scene3D),
  { ssr: false }
)

export default function createVaderExperience(config: ExperienceConfig) {
  return function VaderExperiencePage() {
    const [loading, setLoading] = useState(true)
    const [activeArticle, setActiveArticle] = useState<number | null>(null)
    const [currentHdrIndex, setCurrentHdrIndex] = useState(config.defaultHdrIndex ?? 0)
    const [currentBloomIndex, setCurrentBloomIndex] = useState(config.defaultBloomIndex ?? 1)
    const [currentRotationIndex, setCurrentRotationIndex] = useState(config.defaultRotationIndex ?? 0)
    const [currentCameraIndex, setCurrentCameraIndex] = useState(config.defaultCameraIndex ?? 0)
    const [currentSaberColorIndex, setCurrentSaberColorIndex] = useState(config.defaultSaberColorIndex ?? 0)
    const [mouseEnabled, setMouseEnabled] = useState(config.defaultMouseEnabled ?? true)
    const { cursorEnabled, setCursorEnabled } = useCursor()

    // Shared mutable ref for blade material
    const sabersRef = useRef<{ bladeMat: THREE.MeshStandardMaterial | null }>({ bladeMat: null })

    const handleHdrChange = useCallback((p: HdrPreset) => {
      const idx = HDR_PRESETS.findIndex((h) => h.label === p.label)
      if (idx >= 0) setCurrentHdrIndex(idx)
    }, [])

    const handleBloomChange = useCallback((p: BloomPreset) => {
      const idx = BLOOM_PRESETS.findIndex((b) => b.label === p.label)
      if (idx >= 0) setCurrentBloomIndex(idx)
    }, [])

    const handleRotationChange = useCallback((p: RotationPreset) => {
      const idx = ROTATION_PRESETS.findIndex((r) => r.label === p.label)
      if (idx >= 0) setCurrentRotationIndex(idx)
    }, [])

    const handleCameraChange = useCallback((p: CameraPreset) => {
      const idx = CAMERA_PRESETS.findIndex((c) => c.label === p.label)
      if (idx >= 0) setCurrentCameraIndex(idx)
    }, [])

    const handleSaberColorChange = useCallback((p: SaberColorPreset) => {
      const idx = SABER_COLORS.findIndex((s) => s.label === p.label)
      if (idx >= 0) setCurrentSaberColorIndex(idx)
    }, [])

    const handleMouseToggle = useCallback((enabled: boolean) => {
      setMouseEnabled(enabled)
    }, [])

    const handleCursorToggle = useCallback((enabled: boolean) => {
      setCursorEnabled(enabled)
    }, [setCursorEnabled])

    const handleLoadingComplete = useCallback(() => {
      const el = document.getElementById('vader-loading')
      if (el) {
        el.style.opacity = '0'
        setTimeout(() => setLoading(false), 400)
      } else {
        setLoading(false)
      }
    }, [])

    return (
      <>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

        {/* Full-screen 3D Canvas */}
        <div className="fixed inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0.5, 5], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
          >
            <Scene3D
              modelPath={config.modelPath}
              defaultScale={config.defaultScale}
              scaleScrollFactor={config.scaleScrollFactor}
              defaultY={config.defaultY}
              yScrollFactor={config.yScrollFactor}
              hdrPreset={HDR_PRESETS[currentHdrIndex]}
              bloomPreset={BLOOM_PRESETS[currentBloomIndex]}
              cameraMode={CAMERA_PRESETS[currentCameraIndex]}
              mouseEnabled={mouseEnabled}
              sabers={sabersRef.current}
              onSaberColorChange={SABER_COLORS[currentSaberColorIndex]}
              onRotationSpeed={ROTATION_PRESETS[currentRotationIndex]}
              showContactShadows={config.showContactShadows}
            />
          </Canvas>
        </div>

        {/* Content */}
        <BgOverlay>
          <div className={`relative z-30 transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
            {/* Nav */}
            <TopNav
              chapters={config.chapters}
              archiveLinkUrl={config.archiveLinkUrl}
              archiveLinkTitle={config.archiveLinkTitle}
            />

            {/* Hero */}
            <section className="relative min-h-screen flex items-center justify-center" style={{ zIndex: 30 }}>
              <div className="w-full px-6 pt-20">
                {/* Full-width glass strip — matched to original */}
                <div className="relative w-full py-10 md:py-14 text-center will-change-[backdrop-filter] rounded-2xl"
                  style={{
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    boxShadow: '0 0 60px rgba(255,42,54,0.06)',
                    opacity: 0.99,
                  }}
                >
                  <HeroAnimation>
                    <div className="font-mono text-xs tracking-[0.2em] mb-4" style={{ color: '#ff2a3688' }}>
                      {'// VADER_PROTOCOL'.split('').map((ch, i) => (
                        <span key={i} data-hero-letter className="inline-block overflow-hidden">
                          <span className="inline-block">{ch === ' ' ? '\u00A0' : ch}</span>
                        </span>
                      ))}
                    </div>
                  </HeroAnimation>

                  <HeroAnimation>
                    <h1 className="font-sans text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.02em] leading-none mb-3">
                      {'VADER'.split('').map((ch, i) => (
                        <span key={i} data-hero-letter className="inline-block overflow-hidden">
                          <span className="inline-block" style={{ color: '#f0f0f0' }}>{ch}</span>
                        </span>
                      ))}
                      {'LABZ'.split('').map((ch, i) => (
                        <span key={`r${i}`} data-hero-letter className="inline-block overflow-hidden">
                          <span className="inline-block" style={{ color: '#ff2a36' }}>{ch}</span>
                        </span>
                      ))}
                    </h1>
                  </HeroAnimation>

                  <div className="text-sm md:text-base font-light tracking-[0.2em] mt-3" style={{ color: '#888899' }}>
                    Dev Lab &amp; AI Playground
                  </div>

                  <p className="max-w-[420px] mx-auto text-sm leading-[1.8] mt-5 mb-7" style={{ color: '#9999aa' }}>
                    Building, breaking, and learning. Full-stack AI experiments, personal projects,
                    and new ideas forged in the dark.
                  </p>

                  <div className="flex gap-3 justify-center">
                    <a href={`#${config.chapters[0]?.id ?? 'genesis'}`}
                      className="inline-block px-6 py-3 font-mono text-xs font-semibold tracking-[0.12em] text-white uppercase rounded"
                      style={{ background: '#ff2a36' }}
                    >ENTER THE LAB</a>
                    <a href="https://github.com/jonbeatz" target="_blank" rel="noopener noreferrer"
                      className="inline-block px-6 py-3 font-mono text-xs font-semibold tracking-[0.12em] uppercase rounded transition-all duration-300"
                      style={{ color: '#ff2a36', border: '1px solid rgba(255,42,54,0.2)' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,42,54,0.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >GITHUB ↗</a>
                  </div>
                </div>
              </div>
            </section>

            {/* Chapters with section dividers */}
            {config.chapters.map((ch, i) => (
              <div key={ch.id}>
                <ChapterSection
                  chapter={{ ...ch, detail: '' }}
                  onReadMore={() => setActiveArticle(i)}
                />
                {i < config.chapters.length - 1 && (
                  <div className="flex justify-center py-3" style={{ opacity: 0.2 }}>
                    <svg width="60" height="16" viewBox="0 0 60 16">
                      <line x1="0" y1="8" x2="60" y2="8" stroke={TEXT_DIM} strokeWidth="0.5" />
                      <circle cx="30" cy="8" r="1.5" fill={TEXT_DIM} />
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {/* Stats */}
            <StatsStrip stats={config.stats} ease={EASE} />

            {/* Closing quote */}
            <ClosingQuote />

            {/* Footer */}
            <footer className="text-center py-6 font-mono text-[0.5rem] tracking-[0.15em]" style={{ color: '#555566' }}>
              <div className="relative inline-block">
                <div className="absolute -inset-4 rounded-xl opacity-30 blur-xl" style={{ background: 'radial-gradient(ellipse at center, rgba(255,42,54,0.15) 0%, transparent 70%)' }} />
                <div className="relative px-6 py-3 rounded-xl will-change-[backdrop-filter]" style={{
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  opacity: 0.99,
                }}>
                  &copy; {new Date().getFullYear()} VaderLabz &mdash; Forged in the Dark Side
                </div>
              </div>
            </footer>
          </div>
        </BgOverlay>

        {/* Article overlay */}
        {activeArticle !== null && (
          <ArticleOverlay
            chapter={config.chapters[activeArticle]}
            onClose={() => setActiveArticle(null)}
          />
        )}

        {/* Scroll prompt */}
        {!loading && <ScrollPrompt />}

        {/* Back to top */}
        <BackToTop />

        {/* Hdr Picker Controls */}
        {!loading && (
          <HdrPicker
            onHdrChange={handleHdrChange}
            onBloomChange={handleBloomChange}
            onRotationChange={handleRotationChange}
            onCameraChange={handleCameraChange}
            onSaberColorChange={handleSaberColorChange}
            onMouseToggle={handleMouseToggle}
            onCursorToggle={handleCursorToggle}
            currentHdrIndex={currentHdrIndex}
            currentBloomIndex={currentBloomIndex}
            currentRotationIndex={currentRotationIndex}
            currentCameraIndex={currentCameraIndex}
            currentSaberColorIndex={currentSaberColorIndex}
            mouseEnabled={mouseEnabled}
            cursorEnabled={cursorEnabled}
            hdrEnabled={config.showHdrPicker ?? true}
            bloomEnabled={config.showBloomControls ?? true}
            saberEnabled={config.showSaberControls ?? true}
            cameraEnabled={config.showCameraControls ?? true}
            mouseEnabledToggle={config.showMouseControls ?? true}
          />
        )}
      </>
    )
  }
}
