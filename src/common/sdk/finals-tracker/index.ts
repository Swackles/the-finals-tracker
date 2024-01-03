import {API, FinalsTrackerUrls} from "./api";
import {FinalsTrackerResponse, GameStatsResponse} from "./models";

export * from './models'

export const fetchGameStats = async (token: string | undefined = undefined, json: any = undefined): Promise<FinalsTrackerResponse<GameStatsResponse>> => {
    const res = await API.post<FinalsTrackerResponse<GameStatsResponse>>(
        FinalsTrackerUrls.GAME_STATS,
        { token, json }
    )

    return res.data
}
