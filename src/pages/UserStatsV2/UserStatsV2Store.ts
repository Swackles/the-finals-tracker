import {action, computed, makeObservable, observable} from "mobx";
import {ClassesTableRow, WeaponsTableRow} from "./../cards";
import {
  FinalsTrackerResponse,
  GameMode,
  GameStats,
  GameStatsResponse, TournamentStat
} from "@common/sdk/finals-tracker/models";
import {fetchGameStats} from "@common/sdk/finals-tracker";
import {msToTimeString} from "@common/util";
import {DonutChartData} from "@common/components";

export class UserStatsV2Store {
  @observable.ref protected _stats?: FinalsTrackerResponse<GameStatsResponse> = undefined
  @observable.ref protected _gameMode: GameMode = GameMode.TOTAL
  @observable.ref protected _activeTab: string = "overview"

  static new = () => new UserStatsV2Store()

  private constructor() {
    makeObservable(this)
  }

  async fetchData(token: string | undefined = undefined, json: any = undefined) {
    this.setStats(await fetchGameStats(token, json))
  }

  @computed
  get isLoading(): boolean {
    return this._stats === undefined
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
  get weaponTableRows(): WeaponsTableRow[] {
    return this.gameStats.weapons.map(weapon => ({
      id: weapon.name,
      damage: weapon.damage,
      kills: weapon.kills
    }))
  }

  @computed
  get getClassesTableRows(): ClassesTableRow[] {
    return this.gameStats.archetypes.map(archetype => ({
      class: archetype.type,
      timePlayed: msToTimeString(archetype.timePlayed),
      tournamentWinRate: this.getPercentage(archetype.tournamentWinRate),
      roundWinRate: this.getPercentage(archetype.roundWinRate)
    }))
  }

  @computed
  get getTimePlayed(): DonutChartData[] {
    return this.gameStats.archetypes.map(archetype => ({
      legend: archetype.type,
      value: archetype.timePlayed || 0
    }))
  }

  @computed
  get tournaments(): TournamentStat[] {
    return this._stats!.data?.tournaments || []
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
