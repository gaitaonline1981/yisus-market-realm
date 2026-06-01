export function isValidModelUrl(url?: string): boolean {
  if (!url) return false
  return url.endsWith(".glb") || url.endsWith(".gltf")
}

export function isLikelyStaticModel(url?: string): boolean {
  if (!url) return false
  return (url.endsWith(".glb") || url.endsWith(".gltf")) && !url.includes("-rigged")
}

export function isLikelyRiggedModel(url?: string): boolean {
  if (!url) return false
  return url.includes("-rigged") && (url.endsWith(".glb") || url.endsWith(".gltf"))
}
