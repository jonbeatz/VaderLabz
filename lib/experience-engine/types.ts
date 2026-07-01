export interface ChapterData {
  id: string
  marker: string
  title: string
  subtitle: string
  summary: string
  detail: string
  camera: { x: number; y: number; z: number }
  target: { x: number; y: number; z: number }
}

export interface StatData {
  num: string
  label: string
}

export interface HdrPreset {
  label: string
  file: string
}

export interface BloomPreset {
  label: string
  intensity: number
}

export interface RotationPreset {
  label: string
  speed: number
}

export interface CameraPreset {
  label: string
  mode: 'static' | 'slow' | 'full'
}

export interface SaberColorPreset {
  label: string
  color: [number, number, number]
}

export interface ExperienceConfig {
  /** Unique route identifier */
  id: string
  /** GLB model path */
  modelPath: string
  /** Base scale (before scroll factor) */
  defaultScale: number
  /** Scale added per scroll progress */
  scaleScrollFactor: number
  /** Base Y position */
  defaultY: number
  /** Y position change per scroll progress */
  yScrollFactor: number
  /** Chapter data */
  chapters: ChapterData[]
  /** Stats data */
  stats: StatData[]
  /** Chapter detail text mentioning the model name */
  chapterDetailText: string

  // Feature toggles
  showHdrPicker?: boolean
  showBloomControls?: boolean
  showSaberControls?: boolean
  showCameraControls?: boolean
  showMouseControls?: boolean
  showArchiveLink?: boolean
  showContactShadows?: boolean
  archiveLinkUrl?: string
  archiveLinkTitle?: string

  // Default UI state
  defaultHdrIndex?: number
  defaultBloomIndex?: number
  defaultRotationIndex?: number
  defaultCameraIndex?: number
  defaultSaberColorIndex?: number
  defaultMouseEnabled?: boolean
  defaultCursorEnabled?: boolean

  // Hardcoded overrides (for versions without HdrPicker)
  hardcodeEmissive?: [number, number, number]
  hardcodeEmissiveIntensity?: number
  hardcodeRotationSpeed?: number
  hardcodeCameraMode?: 'static' | 'slow' | 'full'
}

export const EASE = 'power3.inOut'
export const ACCENT = '#ff2a36'
export const ACCENT_DIM = 'rgba(255,42,54,0.15)'
export const TEXT_MUTED = '#888899'
export const TEXT_DIM = '#555566'
export const TEXT_PRIMARY = '#f0f0f0'
export const BG_DEEP = '#000000'
