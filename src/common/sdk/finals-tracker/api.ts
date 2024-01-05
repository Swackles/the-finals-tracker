import axios, { AxiosInstance } from "axios";

export const API: AxiosInstance = axios.create({
    baseURL: "https://api.finals-tracker.com/api/"
});

export enum FinalsTrackerUrls {
    GAME_STATS = "/v1/gamestats",
}

API.interceptors.response.use(
    res => res,
    err => err.response
)
