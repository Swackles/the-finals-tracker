import {action, computed, makeObservable, observable} from "mobx";
import {FinalsTrackerResponse, getLeaderboardByUsername, LeaderboardDataPoint, LeaderboardUser} from "@common/sdk/finals-tracker";
import {fameToLeague} from "@common/util";

export class RanksChartCardStore {
  @observable.ref protected _data?: FinalsTrackerResponse<LeaderboardUser[]> = undefined
  @observable.ref protected _activeUserIndex: number = 0

  static new = () => new RanksChartCardStore()

  private constructor() {
    makeObservable(this)
  }

  async fetchData(embarkUsername: string, steamUsername: string) {
    const data = await getLeaderboardByUsername({ name: embarkUsername, platform: "crossplay"})
    if ((data.data?.length || 0) > 0) this.setData(data)
    else this.setData(await getLeaderboardByUsername({ name: steamUsername, platform: "steam"}))
  }

  @computed
  get isLoading(): boolean {
    return this._data === undefined
  }

  @computed
  get isErrored(): boolean {
    return this.getError !== undefined
  }

  @computed
  get isDataAvailable(): boolean {
    return (this._data?.data?.length || 0) > 0
  }

  @computed
  get getError(): string | undefined {
    return (this._data?.errors || []) [0]
  }

  @computed
  get getData(): LeaderboardDataPoint[] {
    return this._data!.data![this._activeUserIndex].data
  }

  @computed
  get getFames(): number[] {
    return this.getData.map(x => x.fame)
  }

  @computed
  get getRanks(): number[] {
    return this.getData.map(x => x.rank * -1)
  }

  @computed
  get getLeague(): string {
    return fameToLeague(this.getFames[this.getFames.length - 1])
  }

  @computed
  get getDates(): Date[] {
    return this.getData.map(x => new Date(`${x.date}T00:00:00`))
  }

  @action private setData = (data: FinalsTrackerResponse<LeaderboardUser[]>) => this._data = data
}
