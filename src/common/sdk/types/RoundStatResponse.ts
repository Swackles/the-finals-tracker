export interface RoundStat {
  damageDone: number
  deaths: number
  endTime: number
  kills: number
  mapVariant: string
  respawns: number
  revivesDone: number
  roundId: string
  roundWon: boolean
  startTime: number
  tournamentId: string,
  tournamentWon: boolean
}

export interface RoundStatsResponse {
  roundStats: RoundStat[]
}
