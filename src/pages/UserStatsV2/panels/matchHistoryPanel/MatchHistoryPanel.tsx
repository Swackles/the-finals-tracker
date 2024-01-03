import {TournamentStat} from "@common/sdk/finals-tracker";
import {TournamentCard} from "./TournamentCard";

export interface MatchHistoryPanelProps {
    tournaments: TournamentStat[]
}

export const MatchHistoryPanel = ({ tournaments }: MatchHistoryPanelProps) => {
    return tournaments.map(tournament => <TournamentCard data={tournament} />)
}
