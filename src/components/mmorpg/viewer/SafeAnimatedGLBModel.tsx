"use client"

import React, { Suspense } from "react"
import { isValidModelUrl } from "@/lib/mmorpg/modelValidation"
import { AnimatedGLBModel } from "./AnimatedGLBModel"
import { ModelErrorBoundary } from "./ModelErrorBoundary"
import { ModelLoadingFallback } from "./ModelLoadingFallback"

interface Props {
  url?: string
  animationName?: string
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
  onAnimationsLoaded?: (names: string[]) => void
}

export function SafeAnimatedGLBModel({ url, animationName, position, scale, rotation, onAnimationsLoaded }: Props) {
  if (!url || !isValidModelUrl(url)) {
    onAnimationsLoaded?.([])
    return null
  }

  return (
    <ModelErrorBoundary fallback={null}>
      <Suspense fallback={<ModelLoadingFallback />}>
        <AnimatedGLBModel
          url={url}
          animationName={animationName}
          position={position ?? [0, 0, 0]}
          scale={scale ?? [1, 1, 1]}
          rotation={rotation ?? [0, 0, 0]}
          onAnimationsLoaded={onAnimationsLoaded}
        />
      </Suspense>
    </ModelErrorBoundary>
  )
}
