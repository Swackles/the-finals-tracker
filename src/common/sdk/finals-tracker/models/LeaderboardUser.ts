export interface LeaderboardUser {
  name: string;
  data: LeaderboardDataPoint[];
}

export interface LeaderboardDataPoint {
  rank: number;
  fame: number;
  date: string;
}
