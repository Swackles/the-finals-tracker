import {action, computed, makeObservable, observable} from "mobx";
import {fetchRoundHistory, TournamentStat} from "@common/sdk";

export class UserStatsStore {
  @observable.ref protected _tournaments: TournamentStat[] = []

  static new = () => new UserStatsStore()

  private constructor() {
    makeObservable(this)
  }

  async init() {
    this.setTournaments(await fetchRoundHistory())
  }

  @computed
  get tournaments(): TournamentStat[] {
    return this._tournaments
  }

  @action private setTournaments = (tournaments: TournamentStat[]) => this._tournaments = tournaments
}