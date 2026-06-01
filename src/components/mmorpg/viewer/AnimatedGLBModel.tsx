"use client"

import { useEffect, useRef } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import { Group } from "three"

interface AnimatedGLBModelProps {
  url: string
  animationName?: string
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
  onAnimationsLoaded?: (animationNames: string[]) => void
}

export function AnimatedGLBModel({
  url,
  animationName,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  onAnimationsLoaded,
}: AnimatedGLBModelProps) {
  const group = useRef<Group>(null)
  const gltf = useGLTF(url)
  const { actions, names } = useAnimations(gltf.animations, group)

  useEffect(() => {
    onAnimationsLoaded?.(names)
  }, [names, onAnimationsLoaded])

  useEffect(() => {
    const activeActions: string[] = []

    const playAnim = (name: string) => {
      const action = actions[name]
      if (action) {
        action.reset().fadeIn(0.2).play()
        activeActions.push(name)
        return true
      }
      return false
    }

    const animToPlay = animationName && names.includes(animationName)
      ? animationName
      : names.includes("Idle")
      ? "Idle"
      : names[0]

    if (animToPlay) {
      playAnim(animToPlay)
    }

    return () => {
      activeActions.forEach((name) => {
        actions[name]?.fadeOut(0.2).stop()
      })
    }
  }, [animationName, actions, names])

  return (
    <group ref={group} position={position} scale={scale} rotation={rotation}>
      <primitive object={gltf.scene} />
    </group>
  )
}
