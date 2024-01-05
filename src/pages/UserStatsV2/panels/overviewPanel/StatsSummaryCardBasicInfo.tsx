import {Grid, Stack} from "@mui/joy";
import {GameStats} from "@common/sdk/finals-tracker";
import {StatCard} from "./StatCard";
import {useMemo} from "react";
import {DonutChart, DonutChartData} from "@common/components";
import {msToTimeString} from "@common/util";
import {WinRateCard, WinRateData} from "./WinRateCard";

export interface StatsSummaryCardBasicInfoProps {
  data: GameStats
  timePlayedPerArchetype: DonutChartData[]
  damagePerArchetype: DonutChartData[]
  killsPerArchetype: DonutChartData[]
  winRateDataChart: WinRateData[]
}

export const StatsSummaryCardBasicInfo = ({ data, timePlayedPerArchetype, damagePerArchetype, killsPerArchetype, winRateDataChart }: StatsSummaryCardBasicInfoProps) => {
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
        <WinRateCard chartData={winRateDataChart} />
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
