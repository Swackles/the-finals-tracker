import {AspectRatio, Card, Divider, Grid, Stack, Typography} from "@mui/joy";
import {GameStats} from "@common/sdk/finals-tracker";
import {StatCard} from "./StatCard";
import {useMemo} from "react";
import {DonutChart, DonutChartData} from "@common/components";
import {msToTimeString} from "@common/util";

export interface StatsSummaryCardBasicInfoProps {
  data: GameStats
  timePlayedPerArchetype: DonutChartData[]
  damagePerArchetype: DonutChartData[]
  killsPerArchetype: DonutChartData[]
}

export const StatsSummaryCardBasicInfo = ({ data, timePlayedPerArchetype, damagePerArchetype, killsPerArchetype }: StatsSummaryCardBasicInfoProps) => {
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
      <StatCard title="Kills" value={data.kills} />
      <StatCard title="Deaths" value={data.deaths} />
      <StatCard title="Revives" value={data.revivesDone} />
      <StatCard title="Cashout" md={12} value={cashoutAmount} />
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
                  <Typography>{`${Math.round(data.roundWinRate * 100_00) / 100}%`}</Typography>
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
                  <Typography>{`${Math.round(data.tournamentWinRate * 100_00) / 100}%`}</Typography>
                </Stack>
              </Grid>
            </Stack>
          </AspectRatio>
        </Card>
      </Grid>
      <Grid xs={12} md={4}>
        <DonutChart
          title="Time played"
          labelGenerator={msToTimeString}
          data={timePlayedPerArchetype}/>
      </Grid>
      <Grid xs={12} md={4}>
        <DonutChart
          title="Damage"
          data={damagePerArchetype}/>
      </Grid>
      <Grid xs={12} md={4}>
        <DonutChart
          title="Kills"
          data={killsPerArchetype}/>
      </Grid>
    </Stack>
  )
}
