export type GameItemRecord = Record<string, number>

export interface GamePerArchetype {
  "": number
  DA_Archetype_Small?: number
  DA_Archetype_Medium?: number
  DA_Archetype_Heavy?: number
}

export interface RoundStatsSummary {
  damagePerItem: GameItemRecord
  deaths: number
  highestFameAmount: number
  kills: number
  killsPerItem: GameItemRecord
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

export interface RoundStatsSummaryResponse {
  casual: RoundStatsSummary
  ranked: RoundStatsSummary
  total: RoundStatsSummary
}