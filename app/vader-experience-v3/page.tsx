'use client'

import { useEffect, useRef, useState, useCallback, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// Preload the Skywalker lightsaber model (matched to v2) so it's cached before the Canvas mounts
useGLTF.preload('/media/skywalker_lightsaber.glb')

// ─── HDR Environment Presets ───────────────────────────────────────────────
const HDR_PRESETS: { label: string; file: string }[] = [
  { label: 'Neon Studio', file: '/media/neon_photostudio_1k.exr' },
  { label: 'Colorful',    file: '/media/colorful_studio_1k.exr' },
  { label: 'Photo Studio', file: '/media/photo_studio_01_1k.exr' },
  { label: 'Office',      file: '/media/poly_haven_studio_1k.exr' },
]

// ─── Bloom Intensity Presets ────────────────────────────────────────────────
const BLOOM_PRESETS: { label: string; intensity: number }[] = [
  { label: 'Off',   intensity: 0 },
  { label: 'Low',   intensity: 0.15 },
  { label: 'Med',   intensity: 0.3 },
  { label: 'High',  intensity: 0.6 },
]

// ─── Saber Rotation Speed Presets ───────────────────────────────────────────
const ROTATION_PRESETS: { label: string; speed: number }[] = [
  { label: 'Off',  speed: 0 },
  { label: 'Slow', speed: 0.1 },
  { label: 'Norm', speed: 0.25 },
  { label: 'Fast', speed: 0.5 },
]

// ─── Camera Orbit Modes ─────────────────────────────────────────────────────
const CAMERA_PRESETS: { label: string; mode: 'static' | 'slow' | 'full' }[] = [
  { label: 'Static', mode: 'static' },
  { label: 'Slow',   mode: 'slow' },
  { label: 'Full',   mode: 'full' },
]

// ─── Saber Blade Colors ─────────────────────────────────────────────────────
const SABER_COLORS: { label: string; color: [number, number, number] }[] = [
  { label: 'Red',    color: [1.0, 0.0, 0.0] },
  { label: 'Blue',   color: [0.0, 0.3, 1.0] },
  { label: 'Green',  color: [0.0, 0.8, 0.2] },
  { label: 'Purple', color: [0.7, 0.0, 0.8] },
]
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursor } from '@/lib/cursor-context'

gsap.registerPlugin(ScrollTrigger)

// ─── Constants ──────────────────────────────────────────────────────────────
const EASE = 'power3.inOut'
const BG_DEEP = '#000000'
const ACCENT = '#ff2a36'
const TEXT_MUTED = '#888899'
const TEXT_DIM = '#555566'
const TEXT_PRIMARY = '#f0f0f0'

// ─── Chapter data ───────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id: 'genesis',
    marker: '01',
    title: 'The <i>Genesis</i>',
    subtitle: 'Where the Lab Was Born',
    summary: 'In the dark hours of late 2025, a single terminal window opened. What began as a playground became a forge — the birthplace of VaderLabz.',
    detail: 'JonBeatz didn\'t set out to build VaderLabz. He set out to build things that worked. But as projects accumulated, a pattern emerged: every build shared the same bones — the same scripts, the same MCP wiring, the same Mem0 vector store patterns.\n\nWhat started as a personal CLI toolkit evolved into a full-profile Hermes ecosystem. The shared-profile-content skeleton was born first — a reusable brain for new projects. Then came the 3D Playground, the Draven co-pilot, and the realization that the real product wasn\'t any single app: it was the system itself.\n\nVaderLabz became the lab where that system was proven.',
    camera: { x: 0, y: 0.5, z: 5 },
    target: { x: 0, y: 0, z: 0 },
  },
  {
    id: 'skeleton',
    marker: '02',
    title: 'The <i>Skeleton</i> System',
    subtitle: 'Build Once, Deploy Everywhere',
    summary: 'Every new project bootstraps from shared-profile-content — a living skeleton of rules, skills, prompts, docs, and MCP config.',
    detail: 'The shared-profile-content skeleton is the beating heart of the VaderLabz workflow. It contains templates for TRUTH.md, AGENTS.md, START-HERE.md, and 15+ rules files that encode years of operational wisdom.\n\nWhen a new project is born — VaderLabz, MyStudioChannel, Profile Jedi — it gets the same foundation. The skeleton evolves as we learn. New skills (NovaMira Design, Three.js-Ops, Hostinger-Ops) are backported into it.\n\nFixes to PowerShell scripts are pushed once, and every project benefits.',
    camera: { x: -1.5, y: 0.8, z: 3 },
    target: { x: 0, y: 0.3, z: 0 },
  },
  {
    id: 'draven',
    marker: '03',
    title: '<i>Draven</i>: The Co-Pilot',
    subtitle: 'Memory That Spans Sessions',
    summary: 'Draven is the persistent AI co-pilot — a voice in the terminal that remembers across projects, sessions, and reboots.',
    detail: 'Draven isn\'t a chatbot — he\'s a memory layer. Every draven:add command seeds a recollection that lives in qdrant_draven, isolated from project-specific vaderlabz_memories.\n\nWhen Jon says "you know what I want," Draven does — because the history lives in the vectors, not the conversation window.',
    camera: { x: 1.8, y: 1.2, z: 2.5 },
    target: { x: 0, y: -0.2, z: 0 },
  },
  {
    id: 'command-center',
    marker: '04',
    title: 'The <i>Command</i> Center',
    subtitle: 'Port 3000, 4000, 1234 — All Listening',
    summary: 'A personal AI command center running LiteLLM, LM Studio, and ngrok — all locally on a single Windows machine.',
    detail: 'The stack never sleeps. LM Studio serves qwen3-4b-instruct-2507 for Mem0 semantic search. LiteLLM proxies deepseek-v4-pro and deepseek-v4-flash for paid cloud inference.\n\nHermes Desktop sits on top, letting Jon switch between free local and paid cloud with a single picker click.',
    camera: { x: 0, y: -0.5, z: 4.5 },
    target: { x: 0, y: -0.5, z: 0 },
  },
  {
    id: 'design-system',
    marker: '05',
    title: 'The <i>Design</i> System',
    subtitle: 'From Gold to Red — A Visual Language',
    summary: 'VaderLabz Red (#ff2a36) is the signature accent — aggressive, confident, unmistakable across every surface.',
    detail: 'The VaderLabz visual system draws from Zera Studio\'s scroll-driven luxury, NovaMira\'s bento grid discipline, and raw industrial red borrowed from sci-fi interfaces.\n\nThe stack: Lenis smooth scroll, GSAP + ScrollTrigger for hero letter animations, @react-three/postprocessing bloom, and the Skywalker lightsaber GLB model bathed in neon_photostudio HDR.',
    camera: { x: -1.2, y: 0, z: 3.8 },
    target: { x: 0, y: 0, z: 0 },
  },
]

