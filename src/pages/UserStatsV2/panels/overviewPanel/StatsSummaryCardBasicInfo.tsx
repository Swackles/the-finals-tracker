import {Grid, Stack} from "@mui/joy";
import {StatCard} from "./StatCard";
import {useMemo} from "react";
import {DonutChart} from "@common/components";
import {msToTimeString} from "@common/util";
import {WinRateCard} from "./WinRateCard";
import {useGameStatsStore} from "@common/stores/gameStatsStore";
import {observer} from "mobx-react";

export const StatsSummaryCardBasicInfo = observer(() => {
  const { archetypes, roundStatsSummary } = useGameStatsStore()

  const cashoutAmount = useMemo(() => {
    const amount = roundStatsSummary.totalCashOut.toString()
    .split("").reverse().join("")
    .match(/.{1,3}/g)!.reverse()
    .map(x => x.split("").reverse().join(""))
    .join(" ")

    return `${amount}$`
  }, [roundStatsSummary.totalCashOut])

  const timePlayedPerArchetype = useMemo(() => archetypes.map(archetype => ({
    legend: archetype.type,
    value: archetype.timePlayed
  })), [archetypes])

  const damagePerArchetype = useMemo(() => archetypes.map(archetype => ({
    legend: archetype.type,
    value: archetype.damage
  })), [archetypes])

  const killsPerArchetype = useMemo(() => archetypes.map(archetype => ({
    legend: archetype.type,
    value: archetype.kills
  })), [archetypes])

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexWrap="wrap"
    >
      <StatCard title="Kills" value={roundStatsSummary.kills} />
      <StatCard title="Deaths" value={roundStatsSummary.deaths} />
      <StatCard title="Revives" value={roundStatsSummary.revivesDone} />
      <StatCard title="Cashout" md={12} value={cashoutAmount} />
      <Grid xs={12}>
        <WinRateCard />
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
})
