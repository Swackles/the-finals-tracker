import Grid from '@mui/joy/Grid';
import Chip from '@mui/joy/Chip';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import {useGameStatsStore} from "@common/stores/gameStatsStore";
import React, {useState} from "react";
import {RoundCard} from "./RoundCard";
import CardOverflow from "@mui/joy/CardOverflow";
import Card from "@mui/joy/Card";

const CARDS_IN_TOURNAMENT = 4

const MatchHistoryPanel = () => {
  const { tournaments } = useGameStatsStore()
  const [expandedRow, setExpandedRow ] = useState<string[]>([])

  return (
    <Card
      variant="plain"
      orientation="vertical" >
      <CardOverflow sx={{ padding: 0 }}>
        <Table sx={{
          "& td:first-child, & th:first-child": { pl: 2 },
          "& td:last-child, & th:last-child": { pr: 2 }
        }}>
          <thead>
          <tr>
            <th style={{ width: "50%" }}>Map</th>
            <th style={{ textAlign: "center" }}>Kills</th>
            <th style={{ textAlign: "center" }}>Deaths</th>
            <th style={{ textAlign: "center" }}>Revives</th>
            <th style={{ textAlign: "center" }}>Damage</th>
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
                <td style={{ textAlign: "center" }}>{tournament.rounds.reduce((a, b) => a + b.kills, 0)}</td>
                <td style={{ textAlign: "center" }}>{tournament.rounds.reduce((a, b) => a + b.deaths, 0)}</td>
                <td style={{ textAlign: "center" }}>{tournament.rounds.reduce((a, b) => a + b.revives, 0)}</td>
                <td style={{ textAlign: "center" }}>{Math.round(tournament.rounds.reduce((a, b) => a + b.damage, 0))}</td>
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
      </CardOverflow>
    </Card>
  )
}

export default MatchHistoryPanel