const STATS = [
  { num: '47', label: 'Active Projects' },
  { num: '1.8k+', label: 'GitHub Commits' },
  { num: '6', label: 'MCP Servers' },
  { num: '100%', label: 'Open Source' },
]

// ─── Scroll Progress ────────────────────────────────────────────────────────
function getScrollProgress(): number {
  if (typeof window === 'undefined') return 0
  const total = document.documentElement.scrollHeight - window.innerHeight
  return total > 0 ? Math.min(window.scrollY / total, 1) : 0
}

// ─── 3D Scene ───────────────────────────────────────────────────────────────
function SaberModel({ progressRef, rotationSpeed, saberColor, cameraMode, mouseEnabled }: {
  progressRef: React.MutableRefObject<number>;
  rotationSpeed: number;
  saberColor: [number, number, number];
  cameraMode: 'static' | 'slow' | 'full';
  mouseEnabled: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/media/skywalker_lightsaber.glb')
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  const [error, setError] = useState(false)

  // Clone scene once on mount
  const sceneClone = useMemo(() => {
    try {
      return scene.clone()
    } catch (e) {
      console.error('Model clone error:', e)
      setError(true)
      return null
    }
  }, [scene])

  // Blade material reference — cached from the cloned scene
  const bladeMatRef = useRef<THREE.MeshStandardMaterial | null>(null)

  // On mount or scene change, find the blade material from the clone
  useEffect(() => {
    if (!sceneClone) return
    sceneClone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(m => { m.needsUpdate = true })
          } else {
            child.material.needsUpdate = true
          }
        }
        if (child.name && child.name.toLowerCase().includes('blade')) {
          const mat = child.material
          if (mat && !Array.isArray(mat)) {
            bladeMatRef.current = mat as THREE.MeshStandardMaterial
          }
        }
      }
    })
  }, [sceneClone])

  // When saberColor changes, update just the emissive on the cached blade material
  useEffect(() => {
    if (bladeMatRef.current) {
      bladeMatRef.current.emissive = new THREE.Color(saberColor[0], saberColor[1], saberColor[2])
      bladeMatRef.current.emissiveIntensity = 15
    }
  }, [saberColor])

  // Mouse parallax
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  useFrame((state, delta) => {
    const g = groupRef.current
    if (!g) return
    const p = progressRef.current

    // Rotation — uses speed from picker
    g.rotation.y += delta * rotationSpeed
    g.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.03 + p * 0.08

    // Mouse-follow parallax (toggleable)
    if (mouseEnabled) {
      g.rotation.z += (mouseRef.current.x * 0.03 - g.rotation.z) * 0.03
    }

    // Scale — Skywalker saber is small, grows slightly with scroll
    g.scale.setScalar(0.18 + p * 0.06)

    // Position — peeking above blur bar, lowers as user scrolls down
    g.position.y = 0.6 + p * -1.8

    // Camera orbit
    if (cameraMode === 'full') {
      const orbitAngle = p * Math.PI * 2
      camera.position.x = Math.sin(orbitAngle) * 5
      camera.position.z = Math.cos(orbitAngle) * 5
      camera.position.y = 1.0 - p * 0.5
      camera.lookAt(0, 0, 0)
    } else if (cameraMode === 'slow') {
      const orbitAngle = p * Math.PI
      camera.position.x = Math.sin(orbitAngle) * 4
      camera.position.z = Math.cos(orbitAngle) * 4
      camera.position.y = 0.8
      camera.lookAt(0, 0, 0)
    } else {
      // Static camera — default position
      camera.position.x = 0
      camera.position.z = 5
      camera.position.y = 0.5
      camera.lookAt(0, 0, 0)
    }
  })

  if (error || !sceneClone) return null

  return <primitive ref={groupRef} object={sceneClone} />
}

