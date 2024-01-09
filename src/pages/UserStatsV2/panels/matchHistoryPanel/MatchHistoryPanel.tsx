import {TournamentCard} from "./TournamentCard";
import {useGameStatsStore} from "@common/stores/gameStatsStore";

export const MatchHistoryPanel = () => {
    const { tournaments } = useGameStatsStore()

    return tournaments.map(tournament => <TournamentCard key={tournament.id} data={tournament} />)
}
