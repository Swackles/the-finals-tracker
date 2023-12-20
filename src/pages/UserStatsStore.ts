import {action, computed, makeObservable, observable} from "mobx";
import {fetchRoundHistory, fetchRoundStatsSummary, TournamentStat} from "@common/sdk";
import {RoundStatsSummary, RoundStatsSummaryResponse} from "@common/sdk/types/RoundStatsSummaryResponse";
import {ClassesTableRow, WeaponsTableRow} from "./cards";
import {msToTimeString} from "@common/util";
import {DonutChartData} from "@common/components";

export class UserStatsStore {
  @observable.ref protected _stats?: RoundStatsSummaryResponse = undefined
  @observable.ref protected _tournaments: TournamentStat[] = []
  @observable.ref protected _gameType: keyof RoundStatsSummaryResponse = "total"

  static new = () => new UserStatsStore()

  private constructor() {
    makeObservable(this)
  }

  async fetchData(isMocked: boolean) {
    this.setStats(await fetchRoundStatsSummary({isMocked}))
    this.setTournaments(await fetchRoundHistory({ isMocked }))
  }

  @computed
  get isLoading(): boolean {
    return this._stats === undefined
  }

  @computed
  get gameType(): keyof RoundStatsSummaryResponse {
    return this._gameType
  }

  @computed
  get statsSummary(): RoundStatsSummary {
    return this._stats![this._gameType]
  }

  @computed
  get weaponTableRows(): WeaponsTableRow[] {
    const tableData: WeaponsTableRow[] = []

    for (const [id, damage] of Object.entries(this._stats![this._gameType].damagePerItem)) {
      tableData.push({id, damage})
    }

    for (const [id, kills] of Object.entries(this._stats![this._gameType].killsPerItem)) {
      tableData.find(x => x.id === id)!.kills = kills
    }

    return tableData
  }

  @computed
  get getClassesTableRows(): ClassesTableRow[] {
    const {
      roundWinRatePerArchetype,
      timePlayedPerArchetype,
      tournamentWinRatePerArchetype
    } = this._stats![this._gameType]

    return [
      {
        class: "Light",
        timePlayed: msToTimeString(timePlayedPerArchetype.DA_Archetype_Small),
        tournamentWinRate: this.getPercentage(tournamentWinRatePerArchetype.DA_Archetype_Small),
        roundWinRate: this.getPercentage(roundWinRatePerArchetype.DA_Archetype_Small)
      },
      {
        class: "Medium",
        timePlayed: msToTimeString(timePlayedPerArchetype.DA_Archetype_Medium),
        tournamentWinRate: this.getPercentage(tournamentWinRatePerArchetype.DA_Archetype_Medium),
        roundWinRate: this.getPercentage(roundWinRatePerArchetype.DA_Archetype_Medium)
      },
      {
        class: "Light",
        timePlayed: msToTimeString(timePlayedPerArchetype.DA_Archetype_Heavy),
        tournamentWinRate: this.getPercentage(tournamentWinRatePerArchetype.DA_Archetype_Heavy),
        roundWinRate: this.getPercentage(roundWinRatePerArchetype.DA_Archetype_Heavy)
      }
    ]
  }

  @computed
  get getTimePlayed(): DonutChartData[] {
    return [
      {
        legend: "???",
        value: this._stats![this._gameType].timePlayedPerArchetype[""] || 0
      },
      {
        legend: "Light",
        value: this._stats![this._gameType].timePlayedPerArchetype.DA_Archetype_Small || 0
      },
      {
        legend: "Medium",
        value: this._stats![this._gameType].timePlayedPerArchetype.DA_Archetype_Medium || 0
      },
      {
        legend: "Light",
        value: this._stats![this._gameType].timePlayedPerArchetype.DA_Archetype_Heavy || 0
      }
    ]
    
  }

  @computed
  get tournaments(): TournamentStat[] {
    return this._tournaments
  }

  private getPercentage(value?: number) {
    return `${value ? Math.round(value * 100) / 100 : 0}%`
  }

  @action setGameType = (gameType: keyof RoundStatsSummaryResponse) => this._gameType = gameType
  @action private setStats = (stats: RoundStatsSummaryResponse | undefined) => this._stats = stats
  @action private setTournaments = (tournaments: TournamentStat[]) => this._tournaments = tournaments
}