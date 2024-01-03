import axios, { AxiosInstance } from "axios";
import {getAuthenticationToken} from "@common/util";

export const API: AxiosInstance = axios.create({
    baseURL: "https://api.finals-tracker.com/api/",
    headers: {
        Authorization: `Bearer ${getAuthenticationToken()}`
    }
});

export enum FinalsTrackerUrls {
    GAME_STATS = "/v1/gamestats",
}

API.interceptors.response.use(
    res => res,
    err => err.response.data
)
