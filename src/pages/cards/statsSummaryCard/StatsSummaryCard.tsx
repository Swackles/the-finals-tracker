import {Card, Grid, Stack} from "@mui/joy";
import {RoundStatsSummary} from "@common/sdk/types/RoundStatsSummaryResponse";
import {StatsSummaryCardBasicInfo} from "./StatsSummaryCardBasicInfo";
import {WeaponsTableCard, WeaponsTableRow} from "./WeaponsTableCard";
import {ClassesTableCard, ClassesTableRow} from "./ClassesTableCard";

export interface StatsSummaryCardProps {
  data: RoundStatsSummary
  weaponTableData: WeaponsTableRow[]
  classesTableData: ClassesTableRow[]
}

export const StatsSummaryCard = ({ data, weaponTableData, classesTableData }: StatsSummaryCardProps) => {
  return (
    <Card variant="plain">
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexWrap="wrap">
        <Grid xs={7}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}>
            <ClassesTableCard data={classesTableData} />
            <WeaponsTableCard data={weaponTableData} />
          </Stack>
        </Grid>
        <Grid xs={5}>
          <StatsSummaryCardBasicInfo data={data} />
        </Grid>
      </Stack>
    </Card>
  )
}