function Scene3D({ progressRef, hdrFile, bloomIntensity, rotationSpeed, saberColor, cameraMode, mouseEnabled }: {
  progressRef: React.MutableRefObject<number>;
  hdrFile: string;
  bloomIntensity: number;
  rotationSpeed: number;
  saberColor: [number, number, number];
  cameraMode: 'static' | 'slow' | 'full';
  mouseEnabled: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={4} />
      <directionalLight position={[-5, 3, -5]} intensity={2} color="#ff2a36" />
      <directionalLight position={[0, 5, 3]} intensity={1} color="#ff6600" />

      <Suspense fallback={null}>
        <SaberModel progressRef={progressRef} rotationSpeed={rotationSpeed} saberColor={saberColor} cameraMode={cameraMode} mouseEnabled={mouseEnabled} />
        <Environment files={hdrFile} blur={0.2} />
      </Suspense>

      {bloomIntensity > 0 && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.02} intensity={bloomIntensity} mipmapBlur kernelSize={1} />
        </EffectComposer>
      )}
    </>
  )
}

// ─── Loading Screen ─────────────────────────────────────────────────────────
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
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

// ─── Article Overlay ────────────────────────────────────────────────────────
function ArticleOverlay({ chapter, onClose }: { chapter: (typeof CHAPTERS)[0]; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
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
      ref={overlayRef}
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
        >✕</button>

        <div className="font-mono text-xs tracking-[0.15em] text-[#ff2a36] mb-3">{chapter.marker}</div>
          <h2 className="font-sans text-3xl md:text-4xl font-semibold leading-tight mb-6"
          style={{ color: TEXT_PRIMARY }}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: chapter.title }}
        />

        {/* Decorative divider */}
        <div className="flex items-center gap-3 mb-6">
          <svg width="40" height="1"><line x1="0" y1="0.5" x2="40" y2="0.5" stroke="rgba(255,42,54,0.3)" strokeWidth="1" /></svg>
          <svg width="4" height="4" viewBox="0 0 4 4"><circle cx="2" cy="2" r="2" fill="#ff2a36" /></svg>
          <svg width="40" height="1"><line x1="0" y1="0.5" x2="40" y2="0.5" stroke="rgba(255,42,54,0.15)" strokeWidth="1" /></svg>
        </div>

        <div className="text-sm md:text-base leading-[1.9] space-y-4" style={{ color: '#888899' }}>
          {chapter.detail.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </div>
  )
}

