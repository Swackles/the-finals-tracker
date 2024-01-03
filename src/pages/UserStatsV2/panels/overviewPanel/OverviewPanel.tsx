import {GameStats} from "@common/sdk/finals-tracker";
import {DonutChartData} from "@common/components";
import {Grid} from "@mui/joy";
import {ClassesTableCard, ClassesTableRow} from "./ClassesTableCard";
import {StatsSummaryCardBasicInfo} from "./StatsSummaryCardBasicInfo";

export interface OverviewPanelProps {
  data: GameStats
  classesTableData: ClassesTableRow[]
  timePlayed: DonutChartData[]
}

export const OverviewPanel = ({data, classesTableData, timePlayed}: OverviewPanelProps) => {
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
      <Grid xs={5}>
        <StatsSummaryCardBasicInfo data={data} timePlayed={timePlayed} />
      </Grid>
    </Grid>
  )
}
