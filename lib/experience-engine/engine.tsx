'use client'

import React, { useState, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { HDR_PRESETS, BLOOM_PRESETS, ROTATION_PRESETS, CAMERA_PRESETS, SABER_COLORS } from './config'
import { EASE } from './types'
import type { ExperienceConfig, HdrPreset, BloomPreset, RotationPreset, CameraPreset, SaberColorPreset } from './types'

// UI — statically imported
import { TopNav } from './ui/TopNav'
import { ProgressBar } from './ui/ProgressBar'
import { ChapterSection } from './ui/ChapterSection'
import { ArticleOverlay } from './ui/ArticleOverlay'
import { LoadingScreen } from './ui/LoadingScreen'
import { ScrollPrompt } from './ui/ScrollPrompt'
import { BackToTop } from './ui/BackToTop'
import { StatsStrip } from './ui/StatsStrip'
import { ClosingQuote } from './ui/ClosingQuote'
import { HeroAnimation } from './ui/HeroAnimation'
import { BgOverlay } from './ui/BgOverlay'
import { HdrPicker } from './ui/HdrPicker'

// 3D Canvas — dynamic import (no SSR)
const Scene3D = dynamic(
  () => import('./scene/Scene3D').then((m) => m.Scene3D),
  { ssr: false }
)

export default function createVaderExperience(config: ExperienceConfig) {
  return function VaderExperiencePage() {
    const [loading, setLoading] = useState(true)
    const [currentHdrIndex, setCurrentHdrIndex] = useState(config.defaultHdrIndex ?? 0)
    const [currentBloomIndex, setCurrentBloomIndex] = useState(config.defaultBloomIndex ?? 1)
    const [currentRotationIndex, setCurrentRotationIndex] = useState(config.defaultRotationIndex ?? 0)
    const [currentCameraIndex, setCurrentCameraIndex] = useState(config.defaultCameraIndex ?? 0)
    const [currentSaberColorIndex, setCurrentSaberColorIndex] = useState(config.defaultSaberColorIndex ?? 0)
    const [mouseEnabled, setMouseEnabled] = useState(config.defaultMouseEnabled ?? true)
    const [activeArticle, setActiveArticle] = useState<number | null>(null)

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

    const handleLoadingComplete = useCallback(() => {
      setLoading(false)
    }, [])

    return (
      <>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

        <BgOverlay>
          {/* 3D Canvas */}
          {!loading && (
            <Scene3D
              modelPath={config.modelPath}
              defaultScale={config.defaultScale}
              scaleScrollFactor={config.scaleScrollFactor}
              defaultY={config.defaultY}
              yScrollFactor={config.yScrollFactor}
              hdrPreset={HDR_PRESETS[currentHdrIndex]}
              bloomPreset={BLOOM_PRESETS[currentBloomIndex]}
              cameraMode={CAMERA_PRESETS[currentCameraIndex]}
              sabers={sabersRef.current}
              onSaberColorChange={SABER_COLORS[currentSaberColorIndex]}
              onRotationSpeed={ROTATION_PRESETS[currentRotationIndex]}
            />
          )}

          {/* Nav */}
          <TopNav
            chapters={config.chapters}
            archiveLinkUrl={config.archiveLinkUrl}
            archiveLinkTitle={config.archiveLinkTitle}
          />

          {/* Progress bar */}
          <ProgressBar chapters={config.chapters} />

          {/* Hero */}
          <section id="hero" className="relative min-h-screen flex items-center px-5 md:px-[10%]" style={{ zIndex: 30 }}>
            <HeroAnimation>
              <div className="max-w-[600px]">
                <div className="font-mono text-[0.6rem] tracking-[0.3em] text-[#ff2a36] mb-4">VADERLABZ PROJECT</div>
                <h1 className="font-sans text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-[#f0f0f0]" suppressHydrationWarning
                  dangerouslySetInnerHTML={{ __html: 'Forged in the<br/>Dark Side of<br/>Development' }}
                />
                <svg width="80" height="1" className="mt-6 mb-6"><line x1="0" y1="0.5" x2="80" y2="0.5" stroke="rgba(255,42,54,0.3)" strokeWidth="1" /></svg>
                <p className="text-sm md:text-base leading-[1.8] text-[#888899] max-w-[420px]">
                  Where experimental development meets bold execution. This is not just a portfolio — it is a forge.
                </p>
              </div>
            </HeroAnimation>
          </section>

          {/* Chapters */}
          {config.chapters.map((ch, i) => (
            <ChapterSection
              key={ch.id}
              chapter={{ ...ch, detail: '' }}
              onReadMore={() => setActiveArticle(i)}
            />
          ))}

          {/* Stats */}
          <StatsStrip stats={config.stats} ease={EASE} />

          {/* Closing quote */}
          <ClosingQuote />

          {/* Footer */}
          <footer className="py-10 text-center" style={{ zIndex: 30, position: 'relative' }}>
            <div className="font-mono text-[0.5rem] tracking-[0.3em] text-[#555566]">
              &copy; {new Date().getFullYear()} VaderLabz &mdash; Forged in the Dark Side
            </div>
          </footer>
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
            currentHdrIndex={currentHdrIndex}
            currentBloomIndex={currentBloomIndex}
            currentRotationIndex={currentRotationIndex}
            currentCameraIndex={currentCameraIndex}
            currentSaberColorIndex={currentSaberColorIndex}
            mouseEnabled={mouseEnabled}
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