// ─── Chapter Section (scroll-driven content panel) ──────────────────────────
function ChapterSection({ chapter, onReadMore }: { chapter: (typeof CHAPTERS)[0]; onReadMore: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 35%', toggleActions: 'play none none reverse' },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id={chapter.id} ref={sectionRef} className="relative min-h-screen flex items-center py-16 md:py-24">
      <div className="w-full">
        {/* Content panel with glass effect */}
        <div className="relative max-w-[440px] ml-[6%] md:ml-[15%] p-6 md:p-8 rounded-xl md:rounded-2xl will-change-[backdrop-filter]"
          style={{
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.04)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 60px rgba(255,42,54,0.06)',
            opacity: 0.99,
          }}
          >
          {/* Marker */}
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[0.6rem] tracking-[0.2em] text-[#ff2a36]">{chapter.marker}</span>
            <svg width="40" height="1"><line x1="0" y1="0.5" x2="40" y2="0.5" stroke="rgba(255,42,54,0.15)" strokeWidth="1" /></svg>
          </div>

          <h2
            className="font-sans text-3xl md:text-4xl font-semibold leading-[1.1] mb-1"
            style={{ color: TEXT_PRIMARY }}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: chapter.title }}
          />
          <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-5" style={{ color: TEXT_DIM }}>
            {chapter.subtitle}
          </div>

          {/* Decorative line */}
          <svg width="60" height="1" className="mb-5"><line x1="0" y1="0.5" x2="60" y2="0.5" stroke="rgba(255,42,54,0.2)" strokeWidth="1" /></svg>

          <p className="text-sm leading-[1.8] mb-7" style={{ color: '#9999aa' }}>
            {chapter.summary}
          </p>

          <button
            onClick={onReadMore}
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-[#ff2a36] hover:opacity-70 transition-opacity uppercase"
          >
            Read More
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M5 3l4 4-4 4" stroke="#ff2a36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Stats ──────────────────────────────────────────────────────────────────
function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelectorAll('.stat-item'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: EASE, stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 50%', toggleActions: 'play none none reverse' },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-20">
      <div className="flex items-center justify-center gap-4 md:gap-12 flex-wrap px-6">
        {STATS.map((s, i) => (
          <div key={s.label} className="flex items-center gap-4 md:gap-12">
            <div className="stat-item flex flex-col items-center gap-1">
              <span className="font-sans text-3xl md:text-5xl font-bold leading-none" style={{ color: ACCENT }}>{s.num}</span>
              <span className="font-mono text-[0.55rem] tracking-[0.2em]" style={{ color: TEXT_DIM }}>{s.label}</span>
            </div>
            {i < STATS.length - 1 && (
              <div className="w-px h-10 hidden md:block" style={{ background: 'rgba(255,255,255,0.04)' }} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Closing ────────────────────────────────────────────────────────────────
function ClosingQuote() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 45%', toggleActions: 'play none none reverse' },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="min-h-[60vh] flex items-center justify-center py-24">
      <div className="text-center max-w-[650px] px-6">
        {/* Glass backdrop with glow */}
        <div
          className="relative p-8 md:p-12 rounded-2xl will-change-[backdrop-filter]"
          style={{
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.04)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 60px rgba(255,42,54,0.06)',
            opacity: 0.99,
          }}
        >
          <div className="font-sans text-3xl md:text-5xl italic leading-tight mb-3" style={{ color: TEXT_PRIMARY }}>
            <span className="text-5xl" style={{ color: ACCENT }}>&ldquo;</span>Build, break, and learn. Forged in the dark.<span className="text-5xl" style={{ color: ACCENT }}>&rdquo;</span>
          </div>
          <div className="font-mono text-xs tracking-[0.15em] uppercase" style={{ color: TEXT_DIM }}>
            &mdash; VaderLabz
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-8 mb-6">
            <svg width="40" height="1"><line x1="0" y1="0.5" x2="40" y2="0.5" stroke="rgba(255,42,54,0.3)" strokeWidth="1" /></svg>
            <svg width="4" height="4" viewBox="0 0 4 4"><circle cx="2" cy="2" r="2" fill="#ff2a36" /></svg>
            <svg width="40" height="1"><line x1="0" y1="0.5" x2="40" y2="0.5" stroke="rgba(255,42,54,0.15)" strokeWidth="1" /></svg>
          </div>

          <div className="font-sans text-2xl italic" style={{ color: ACCENT }}>Vader Protocol v1.0</div>
          <div className="mt-2 font-mono text-[0.55rem] tracking-[0.3em] uppercase" style={{ color: TEXT_DIM }}>
            Experience Made With VaderLabz
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Scroll Prompt ──────────────────────────────────────────────────────────
function ScrollPrompt() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const scrolled = window.scrollY
      const maxScroll = window.innerHeight * 0.3 // fade out after 30% of viewport
      const opacity = Math.max(0, 1 - scrolled / maxScroll)
      el.style.opacity = String(opacity)
      if (opacity <= 0) el.style.pointerEvents = 'none'
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div ref={ref} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none" style={{ transition: 'opacity 0.2s ease' }}>
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-[0.55rem] tracking-[0.2em]" style={{ color: TEXT_DIM }}>SCROLL</span>
        <svg width="14" height="14" viewBox="0 0 14 14" className="animate-bounce" style={{ animationDuration: '2s' }}>
          <line x1="7" y1="2" x2="7" y2="9" stroke={TEXT_DIM} strokeWidth="1" />
          <polyline points="4,6 7,10 10,6" fill="none" stroke={TEXT_DIM} strokeWidth="1" />
        </svg>
        <span className="font-mono text-[0.55rem] tracking-[0.2em]" style={{ color: TEXT_DIM }}>TO START EXPERIENCE</span>
      </div>
    </div>
  )
}

// ─── Back to Top ─────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.5)
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-5 z-[100] transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,42,54,0.2)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 13V3M8 3L4 7M8 3L12 7" stroke="#ff2a36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  )
}

// ─── Progress ───────────────────────────────────────────────────────────────
function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  // Set refs imperatively in useEffect instead of callback refs (avoids hydration mismatch)
  useEffect(() => {
    const buttons = document.querySelectorAll('.progress-dot')
    buttons.forEach((btn, i) => {
      // no-op, we just let buttons exist without storing refs for scroll logic
    })
  }, [])

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const update = () => {
      const p = getScrollProgress()
      bar.style.transform = `scaleY(${p})`
      // Highlight active dot
      const idx = Math.min(Math.floor(p * CHAPTERS.length), CHAPTERS.length - 1)
      document.querySelectorAll('.progress-dot').forEach((dot, i) => {
        (dot as HTMLElement).style.opacity = i === idx ? '1' : '0.25'
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80 // offset for fixed header
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col items-center gap-3">
      <div className="w-[2px] h-[120px] rounded-full overflow-hidden mb-1" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div ref={barRef} className="w-full origin-top" style={{ background: ACCENT, transform: 'scaleY(0)', height: '100%' }} />
      </div>
      {CHAPTERS.map((ch, i) => (
        <button
          key={ch.id}
          onClick={() => scrollToSection(ch.id)}
          className="progress-dot font-mono text-[0.55rem] tracking-[0.15em] uppercase transition-all duration-300 hover:opacity-100"
          style={{ color: ACCENT, opacity: 0.25 }}
          title={ch.title.replace(/<[^>]*>/g, '')}
        >
          {ch.marker}
        </button>
      ))}
      <button onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
        className="font-mono text-[0.55rem] tracking-[0.15em] uppercase transition-all duration-300 hover:opacity-100"
        style={{ color: ACCENT, opacity: 0.25 }}
        title="Bottom"
      >06</button>
    </div>
  )
}

// ─── Top Nav ────────────────────────────────────────────────────────────────
function TopNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-4"
      style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, transparent 100%)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <nav className="flex items-center justify-between">
        <button onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
          className="font-mono text-sm font-bold tracking-[0.25em] transition-colors duration-300 hover:opacity-80"
          style={{ color: TEXT_PRIMARY }}
        >
          <span style={{ color: TEXT_PRIMARY }}>VADER</span><span style={{ color: ACCENT }}>LABZ</span>
        </button>
        <div className="flex gap-5 md:gap-8">
          {CHAPTERS.map((ch) => (
            <button key={ch.id} onClick={() => {
              const el = document.getElementById(ch.id)
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 80
                window.scrollTo({ top, behavior: 'smooth' })
              }
            }}
              className="font-mono text-[0.55rem] tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#ff2a36]"
              style={{ color: TEXT_DIM }}
            >{ch.marker}</button>
          ))}
          <button onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
            className="font-mono text-[0.55rem] tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#ff2a36]"
            style={{ color: TEXT_DIM }}
          >06</button>
          <a href="/"
            className="font-mono text-[0.5rem] tracking-[0.15em] uppercase transition-colors duration-300 hover:text-[#ff2a36] ml-2"
            style={{ color: '#444466' }}
          title="Go to main experience">°</a>
        </div>
      </nav>
    </header>
  )
}

