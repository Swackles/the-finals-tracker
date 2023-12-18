import {RoundStat, TournamentRound, TournamentStat, RoundMap, RoundStatsResponse} from "./types";
import {RoundStatsSummaryResponse} from "@common/sdk/types/RoundStatsSummaryResponse";
import {API} from "./api";

export const fetchRoundStatsSummary = async (): Promise<RoundStatsSummaryResponse | undefined> => {
  try {
    return (await API.get<RoundStatsSummaryResponse>("/v1/discovery/roundstatsummary")).data
  } catch (e) { console.error(e) }

  return undefined
}

export const fetchRoundHistory = async (): Promise<TournamentStat[]> => {
  const res = await API.get<RoundStatsResponse>("/v1/discovery/roundstats")
  if (res === undefined) return []

  const tournamentMap: Record<string, RoundStat[]> = {}
  for (const roundStat of res.data.roundStats) {
    if (tournamentMap[roundStat.tournamentId] === undefined) tournamentMap[roundStat.tournamentId] = [roundStat]
    else tournamentMap[roundStat.tournamentId].push(roundStat)
  }

  const tournaments: TournamentStat[] = []
  for (const [id, rounds] of Object.entries(tournamentMap)) {
    tournaments.push({
      id,
      won: rounds[0].tournamentWon,
      rounds: rounds.map<TournamentRound>(round => ({
        id: round.roundId,
        damageDone: round.damageDone,
        deaths: round.deaths,
        kills: round.kills,
        respawns: round.respawns,
        revives: round.revivesDone,
        map: round.mapVariant as RoundMap,
        start: new Date(round.startTime * 1000),
        end: new Date(round.endTime * 1000),
        won: round.roundWon
      }))
    })
  }


  return new Promise((resolves) => resolves(tournaments))
}
