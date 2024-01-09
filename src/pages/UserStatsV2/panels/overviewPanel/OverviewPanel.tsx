import {Grid} from "@mui/joy";
import {StatsSummaryCardBasicInfo} from "./StatsSummaryCardBasicInfo";
import {MatchesChartCard} from "./MatchesChartCard";
import {RanksChartCard} from "./ranksChartCard/RanksChartCard";

export const OverviewPanel = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexWrap="wrap"
      spacing={2} >
      <Grid container spacing={2} xs={12} md={6}>
        <Grid xs={12}>
          <RanksChartCard />
        </Grid>
        <Grid xs={12}>
          <MatchesChartCard />
        </Grid>
      </Grid>
      <Grid xs={5}>
        <StatsSummaryCardBasicInfo />
      </Grid>
    </Grid>
  )
}
