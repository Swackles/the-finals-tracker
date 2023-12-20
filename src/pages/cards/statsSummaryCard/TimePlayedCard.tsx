import {Card, Divider, Grid, Stack, Typography} from "@mui/joy";
import {DonutChart, DonutChartData} from "@common/components";
import {msToTimeString} from "@common/util";

export interface TimePlayedCardProps {
  data: DonutChartData[]
}

export const TimePlayedCard = ({ data }: TimePlayedCardProps) => {
  return (
    <Grid md={12}>
      <Card variant="soft" size="sm">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}>
          <Typography level="title-lg">Time played</Typography>
          <Divider />
          <DonutChart
            labelGenerator={msToTimeString}
            data={data}/>
        </Stack>
      </Card>
    </Grid>

  )
}