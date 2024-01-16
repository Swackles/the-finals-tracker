import {action, computed, makeObservable, observable} from "mobx";
import {
  Archetype,
  GameMode,
  RoundType
} from "@common/models";
import {MatchesStats, WinRates} from "./models";
import {Store} from "@common/stores";
import {
  ArchetypeStats,
  GameModeStats,
  GameStats,
  GameStatsJson, LoadoutItemStat,
  mapGameStats,
  Tournament
} from "@common/util/mapGameStats";

export class GameStatsStore implements Store {
  @observable.ref protected _stats?: GameStats
  @observable.ref protected _error?: string
  @observable.ref protected _gameMode: GameMode = GameMode.TOTAL

  static new = () => new GameStatsStore()

  private constructor() {
    makeObservable(this)
  }

  @action.bound
  setJson(json: GameStatsJson | undefined) {
    if (!json) return this.setStats(json)

    try {
      this.setStats(mapGameStats(json))
      this.setError(undefined)
    } catch (e) {
      console.error(e)
      this.setError("Unable to parse JSON")
    }
  }

  @computed
  get error(): string | undefined {
    return this._error
  }

  @computed
  get isJsonPresent(): boolean {
    return this._stats != undefined
  }

  @computed
  get gameMode() {
    return this._gameMode
  }

  @computed
  get profile() {
    return this.stats.profile
  }

  @computed
  get roundStatsSummary(): GameModeStats {
    return this.stats.statsPerRoundType[this._gameMode]
  }

  @computed
  get tournaments(): Tournament[] {
    return this.stats.tournaments
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
  get loadoutItems(): LoadoutItemStat[] {
    return this.roundStatsSummary.loadoutItems
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
  get archetypes(): ArchetypeStats[] {
    return this.roundStatsSummary.archetypes
  }


  @computed
  private get stats(): GameStats {
    if (!this.isJsonPresent) throw new Error("Trying to fetch JSON data when JSON is not available")

    return this._stats!
  }

  @action setGameMode = (gameMode: GameMode) => this._gameMode = gameMode
  @action private setError = (error?: string) => this._error = error
  @action private setStats = (stats?: GameStats) => this._stats = stats
}
