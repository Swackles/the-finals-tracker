import {BaseGameStats} from "./BaseGameStats";
import {MapVariant, Map, Archetype, GameMode} from "@common/models";
import {GameLoadoutAsset} from "@common/util";

export interface Profile {
  embarkName: string
  steamName: string
}

export interface TournamentRound {
  id: string
  won: boolean
  squadName: string
  damage: number
  kills: number
  deaths: number
  respawns: number
  revives: number
  mapVariant: MapVariant
  startDateTime: Date
  endDateTime: Date
}

export interface Tournament {
  id: string
  won: boolean
  squadName: string
  map: Map
  rounds: TournamentRound[]
  startDateTime: Date
  endDateTime: Date
}

export interface LoadoutItemStat extends GameLoadoutAsset {
  damage: number,
  kills: number
}

export interface ArchetypeStats {
  type: Archetype
  roundWinRate: number
  tournamentWinRate: number
  timePlayed: number
  kills: number,
  damage: number
}

export interface GameModeStats {
  deaths: number
  highestFameAmount: number
  kills: number
  revivesDone: number
  roundWinRate: number
  roundsCompleted: number
  timePlayed: number
  totalCashOut: number
  tournamentWinRate: number
  loadoutItems: LoadoutItemStat[]
  archetypes: ArchetypeStats[]
}

export interface GameStatsV1 extends BaseGameStats {
  version: 1
  profile: Profile
  tournaments: Tournament[]
  statsPerRoundType: Record<GameMode, GameModeStats>
}
