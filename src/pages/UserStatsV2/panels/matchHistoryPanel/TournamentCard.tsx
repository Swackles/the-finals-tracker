import {RoundCard} from "./RoundCard";
import {Divider, Stack, Table, Typography} from "@mui/joy";
import {useMemo} from "react";
import {Tournament} from "@common/util/mapGameStats";

export interface TournamentCardProps {
  data: Tournament
}

const CARDS_IN_TOURNAMENT = 4

export const TournamentCard = ({ data }: TournamentCardProps) => {
  const missingCards = useMemo(() =>
    CARDS_IN_TOURNAMENT - data.rounds.length,
    [data.rounds]
  )

  const {
    kills,
    deaths,
    respawns,
    revives
  } = useMemo(() =>
    data.rounds.reduce((a, b) => ({
      kills: a.kills + b.kills,
      deaths: a.deaths + b.deaths,
      respawns: a.respawns + b.respawns,
      revives: a.revives + b.revives
    }), {
      kills: 0,
      deaths: 0,
      respawns: 0,
      revives: 0
    })
  , [data.rounds])

  return (
    <Stack direction="column" spacing={3}>
      <Typography level="h2">
        <Typography color={data.won ? "success" : "danger"}>{data.map}</Typography>
        <Typography level="body-xs"> ({data.id})</Typography>
      </Typography>
      <Table
        sx={{ '& tr > *': { textAlign: 'center' } }}
        borderAxis="xBetween"
        size="md"
        stickyFooter={false}
        stickyHeader={false}
        stripe="even"
        variant="plain"
      >
        <thead>
        <tr>
          <th>k/d</th>
          <th>Kills</th>
          <th>Deaths</th>
          <th>Respawns</th>
          <th>Revives</th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td>{Math.round(kills / deaths * 100) / 100}</td>
            <td>{kills}</td>
            <td>{deaths}</td>
            <td>{respawns}</td>
            <td>{revives}</td>
          </tr>
        </tbody>
      </Table>
      <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
        {data.rounds.toReversed().map((round) => <RoundCard data={round} key={round.id} />)}
        {[...Array(missingCards)].map((_, i) => <RoundCard key={i} />)}
      </Stack>
      <Divider />
    </Stack>
  )
}