// ─── Background gradient overlays ──────────────────────────────────────────
function BgOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Full-screen background image — behind 3D canvas */}
      <div className="fixed inset-0 z-[-1]">
        <img
          src="/media/vaderBG-2.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.65) saturate(0.9)' }}
        />
        {/* Dark overlay for additional dimming */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.75) 100%)'
        }} />
      </div>
      {/* Vignette effect */}
      <div className="fixed inset-0 z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 90%, rgba(0,0,0,0.95) 100%)',
        }}
      />
      {/* Red accent glow */}
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

// ─── Hero Entrance ──────────────────────────────────────────────────────────
function HeroAnimation({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const letters = el.querySelectorAll<HTMLElement>('[data-hero-letter]')
    const ctx = gsap.context(() => {
      gsap.fromTo(letters,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.5, stagger: { each: 0.02, from: 'start' }, ease: 'power3.out', delay: 0.2 },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return <div ref={ref}>{children}</div>
}

// ─── HDR + Scene Controls Picker (collapsible accordion, bottom-left) ────────
function HdrPicker({ hdrIndex, setHdrIndex, bloomIndex, setBloomIndex, rotationIndex, setRotationIndex, cameraIndex, setCameraIndex, saberColorIndex, setSaberColorIndex, mouseEnabled, setMouseEnabled, cursorEnabled, setCursorEnabled }: {
  hdrIndex: number; setHdrIndex: (i: number) => void;
  bloomIndex: number; setBloomIndex: (i: number) => void;
  rotationIndex: number; setRotationIndex: (i: number) => void;
  cameraIndex: number; setCameraIndex: (i: number) => void;
  saberColorIndex: number; setSaberColorIndex: (i: number) => void;
  mouseEnabled: boolean; setMouseEnabled: (v: boolean) => void;
  cursorEnabled: boolean; setCursorEnabled: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? null : id)
  }

  return (
    <>
      {/* Collapsed: just the diamond button */}
      {!open && (
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
      )}

      {/* Expanded panel */}
      {open && (
        <div className="fixed bottom-6 left-6 z-50"
          style={{
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            padding: '10px 14px',
            maxWidth: '320px',
          }}
        >
          <div className="flex flex-col gap-0.5">

            {/* === Accordion: Scene (HDR) === */}
            <AccordionSection
              id="scene"
              label="Scene"
              activeSection={activeSection}
              onToggle={toggleSection}
            >
              <div className="flex flex-wrap gap-1.5">
                {HDR_PRESETS.map((preset, i) => (
                  <button key={preset.label} onClick={() => setHdrIndex(i)}
                    className="font-mono text-[0.6rem] tracking-[0.1em] px-3 py-1 rounded-full transition-all duration-300"
                    style={{
                      color: i === hdrIndex ? '#fff' : '#7788aa',
                      background: i === hdrIndex ? 'rgba(255,42,54,0.3)' : 'transparent',
                      border: i === hdrIndex ? '1px solid rgba(255,42,54,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >{preset.label}</button>
                ))}
              </div>
            </AccordionSection>

            {/* === Accordion: Bloom === */}
            <AccordionSection
              id="bloom"
              label="Bloom"
              activeSection={activeSection}
              onToggle={toggleSection}
            >
              <div className="flex flex-wrap gap-1.5">
                {BLOOM_PRESETS.map((preset, i) => (
                  <button key={preset.label} onClick={() => setBloomIndex(i)}
                    className="font-mono text-[0.6rem] tracking-[0.1em] px-3 py-1 rounded-full transition-all duration-300"
                    style={{
                      color: i === bloomIndex ? '#fff' : '#7788aa',
                      background: i === bloomIndex ? 'rgba(255,42,54,0.3)' : 'transparent',
                      border: i === bloomIndex ? '1px solid rgba(255,42,54,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >{preset.label}</button>
                ))}
              </div>
            </AccordionSection>

            {/* === Accordion: Saber === */}
            <AccordionSection
              id="saber"
              label="Saber"
              activeSection={activeSection}
              onToggle={toggleSection}
            >
              <div className="flex flex-col gap-2">
                <div>
                  <div className="font-mono text-[0.55rem] tracking-[0.12em] mb-1" style={{ color: '#8899bb' }}>ROTATION</div>
                  <div className="flex flex-wrap gap-1.5">
                    {ROTATION_PRESETS.map((preset, i) => (
                      <button key={preset.label} onClick={() => setRotationIndex(i)}
                        className="font-mono text-[0.6rem] tracking-[0.1em] px-3 py-1 rounded-full transition-all duration-300"
                        style={{
                          color: i === rotationIndex ? '#fff' : '#7788aa',
                          background: i === rotationIndex ? 'rgba(255,42,54,0.3)' : 'transparent',
                          border: i === rotationIndex ? '1px solid rgba(255,42,54,0.4)' : '1px solid rgba(255,255,255,0.08)',
                        }}
                      >{preset.label}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[0.55rem] tracking-[0.12em] mb-1" style={{ color: '#8899bb' }}>BLADE COLOR</div>
                  <div className="flex flex-wrap gap-1.5">
                    {SABER_COLORS.map((preset, i) => (
                      <button key={preset.label} onClick={() => setSaberColorIndex(i)}
                        className="font-mono text-[0.6rem] tracking-[0.1em] px-3 py-1 rounded-full transition-all duration-300"
                        style={{
                          color: i === saberColorIndex ? '#fff' : '#7788aa',
                          background: i === saberColorIndex ? 'rgba(255,42,54,0.3)' : 'transparent',
                          border: i === saberColorIndex ? '1px solid rgba(255,42,54,0.4)' : '1px solid rgba(255,255,255,0.08)',
                        }}
                      >{preset.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionSection>

            {/* === Accordion: Camera === */}
            <AccordionSection
              id="camera"
              label="Camera"
              activeSection={activeSection}
              onToggle={toggleSection}
            >
              <div className="flex flex-wrap gap-1.5">
                {CAMERA_PRESETS.map((preset, i) => (
                  <button key={preset.label} onClick={() => setCameraIndex(i)}
                    className="font-mono text-[0.6rem] tracking-[0.1em] px-3 py-1 rounded-full transition-all duration-300"
                    style={{
                      color: i === cameraIndex ? '#fff' : '#7788aa',
                      background: i === cameraIndex ? 'rgba(255,42,54,0.3)' : 'transparent',
                      border: i === cameraIndex ? '1px solid rgba(255,42,54,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >{preset.label}</button>
                ))}
              </div>
            </AccordionSection>

            {/* === Accordion: Mouse === */}
            <AccordionSection
              id="mouse"
              label="Mouse"
              activeSection={activeSection}
              onToggle={toggleSection}
            >
              {/* Saber parallax sub-section */}
              <div className="font-mono text-[0.6rem] tracking-[0.1em] mb-2 mt-1 flex items-center gap-2"
                style={{ color: '#667' }}
              ><span style={{ width: 4, height: 4, borderRadius: '50%', background: '#ff2a36', display: 'inline-block' }} />
                Saber Move</div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                <button onClick={() => setMouseEnabled(true)}
                  className="font-mono text-[0.6rem] tracking-[0.1em] px-3 py-1 rounded-full transition-all duration-300"
                  style={{
                    color: mouseEnabled ? '#fff' : '#7788aa',
                    background: mouseEnabled ? 'rgba(255,42,54,0.3)' : 'transparent',
                    border: mouseEnabled ? '1px solid rgba(255,42,54,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >On</button>
                <button onClick={() => setMouseEnabled(false)}
                  className="font-mono text-[0.6rem] tracking-[0.1em] px-3 py-1 rounded-full transition-all duration-300"
                  style={{
                    color: !mouseEnabled ? '#fff' : '#7788aa',
                    background: !mouseEnabled ? 'rgba(255,42,54,0.3)' : 'transparent',
                    border: !mouseEnabled ? '1px solid rgba(255,42,54,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >Off</button>
              </div>

              {/* Cursor dot sub-section */}
              <div className="font-mono text-[0.6rem] tracking-[0.1em] mb-2 mt-1 flex items-center gap-2"
                style={{ color: '#667' }}
              ><span style={{ width: 4, height: 4, borderRadius: '50%', background: '#ff2a36', display: 'inline-block' }} />
                Cursor Dot</div>
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => setCursorEnabled(true)}
                  className="font-mono text-[0.6rem] tracking-[0.1em] px-3 py-1 rounded-full transition-all duration-300"
                  style={{
                    color: cursorEnabled ? '#fff' : '#7788aa',
                    background: cursorEnabled ? 'rgba(255,42,54,0.3)' : 'transparent',
                    border: cursorEnabled ? '1px solid rgba(255,42,54,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >On</button>
                <button onClick={() => setCursorEnabled(false)}
                  className="font-mono text-[0.6rem] tracking-[0.1em] px-3 py-1 rounded-full transition-all duration-300"
                  style={{
                    color: !cursorEnabled ? '#fff' : '#7788aa',
                    background: !cursorEnabled ? 'rgba(255,42,54,0.3)' : 'transparent',
                    border: !cursorEnabled ? '1px solid rgba(255,42,54,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >Off</button>
              </div>
            </AccordionSection>

            {/* Close button */}
            <div className="flex items-center justify-start pt-1 mt-0.5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
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
        </div>
      )}
    </>
  )
}

// ─── Accordion Section Sub-component ────────────────────────────────────────
function AccordionSection({ id, label, activeSection, onToggle, children }: {
  id: string;
  label: string;
  activeSection: string | null;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}) {
  const isOpen = activeSection === id
  return (
    <div>
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between font-mono text-[0.65rem] tracking-[0.12em] py-1.5 px-1.5 rounded transition-all duration-200 hover:bg-white/5"
        style={{ color: '#99aabb' }}
      >
        <span>{label}</span>
        <span style={{
          display: 'inline-block',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
          fontSize: '0.55rem',
        }}>▸</span>
      </button>
      <div style={{
        maxHeight: isOpen ? '200px' : '0px',
        opacity: isOpen ? 1 : 0,
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        paddingLeft: '4px',
      }}>
        <div className="pt-1 pb-1.5">
          {children}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// PAGE
// ============================================================================
export default function VaderExperiencePage() {
  const [loading, setLoading] = useState(true)
  const [activeArticle, setActiveArticle] = useState<number | null>(null)
  const [hdrIndex, setHdrIndex] = useState(0)
  const [bloomIndex, setBloomIndex] = useState(2)
  const [rotationIndex, setRotationIndex] = useState(1)
  const [cameraIndex, setCameraIndex] = useState(2)
  const [saberColorIndex, setSaberColorIndex] = useState(0)
  const [mouseEnabled, setMouseEnabled] = useState(true)
  const { cursorEnabled, setCursorEnabled } = useCursor()
  const progressRef = useRef(0)

  // Track scroll progress for 3D scene
  useEffect(() => {
    const update = () => { progressRef.current = getScrollProgress() }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const handleComplete = useCallback(() => {
    const el = document.getElementById('vader-loading')
    if (el) {
      el.style.opacity = '0'
      setTimeout(() => setLoading(false), 400)
    } else {
      setLoading(false)
    }
  }, [])

  const currentHdr = HDR_PRESETS[hdrIndex].file
  const currentBloom = BLOOM_PRESETS[bloomIndex].intensity
  const currentRotation = ROTATION_PRESETS[rotationIndex].speed
  const currentCamera = CAMERA_PRESETS[cameraIndex].mode
  const currentSaberColor = SABER_COLORS[saberColorIndex].color

  return (
    <>
      {loading && <LoadingScreen onComplete={handleComplete} />}

      {/* Full-screen 3D Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0.5, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        >
          <Scene3D progressRef={progressRef} hdrFile={currentHdr} bloomIntensity={currentBloom} rotationSpeed={currentRotation} saberColor={currentSaberColor} cameraMode={currentCamera} mouseEnabled={mouseEnabled} />
        </Canvas>
      </div>

      {/* HDR Environment Picker — collapsible icon */}
      {!loading && (
        <HdrPicker
          hdrIndex={hdrIndex} setHdrIndex={setHdrIndex}
          bloomIndex={bloomIndex} setBloomIndex={setBloomIndex}
          rotationIndex={rotationIndex} setRotationIndex={setRotationIndex}
          cameraIndex={cameraIndex} setCameraIndex={setCameraIndex}
          saberColorIndex={saberColorIndex} setSaberColorIndex={setSaberColorIndex}
          mouseEnabled={mouseEnabled} setMouseEnabled={setMouseEnabled}
          cursorEnabled={cursorEnabled} setCursorEnabled={setCursorEnabled}
        />
      )}

      {/* Content */}
      <BgOverlay>
        <div className={`relative z-30 transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <TopNav />
          <ScrollPrompt />

          {/* Hero */}
          <section className="relative min-h-screen flex items-center justify-center">
            <div className="w-full px-6 pt-20">
              {/* Full-width glass strip so text isn't squeezed */}
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
                        <span className="inline-block" style={{ color: TEXT_PRIMARY }}>{ch}</span>
                      </span>
                    ))}
                    {'LABZ'.split('').map((ch, i) => (
                      <span key={`r${i}`} data-hero-letter className="inline-block overflow-hidden">
                        <span className="inline-block" style={{ color: '#ff2a36' }}>{ch}</span>
                      </span>
                    ))}
                  </h1>
                </HeroAnimation>

                <div className="text-sm md:text-base font-light tracking-[0.2em] mt-3" style={{ color: TEXT_MUTED }}>
                  Dev Lab &amp; AI Playground
                </div>

                <p className="max-w-[420px] mx-auto text-sm leading-[1.8] mt-5 mb-7" style={{ color: '#9999aa' }}>
                  Building, breaking, and learning. Full-stack AI experiments, personal projects,
                  and new ideas forged in the dark.
                </p>

                <div className="flex gap-3 justify-center">
                  <a href="#genesis"
                    className="inline-block px-6 py-3 font-mono text-xs font-semibold tracking-[0.12em] text-white uppercase rounded"
                    style={{ background: ACCENT }}
                  >ENTER THE LAB</a>
                  <a href="https://github.com/jonbeatz" target="_blank" rel="noopener noreferrer"
                    className="inline-block px-6 py-3 font-mono text-xs font-semibold tracking-[0.12em] uppercase rounded transition-all duration-300"
                    style={{ color: ACCENT, border: `1px solid rgba(255,42,54,0.2)` }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,42,54,0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >GITHUB ↗</a>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter panels */}
          {CHAPTERS.map((ch, i) => (
            <div key={ch.id}>
              <ChapterSection chapter={ch} onReadMore={() => setActiveArticle(i)} />
              {/* Section divider */}
              <div className="flex justify-center py-3" style={{ opacity: 0.2 }}>
                <svg width="60" height="16" viewBox="0 0 60 16">
                  <line x1="0" y1="8" x2="60" y2="8" stroke={TEXT_DIM} strokeWidth="0.5" />
                  <circle cx="30" cy="8" r="1.5" fill={TEXT_DIM} />
                </svg>
              </div>
            </div>
          ))}

          <StatsStrip />

          <div className="flex justify-center py-3" style={{ opacity: 0.2 }}>
            <svg width="60" height="16" viewBox="0 0 60 16">
              <line x1="0" y1="8" x2="60" y2="8" stroke={TEXT_DIM} strokeWidth="0.5" />
              <circle cx="30" cy="8" r="1.5" fill={TEXT_DIM} />
            </svg>
          </div>

          <ClosingQuote />

          <footer className="text-center py-6 font-mono text-[0.5rem] tracking-[0.15em]" style={{ color: TEXT_DIM }}>
            <div className="relative inline-block">
              <div className="absolute -inset-4 rounded-xl opacity-30 blur-xl" style={{ background: 'radial-gradient(ellipse at center, rgba(255,42,54,0.15) 0%, transparent 70%)' }} />
              <div className="relative px-6 py-3 rounded-xl will-change-[backdrop-filter]" style={{
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.04)',
              opacity: 0.99,
            }}>
              VADERLABZ // VADER_PROTOCOL v1.0 &mdash; 2026
            </div>
            </div>
          </footer>
        </div>
      </BgOverlay>

      <ProgressBar />
      <BackToTop />

      {activeArticle !== null && (
        <ArticleOverlay chapter={CHAPTERS[activeArticle]} onClose={() => setActiveArticle(null)} />
      )}

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          background: #000000;
          cursor: default;
        }
        @media (hover: hover) {
          body {
            cursor: default;
          }
        }
      `}</style>
    </>
  )
}
