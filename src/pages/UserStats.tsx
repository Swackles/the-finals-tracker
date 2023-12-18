import {UserStatsStore} from "./UserStatsStore";
import {useStore} from "@common/stores";
import {Grid} from "@mui/material";
import {observer} from "mobx-react";
import {TournamentCard} from "./cards";

export const UserStats = observer(() => {
  const store = useStore(UserStatsStore.new)

  return (
    <Grid container
          direction="column"
          justifyContent="center"
          alignItems="center"
          xs={12} md={4}
          spacing={2}>
      {store.tournaments.map(tournament => (
        <TournamentCard data={tournament} />
      ))}
    </Grid>
  )
})