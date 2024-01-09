import {Archetype} from "@common/models";

export interface ArchetypeGameStats {
  type: Archetype
  roundWinRate: number
  tournamentWinRate: number
  timePlayed: number
  kills: number,
  damage: number
}
