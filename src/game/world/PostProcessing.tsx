"use client";

import { EffectComposer, Bloom, Vignette, ToneMapping, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function PostProcessing() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.6}
        luminanceThreshold={0.4}
        luminanceSmoothing={0.9}
        mipmapBlur
        blendFunction={BlendFunction.SCREEN}
      />
      <ToneMapping
        mode={2}
        middleGrey={0.6}
        maxLuminance={16}
        averageLuminance={1}
        adaptationRate={0.1}
      />
      <Vignette
        offset={0.3}
        darkness={0.5}
        eskil={false}
        blendFunction={BlendFunction.NORMAL}
      />
      <Noise
        premultiply
        opacity={0.02}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
