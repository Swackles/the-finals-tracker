import {action, computed, makeObservable, observable} from "mobx";
import {
  ArchetypeGameStats,
  FinalsTrackerResponse, GameLoadoutAsset,
  GameMode,
  GameStats,
  GameStatsResponse, TournamentStat
} from "@common/sdk/finals-tracker/models";
import {fetchGameStats} from "@common/sdk/finals-tracker";
import {msToTimeString} from "@common/util";
import {DonutChartData} from "@common/components";
import {ClassesTableRow} from "./panels/overviewPanel/ClassesTableCard";
import {MatchesChartData} from "./panels/overviewPanel/MatchesChartCard";

export class UserStatsV2Store {
  @observable.ref protected _stats?: FinalsTrackerResponse<GameStatsResponse> = undefined
  @observable.ref protected _gameMode: GameMode = GameMode.TOTAL
  @observable.ref protected _activeTab: string = "overview"

  static new = () => new UserStatsV2Store()

  private constructor() {
    makeObservable(this)
  }

  async fetchData(json: any = undefined) {
    this.setStats(await fetchGameStats(json))
  }

  @computed
  get isLoading(): boolean {
    return this._stats === undefined
  }

  @computed
  get isErrored(): boolean {
    return this._stats?.errors != undefined && this._stats.errors.length > 0
  }

  @computed
  get matchesChart(): MatchesChartData[] {
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
  get activeTab(): string {
    return this._activeTab
  }

  @computed
  get gameMode(): GameMode {
    return this._gameMode
  }

  @computed
  get statsSummary(): GameStats {
    return this.gameStats
  }

  @computed
  get weaponTableRows(): GameLoadoutAsset[] {
    return this.gameStats.loadoutItems
  }

  @computed
  get getClassesTableRows(): ClassesTableRow[] {
    return this.archetypes.map(archetype => {
      const { kills, damage } = this.weaponTableRows
        .filter(row => row.archetype === (archetype.type))
        .reduce((a, b) => ({
          kills: a.kills + b.kills,
          damage: a.damage + (b.damage * 100_000)
        }), { kills: 0, damage: 0 })

      return ({
        class: archetype.type,
        kills,
        damage: Math.round(damage / 100_000),
        timePlayed: msToTimeString(archetype.timePlayed),
        tournamentWinRate: this.getPercentage(archetype.tournamentWinRate),
        roundWinRate: this.getPercentage(archetype.roundWinRate)
      })
    })
  }

  @computed
  get getTimePlayedPerArchetype(): DonutChartData[] {
    return this.archetypes.map(archetype => ({
      legend: archetype.type,
      value: archetype.timePlayed || 0
    }))
  }

  @computed
  get getDamagePerArchetype(): DonutChartData[] {
    return this.getClassesTableRows.map(archetype => ({
      legend: archetype.class,
      value: archetype.damage || 0
    }))
  }

  @computed
  get getKillsPerArchetype(): DonutChartData[] {
    return this.getClassesTableRows.map(archetype => ({
      legend: archetype.class,
      value: archetype.kills || 0
    }))
  }

  @computed
  get tournaments(): TournamentStat[] {
    return this._stats!.data?.tournaments || []
  }

  @computed
  private get archetypes(): ArchetypeGameStats[] {
    return this.gameStats.archetypes.filter(archtype => archtype.type != "???")
  }

  @computed
  private get gameStats(): GameStats {
    return this._stats!.data!.stats.find(stat => stat.gameMode === this._gameMode) as GameStats
  }

  private getPercentage(value?: number) {
    return `${value ? Math.round(value * 100_00) / 100 : 0}%`
  }

  @action setGameMode = (gameMode: GameMode) => this._gameMode = gameMode
  @action setActiveTab = (activeTab: string) => this._activeTab = activeTab
  @action private setStats = (stats: FinalsTrackerResponse<GameStatsResponse> | undefined) => this._stats = stats
}
