import {API, FinalsTrackerUrls} from "./api";
import {FinalsTrackerResponse, GameStatsResponse, LeaderboardUser, UserLeaderboardQueryParams} from "./models";

export * from './models'

export const fetchGameStats = async (json: any = undefined): Promise<FinalsTrackerResponse<GameStatsResponse>> => {
    const res = await API.post<FinalsTrackerResponse<GameStatsResponse>>(
        FinalsTrackerUrls.GAME_STATS,
        { json }
    )

    return res.data
}

export const getLeaderboardByUsername = async (params?: UserLeaderboardQueryParams): Promise<FinalsTrackerResponse<LeaderboardUser[]>> => {
    const res = await API.get<FinalsTrackerResponse<LeaderboardUser[]>>(
      FinalsTrackerUrls.USER_LEADERBOARD,
      { params },
    );

    return res.data;
};
