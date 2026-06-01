import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCharacterById } from "@/data/mmorpg/characters"
import { mounts } from "@/data/mmorpg/mounts"
import { rarityStyles } from "@/lib/mmorpg/rarityStyles"
import { StatBar } from "@/components/mmorpg/cards/StatBar"
import { RarityBadge } from "@/components/mmorpg/cards/RarityBadge"


