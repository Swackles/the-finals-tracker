import {action, computed, makeObservable, observable} from "mobx";
import {
  Archetype,
  DiscoveryRoundStats,
  GameMode,
  GamePerArchetype,
  GameStatsJson,
  MapVariant,
  RoundStatSummary,
  RoundType
} from "@common/models";
import { getLoadoutAssetFromId, mapArchetype} from "@common/util";
import {ArchetypeGameStats, MatchesStats, TournamentRound, TournamentStat, WeaponStat, WinRates} from "./models";
import {Store} from "@common/stores";

export class GameStatsStore implements Store {
  @observable.ref protected _json?: GameStatsJson = undefined
  @observable.ref protected _gameMode: GameMode = GameMode.TOTAL

  static new = () => new GameStatsStore()

  private constructor() {
    makeObservable(this)
  }

  @computed
  get isJsonPresent(): boolean {
    return this._json != undefined
  }

  @computed
  get gameMode() {
    return this._gameMode
  }

  @computed
  get profile() {
    return this.json["v1-shared-profile"]
  }

  @computed
  get roundStatsSummary(): RoundStatSummary {
    return this.json["v1-discovery-roundstatsummary"][this._gameMode]
  }

  @computed
  get tournaments(): TournamentStat[] {
    const tournamentMap: Record<string, DiscoveryRoundStats[]> = {}
    for (const roundStat of this.json["v1-discovery-roundstats"].roundStats) {
      if (tournamentMap[roundStat.tournamentId] === undefined) tournamentMap[roundStat.tournamentId] = [roundStat]
      else tournamentMap[roundStat.tournamentId].push(roundStat)
    }

    const tournaments: TournamentStat[] = []
    for (const [id, rounds] of Object.entries(tournamentMap)) {
      tournaments.push({
        id,
        won: rounds[0].tournamentWon,
        rounds: rounds.map<TournamentRound>(round => ({
          id: round.roundId,
          damageDone: round.damageDone,
          deaths: round.deaths,
          kills: round.kills,
          respawns: round.respawns,
          revives: round.revivesDone,
          map: round.mapVariant as MapVariant,
          start: new Date(round.startTime * 1000),
          end: new Date(round.endTime * 1000),
          won: round.roundWon
        }))
      })
    }

    return tournaments
  }

  @computed
  get matches(): MatchesStats[] {
    return this.tournaments.map(tournament =>
      tournament.rounds.map(round => ({
        kills: round.kills,
        deaths: round.deaths,
        respawns: round.respawns,
        revives: round.revives
      }))
    ).flat().filter((_, i) => i < 10)
  }

  @computed
  //TODO: Better name needed, returns both gadgets and weapons that can deal damage
  get weapons(): WeaponStat[] {
    const { damagePerItem, killsPerItem } = this.roundStatsSummary
    const weaponIds = Object.keys(damagePerItem).concat(Object.keys(killsPerItem))
      .filter((value, i, arr) => arr.indexOf(value) === i)

    return weaponIds.map(id => ({
      ...getLoadoutAssetFromId(id),
      damage: damagePerItem[id] || 0,
      kills: killsPerItem[id] || 0
    }))
  }

  @computed
  get winRates(): WinRates[] {
    const light = this.archetypes
      .find(archetype => archetype.type === Archetype.LIGHT)
    const medium =this.archetypes
      .find(archetype => archetype.type === Archetype.MEDIUM)
    const heavy =this.archetypes
      .find(archetype => archetype.type === Archetype.HEAVY)

    return [{
      type: RoundType.ROUND,
      total: this.roundStatsSummary.roundWinRate,
      light: light?.roundWinRate || 0,
      medium: medium?.roundWinRate || 0,
      heavy: heavy?.roundWinRate || 0
      },
      {
        type: RoundType.TOURNAMENT,
        total: this.roundStatsSummary.tournamentWinRate,
        light: light?.tournamentWinRate || 0,
        medium: medium?.tournamentWinRate || 0,
        heavy: heavy?.tournamentWinRate || 0
      }
    ]
  }

  @computed
  get archetypes(): ArchetypeGameStats[] {
    const {
      roundWinRatePerArchetype,
      timePlayedPerArchetype,
      tournamentWinRatePerArchetype
    } = this.roundStatsSummary

    return ([
      ...Object.keys(roundWinRatePerArchetype),
      ...Object.keys(timePlayedPerArchetype),
      ...Object.keys(tournamentWinRatePerArchetype)
    ].filter((value, i, arr) => arr.indexOf(value) === i && value != "") as Array<keyof GamePerArchetype>)
      .map(key => {
          const type = mapArchetype(key)
          const {kills, damage} = this.weapons
            .filter(row => row.archetype === type)
            .reduce((a, b) => ({
              kills: a.kills + b.kills,
              damage: a.damage + (b.damage * 100_000)
            }), {kills: 0, damage: 0})

          return {
            type,
            kills,
            damage: Math.round(damage / 100_000),
            roundWinRate: roundWinRatePerArchetype[key] || 0,
            tournamentWinRate: roundWinRatePerArchetype[key] || 0,
            timePlayed: timePlayedPerArchetype[key] || 0
          }
        }
      )
  }


  @computed
  private get json(): GameStatsJson {
    if (!this.isJsonPresent) throw new Error("Trying to fetch JSON data when JSON is not available")

    return this._json!
  }

  @action setGameMode = (gameMode: GameMode) => this._gameMode = gameMode
  @action
  setJson = (json: GameStatsJson | undefined) => this._json = json
}
