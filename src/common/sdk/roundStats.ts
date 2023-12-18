import {RoundStat, TournamentRound, TournamentStat, RoundMap} from "./types";
import roundStats from './data/round-stats.json'
import roundStatsSummary from './data/round-stats-summary.json'
import {RoundStatsSummaryResponse} from "@common/sdk/types/RoundStatsSummaryResponse";

export const fetchRoundStatsSummary = async (): Promise<RoundStatsSummaryResponse> =>
  new Promise(resolve => resolve(roundStatsSummary as any))

export const fetchRoundHistory = async (): Promise<TournamentStat[]> => {
  const tournamentMap: Record<string, RoundStat[]> = {}
  for (const roundStat of roundStats.roundStats) {
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
