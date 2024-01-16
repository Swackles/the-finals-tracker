import Grid from '@mui/joy/Grid';
import Chip from '@mui/joy/Chip';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import {useGameStatsStore} from "@common/stores/gameStatsStore";
import React, {useState} from "react";
import {RoundCard} from "./RoundCard";

const CARDS_IN_TOURNAMENT = 4

const MatchHistoryPanel = () => {
  const { tournaments } = useGameStatsStore()
  const [expandedRow, setExpandedRow ] = useState<string[]>([])

  return (
    <Table>
      <thead>
      <tr>
        <th>Map</th>
        <th>Kills</th>
        <th>Deaths</th>
        <th>Revives</th>
        <th>Damage</th>
      </tr>
      </thead>
      <tbody>
      {tournaments.map(tournament => (
        <React.Fragment key={tournament.id}>
          <tr onClick={() => setExpandedRow(prev => prev.includes(tournament.id) ? prev.filter(x => x !== tournament.id) : [tournament.id, ...prev])}>
            <td style={{ borderBottom: "0 px" }}>
              <Typography level="title-lg" color={tournament.won ? "success" : "primary" }>
                {tournament.map}
                <Chip sx={{ marginLeft: 1 }} color="neutral" size="sm" variant="soft">{tournament.startDateTime.toLocaleString()}</Chip>
              </Typography>

            </td>
            <td>{tournament.rounds.reduce((a, b) => a + b.kills, 0)}</td>
            <td>{tournament.rounds.reduce((a, b) => a + b.deaths, 0)}</td>
            <td>{tournament.rounds.reduce((a, b) => a + b.revives, 0)}</td>
            <td>{Math.round(tournament.rounds.reduce((a, b) => a + b.damage, 0))}</td>
          </tr>
          <tr style={{ visibility: expandedRow.includes(tournament.id) ? undefined : "collapse", transform: "height 200ms"}} >
            <td colSpan={5}>
              <Grid container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    flexWrap="wrap"
                    spacing={2}>
                {tournament.rounds.toReversed().map((round) => <RoundCard data={round} key={round.id}/>)}
                {[...Array(CARDS_IN_TOURNAMENT - tournament.rounds.length)].map((_, i) => <RoundCard key={i}/>)}
              </Grid>
            </td>
          </tr>
        </React.Fragment>
      ))}
      </tbody>
    </Table>
  )
}

export default MatchHistoryPanel
