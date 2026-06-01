"use client"

import React, { Suspense } from "react"
import { isValidModelUrl } from "@/lib/mmorpg/modelValidation"
import { GLBModel } from "./GLBModel"
import { ModelErrorBoundary } from "./ModelErrorBoundary"
import { ModelLoadingFallback } from "./ModelLoadingFallback"

interface Props {
  url?: string
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
  fallback?: React.ReactNode
}

export function SafeGLBModel({ url, position, scale, rotation, fallback }: Props) {
  if (!url || !isValidModelUrl(url)) {
    return <>{fallback ?? null}</>
  }

  return (
    <ModelErrorBoundary fallback={<>{fallback ?? null}</>}>
      <Suspense fallback={<ModelLoadingFallback />}>
        <GLBModel
          url={url}
          position={position ?? [0, 0, 0]}
          scale={scale ?? [1, 1, 1]}
          rotation={rotation ?? [0, 0, 0]}
        />
      </Suspense>
    </ModelErrorBoundary>
  )
}
