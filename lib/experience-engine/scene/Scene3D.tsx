'use client'

import React, { Suspense } from 'react'
import { Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'
import * as THREE from 'three'
import type { HdrPreset, BloomPreset, CameraPreset, SaberColorPreset, RotationPreset } from '../types'
import { SaberModel } from './SaberModel'

interface Scene3DProps {
  modelPath: string
  defaultScale: number
  scaleScrollFactor: number
  defaultY: number
  yScrollFactor: number
  hdrPreset: HdrPreset
  bloomPreset: BloomPreset
  cameraMode: CameraPreset
  mouseEnabled: boolean
  sabers: { bladeMat: THREE.MeshStandardMaterial | null }
  onSaberColorChange: SaberColorPreset
  onRotationSpeed: RotationPreset
  showContactShadows?: boolean
}

export function Scene3D(props: Scene3DProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={4} />
      <directionalLight position={[-5, 3, -5]} intensity={2} color="#ff2a36" />
      <directionalLight position={[0, 5, 3]} intensity={1} color="#ff6600" />

      <Suspense fallback={null}>
        <SaberModel
          modelPath={props.modelPath}
          defaultScale={props.defaultScale}
          scaleScrollFactor={props.scaleScrollFactor}
          defaultY={props.defaultY}
          yScrollFactor={props.yScrollFactor}
          saberColor={props.onSaberColorChange}
          rotationSpeed={props.onRotationSpeed}
          cameraMode={props.cameraMode}
          mouseEnabled={props.mouseEnabled}
          sabers={props.sabers}
        />
        <Environment files={props.hdrPreset.file} blur={0.2} />
        {props.showContactShadows && (
          <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={8} blur={2.5} far={4} />
        )}
      </Suspense>

      {props.bloomPreset.intensity > 0 && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.1}
            luminanceSmoothing={0.02}
            intensity={props.bloomPreset.intensity}
            mipmapBlur
            kernelSize={KernelSize.SMALL}
          />
        </EffectComposer>
      )}
    </>
  )
}
