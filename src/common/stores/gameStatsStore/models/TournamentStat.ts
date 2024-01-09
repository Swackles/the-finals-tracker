import {MapVariant} from "@common/models";

export interface TournamentRound {
  id: string
  damageDone: number
  deaths: number
  kills: number
  respawns: number
  revives: number
  map: MapVariant
  start: Date
  end: Date
  won: boolean
}

export interface TournamentStat {
  id: string
  won: boolean
  rounds: TournamentRound[]
}
