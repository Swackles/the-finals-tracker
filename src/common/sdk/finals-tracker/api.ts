import axios, { AxiosInstance } from "axios";

export const API: AxiosInstance = axios.create({
    baseURL: "https://api.finals-tracker.com/api/"
});

export enum FinalsTrackerUrls {
    GAME_STATS = "/v1/gamestats",
    USER_LEADERBOARD = "/v1/users/leaderboard"
}

API.interceptors.response.use(
    res => res,
    err => err.response
)
