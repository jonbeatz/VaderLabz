'use client'

import { Canvas } from '@react-three/fiber'
import { FloatingArtefact } from './FloatingArtefact'
import { Suspense } from 'react'

export function ArtefactScene({ accent = '#ff2a36', className = '' }: { accent?: string; className?: string }) {
  return (
    <div className={className} style={{
      width: '100%',
      height: '400px',
      position: 'relative',
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color={accent} />
        <Suspense fallback={null}>
          <FloatingArtefact accent={accent} secondary="#ff0033" />
        </Suspense>
      </Canvas>
    </div>
  )
}
