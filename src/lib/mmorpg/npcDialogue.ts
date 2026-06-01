import { npcDialogues } from "@/data/mmorpg/npcDialogues"
import type { NpcDialogueNode } from "@/data/mmorpg/npcDialogues"

export function getNpcInitialDialogue(npcId: string): NpcDialogueNode | undefined {
  const intro = npcDialogues.find((d) => d.id === `${npcId}-intro`)
  if (intro) return intro
  return npcDialogues.find((d) => d.npcId === npcId)
}

export function getDialogueNode(nodeId: string): NpcDialogueNode | undefined {
  return npcDialogues.find((d) => d.id === nodeId)
}

export function getNpcDialogues(npcId: string): NpcDialogueNode[] {
  return npcDialogues.filter((d) => d.npcId === npcId)
}
