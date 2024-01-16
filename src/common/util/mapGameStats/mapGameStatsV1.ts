import {
  DiscoveryRoundStats, DiscoveryRoundStatSummary, GameModeStats, GamePerArchetype,
  GameStatsJsonV1,
  GameStatsV1,
  Profile,
  SharedProfile,
  Tournament,
  TournamentRound
} from "./models";
import {Archetype, GameMode, Map, MapVariant} from "@common/models";
import {getLoadoutAssetFromId} from "@common/util";

function mapProfile(profile: SharedProfile): Profile {
  return profile
}

function mapGameMap(variant: MapVariant): Map {
  switch (variant) {
    case MapVariant.MONACO_BASE:
    case MapVariant.MONACO_DUCK_AND_COVER:
    case MapVariant.MONACO_SUSPENDED_STRUCTURES:
      return Map.MONACO
    case MapVariant.SOUL_BASE:
    case MapVariant.SOUL_UNDER_CONSTRUCTION:
    case MapVariant.SOUL_MOVING_PLATFORMS:
      return Map.SOUL
    case MapVariant.SKYWAY_STADIUM_BASE:
    case MapVariant.SKYWAY_STADIUM_UDLR:
    case MapVariant.SKYWAY_STADIUM_HIGH_RISE:
      return Map.SKYWAY_STADIUM
    case MapVariant.LAS_VEGAS_BASE:
    case MapVariant.LAS_VEGAS_LOCKDOWN:
    case MapVariant.LAS_VEGAS_SANDSTORM:
      return Map.LAS_VEGAS
    default:
      return variant as Map
  }
}

function mapRound(round: DiscoveryRoundStats): TournamentRound {
  return {
    id: round.roundId,
    won: round.roundWon,
    squadName: round.squadName,
    damage: round.damageDone,
    kills: round.kills,
    deaths: round.deaths,
    respawns: round.respawns,
    revives: round.revivesDone,
    mapVariant: round.mapVariant,
    startDateTime: new Date(round.startTime * 1000),
    endDateTime: new Date(round.endTime * 1000),
  }
}

function mapRounds(rounds: DiscoveryRoundStats[]): Tournament[] {
  const tournamentMap: Record<string, TournamentRound[]> = {}
  for (const roundStat of rounds) {
    if (tournamentMap[roundStat.tournamentId] === undefined) tournamentMap[roundStat.tournamentId] = [mapRound(roundStat)]
    else tournamentMap[roundStat.tournamentId].push(mapRound(roundStat))
  }

  return Object.entries(tournamentMap).map(([id, rounds]) => ({
    id,
    won: rounds[rounds.length - 1].won,
    squadName: rounds[0].squadName,
    map: mapGameMap(rounds[0].mapVariant),
    rounds: rounds,
    startDateTime: rounds[0].startDateTime,
    endDateTime: rounds[rounds.length - 1].endDateTime
  }))
}

const mapArchetype = (key: keyof GamePerArchetype): Archetype => {
  switch (key) {
    case "DA_Archetype_Small":
      return Archetype.LIGHT
    case "DA_Archetype_Medium":
      return Archetype.MEDIUM
    case "DA_Archetype_Heavy":
      return Archetype.HEAVY
    default:
      return Archetype.UNKNOWN
  }
}

function mapGameStats(gameStats: DiscoveryRoundStatSummary): Record<GameMode, GameModeStats> {
  const stats: Partial<Record<GameMode, GameModeStats>> = {}

  for (const [roundType, gameModeStats] of Object.entries(gameStats)) {
    const loadoutItems = [
      ...Object.keys(gameModeStats.damagePerItem),
      ...Object.keys(gameModeStats.killsPerItem)
    ].filter((value, i, arr) => arr.indexOf(value) === i)
      .map(id => ({
      ...getLoadoutAssetFromId(id),
      damage: gameModeStats.damagePerItem[id] || 0,
      kills: gameModeStats.killsPerItem[id] || 0
    }))

    const archetypes = ([
      ...Object.keys(gameModeStats.roundWinRatePerArchetype),
      ...Object.keys(gameModeStats.timePlayedPerArchetype),
      ...Object.keys(gameModeStats.tournamentWinRatePerArchetype)
    ].filter((value, i, arr) => arr.indexOf(value) === i) as Array<keyof GamePerArchetype>)
    .map(key => {
        const type = mapArchetype(key)
        const {kills, damage} = loadoutItems
          .filter(row => row.archetype === type)
          .reduce((a, b) => ({
            kills: a.kills + b.kills,
            damage: a.damage + (b.damage * 100_000)
          }), {kills: 0, damage: 0})

        return {
          type,
          kills,
          damage,
          roundWinRate: gameModeStats.roundWinRatePerArchetype[key] || 0,
          tournamentWinRate: gameModeStats.roundWinRatePerArchetype[key] || 0,
          timePlayed: gameModeStats.timePlayedPerArchetype[key] || 0
        }
      }
    )

    stats[roundType as any as GameMode] = {
      deaths: gameModeStats.deaths,
      highestFameAmount: gameModeStats.highestFameAmount,
      kills: gameModeStats.kills,
      revivesDone: gameModeStats.revivesDone,
      roundWinRate: gameModeStats.roundWinRate,
      roundsCompleted: gameModeStats.roundsCompleted,
      timePlayed: gameModeStats.timePlayed,
      totalCashOut: gameModeStats.totalCashOut,
      tournamentWinRate: gameModeStats.tournamentWinRate,
      loadoutItems,
      archetypes
    }
  }

  return stats as Record<GameMode, GameModeStats>
}

export const mapGameStatsV1 = (stats: GameStatsJsonV1): GameStatsV1 => ({
  version: 1,
  profile: mapProfile(stats["v1-shared-profile"]),
  tournaments: mapRounds(stats["v1-discovery-roundstats"].roundStats),
  statsPerRoundType: mapGameStats(stats["v1-discovery-roundstatsummary"])
})
