import {TournamentStat} from "@common/sdk";
import {Grid} from "@mui/material";
import {RoundCard} from "./RoundCard";

export interface TournamentCardProps {
  data: TournamentStat
}

export const TournamentCard = ({ data }: TournamentCardProps) => {
  if (data.rounds.length === 1) return <Grid item><RoundCard data={data.rounds[0]} /></Grid>

  return data.rounds.map((round, i) =>
        <Grid item><RoundCard data={round} /></Grid>
      )
}