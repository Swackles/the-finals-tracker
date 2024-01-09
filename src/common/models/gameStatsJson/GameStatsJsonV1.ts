import {MapVariant} from "./MapVariant"
import {GameMode} from "./GameMode"

interface SharedProfile {
  embarkName: string
  steamName: string
}

export interface DiscoveryRoundStats {
  "damageDone": number
  "dbnos": number
  "deaths": number
  "endTime": number
  "kills": number
  "mapVariant": MapVariant
  "respawns": number
  "respawnsDone": number
  "revivesDone": number
  "roundId": string
  "roundWon": boolean
  "squadName": string
  "startTime": number
  "tournamentId": string
  "tournamentWon": boolean
}

export interface GamePerArchetype {
  "": number
  DA_Archetype_Small?: number
  DA_Archetype_Medium?: number
  DA_Archetype_Heavy?: number
}

export interface RoundStatSummary {
  damagePerItem: Record<string, number>
  deaths: number
  highestFameAmount: number
  kills: number
  killsPerItem: Record<string, number>
  revivesDone: number
  roundWinRate: number
  roundWinRatePerArchetype: GamePerArchetype
  roundsCompleted: number
  roundsPlayed: number
  timePlayed: number
  timePlayedPerArchetype: GamePerArchetype
  totalCashOut: number
  tournamentWinRate: number
  tournamentWinRatePerArchetype: GamePerArchetype
}

export type DiscoveryRoundStatSummary = Record<GameMode, RoundStatSummary>

export interface GameStatsJsonV1 {
  version: 1,
  "v1-shared-profile": SharedProfile
  "v1-discovery-roundstats": { roundStats: DiscoveryRoundStats[] }
  "v1-discovery-roundstatsummary": DiscoveryRoundStatSummary
}
