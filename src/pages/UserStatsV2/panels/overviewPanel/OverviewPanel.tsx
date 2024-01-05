import {GameStats} from "@common/sdk/finals-tracker";
import {DonutChartData} from "@common/components";
import {Grid} from "@mui/joy";
import {ClassesTableCard, ClassesTableRow} from "./ClassesTableCard";
import {StatsSummaryCardBasicInfo} from "./StatsSummaryCardBasicInfo";
import {MatchesChartCard, MatchesChartData} from "./MatchesChartCard";
import {WinRateData} from "./WinRateCard";
import {RanksChartCard} from "./ranksChartCard/RanksChartCard";

export interface OverviewPanelProps {
  data: GameStats
  classesTableData: ClassesTableRow[]
  timePlayedPerArchetype: DonutChartData[]
  damagePerArchetype: DonutChartData[]
  killsPerArchetype: DonutChartData[]
  matchesData: MatchesChartData[]
  winRateDataChart: WinRateData[]
}

export const OverviewPanel = (props: OverviewPanelProps) => {
  const {
    data,
    classesTableData,
    timePlayedPerArchetype, damagePerArchetype, killsPerArchetype, winRateDataChart,
    matchesData
  } = props
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexWrap="wrap"
      spacing={2} >
      <Grid xs={7}>
        <ClassesTableCard data={classesTableData} />
      </Grid>
      <Grid container spacing={2} xs={12} md={6}>
        <Grid xs={12}>
          <RanksChartCard />
        </Grid>
        <Grid xs={12}>
          <MatchesChartCard data={matchesData} />
        </Grid>
      </Grid>
      <Grid xs={5}>
        <StatsSummaryCardBasicInfo data={data}
                                   timePlayedPerArchetype={timePlayedPerArchetype}
                                   damagePerArchetype={damagePerArchetype}
                                   killsPerArchetype={killsPerArchetype}
                                   winRateDataChart={winRateDataChart}/>
      </Grid>
    </Grid>
  )
}
