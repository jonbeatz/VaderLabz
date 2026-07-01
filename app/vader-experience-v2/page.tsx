'use client'

import { createVaderExperience, type ExperienceConfig } from '@/lib/experience-engine'

const CHAPTERS = [
  {
    id: 'genesis',
    marker: '01',
    title: 'The <i>Genesis</i>',
    subtitle: 'Where the Lab Was Born',
    summary: 'In the dark hours of late 2025, a single terminal window opened. What began as a playground became a forge — the birthplace of VaderLabz.',
    detail: "JonBeatz didn't set out to build VaderLabz. He set out to build things that worked. But as projects accumulated, a pattern emerged: every build shared the same bones — the same scripts, the same MCP wiring, the same Mem0 vector store patterns.\n\nWhat started as a personal CLI toolkit evolved into a full-profile Hermes ecosystem. The shared-profile-content skeleton was born first — a reusable brain for new projects. Then came the 3D Playground, the Draven co-pilot, and the realization that the real product wasn't any single app: it was the system itself.\n\nVaderLabz became the lab where that system was proven.",
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
    detail: "Draven isn't a chatbot — he's a memory layer. Every draven:add command seeds a recollection that lives in qdrant_draven, isolated from project-specific vaderlabz_memories.\n\nWhen Jon says \"you know what I want,\" Draven does — because the history lives in the vectors, not the conversation window.",
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
  { num: '28', label: 'Repos Forged' },
  { num: '130+', label: 'GitHub Commits' },
  { num: '5', label: 'MCP Servers' },
  { num: '20', label: 'Public Projects' },
]

const config: ExperienceConfig = {
  id: 'vader-experience-v2',
  modelPath: '/media/skywalker_lightsaber.glb',
  defaultScale: 0.18,
  scaleScrollFactor: 0.06,
  defaultY: 0.6,
  yScrollFactor: -1.8,
  chapters: CHAPTERS,
  stats: STATS,
  chapterDetailText: 'the Skywalker lightsaber GLB model',
  // v2 has no HdrPicker — all hardcoded
  showHdrPicker: false,
  showBloomControls: false,
  showSaberControls: false,
  showCameraControls: false,
  showMouseControls: false,
  // No archive link in v2
  archiveLinkUrl: undefined,
  archiveLinkTitle: undefined,
  // Hardcoded defaults
  defaultHdrIndex: 0,
  defaultBloomIndex: 1,
  defaultRotationIndex: 0,
  defaultCameraIndex: 0,
  defaultSaberColorIndex: 0,
  defaultMouseEnabled: true,
  defaultCursorEnabled: true,
}

export default createVaderExperience(config)
