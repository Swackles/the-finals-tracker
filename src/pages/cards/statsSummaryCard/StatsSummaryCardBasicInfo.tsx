import {AspectRatio, Card, Divider, Grid, Stack, Typography} from "@mui/joy";
import {RoundStatsSummary} from "@common/sdk/types/RoundStatsSummaryResponse";
import {StatCard} from "./StatCard";
import {useMemo} from "react";
import {msToTimeString} from "@common/util";

export interface StatsSummaryCardBasicInfoProps {
  data: RoundStatsSummary
}

export const StatsSummaryCardBasicInfo = ({ data }: StatsSummaryCardBasicInfoProps) => {
  const timePlayed = useMemo(
    () => msToTimeString(data.timePlayed),
    [data.timePlayed])

  const cashoutAmount = useMemo(() => {
    const amount = data.totalCashOut.toString()
    .split("").reverse().join("")
    .match(/.{1,3}/g)!.reverse()
    .map(x => x.split("").reverse().join(""))
    .join(" ")

    return `${amount}$`
  }, [data.totalCashOut])

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexWrap="wrap"
    >
      <StatCard title="k/d" value={Math.round(data.kills / data.deaths * 100) / 100} />
      <StatCard title="Kills" value={data.kills} />
      <StatCard title="Deaths" value={data.deaths} />
      <StatCard title="Revives" value={data.revivesDone} />
      <Grid xs={12}>
        <Card variant="soft" size="sm">
          <AspectRatio ratio={2}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              flexWrap="wrap">
              <Grid xs={12}>
                <Typography level="title-lg">Winrate</Typography>
              </Grid>
              <Grid xs={6}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0.5}>
                  <Typography level="title-lg">Round</Typography>
                  <Divider />
                  <Typography>{`${Math.round(data.roundWinRate * 100) / 100}%`}</Typography>
                </Stack>
              </Grid>
              <Grid xs={6}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0.5}>
                  <Typography level="title-lg">Tournament</Typography>
                  <Divider />
                  <Typography>{`${Math.round(data.tournamentWinRate * 100) / 100}%`}</Typography>
                </Stack>
              </Grid>
            </Stack>
          </AspectRatio>
        </Card>
      </Grid>
      <StatCard title="Played" md={12} value={timePlayed} />
      <StatCard title="Cashout" md={12} value={cashoutAmount} />
    </Stack>
  )
}