import {GameLoadoutAsset} from "./GameLoadoutAsset";

export interface ArchetypeGameStats {
    type: string
    roundWinRate: number
    tournamentWinRate: number
    timePlayed: number
}

export enum GameMode {
    CASUAL = 'casual',
    RANKED = 'ranked',
    TOTAL = 'total'
}

export interface GameStats {
    gameMode: GameMode

    archetypes: ArchetypeGameStats[]
    loadoutItems: GameLoadoutAsset[]

    kills: number
    deaths: number
    revivesDone: number
    totalCashOut: number

    roundsPlayed: number
    roundsCompleted: number
    timePlayed: number

    roundWinRate: number
    tournamentWinRate: number

    highestFameAmount: number
}

export enum RoundMap {
    MONACO_BASE = "DA_MV_Monaco_01_Base",
    MONACO_DUCK_AND_COVER = "DA_MV_Monaco_01_DuckAndCover",
    MONACO_SUSPENDED_STRUCTURES = "DA_MV_Monaco_01_SuspendedStructures",

    SOUL_BASE = "DA_MV_Seoul_01_Base",
    SOUL_UNDER_CONSTRUCTION = "DA_MV_Seoul_01_UnderConstruction",
    SOUL_MOVING_PLATFORMS = "DA_MV_Seoul_01_MovingPlatforms",

    SKYWAY_STADIUM_BASE = "DA_MV_Arena_01_Base",
    SKYWAY_STADIUM_UDLR = "",
    SKYWAY_STADIUM_HIGH_RISE = "",

    LAS_VEGAS_BASE = "DA_MV_LasVegas_01_Base",
    LAS_VEGAS_LOCKDOWN ="DA_MV_LasVegas_01_Lockdown",
    LAS_VEGAS_SANDSTORM = "DA_MV_LasVegas_01_Sandstorm",
}

export interface TournamentRound {
    id: string
    damageDone: number
    deaths: number
    kills: number
    respawns: number
    revives: number
    map: RoundMap
    start: Date
    end: Date
    won: boolean
}

export interface TournamentStat {
    id: string
    won: boolean
    rounds: TournamentRound[]
}

export interface GameStatsResponse {
    stats: GameStats[]
    tournaments: TournamentStat[]
}
