import {API, FinalsTrackerUrls} from "./api";
import {FinalsTrackerResponse, LeaderboardUser, UserLeaderboardQueryParams} from "./models";

export * from './models'

export const getLeaderboardByUsername = async (params?: UserLeaderboardQueryParams): Promise<FinalsTrackerResponse<LeaderboardUser[]>> => {
    const res = await API.get<FinalsTrackerResponse<LeaderboardUser[]>>(
      FinalsTrackerUrls.USER_LEADERBOARD,
      { params },
    );

    return res.data;
};
