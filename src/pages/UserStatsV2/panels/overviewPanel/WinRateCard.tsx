import {Card, Divider, Stack, Typography, useTheme} from "@mui/joy";
import {BarChart} from "@mui/x-charts";

export interface WinRateData {
  type: "Round" | "Tournament",
  total: number,
  light: number,
  medium: number,
  heavy: number
}

export interface WinRateCardProps {
  chartData: WinRateData[]
}

export const WinRateCard = ({ chartData }: WinRateCardProps) => {
  const {palette: { primary }} = useTheme()

  const valueFormatter = (rate: number) => `${Math.round(rate * 100)} %`

  return (
    <Card variant="soft" size="sm">
      <Stack direction="column"
             justifyContent="center"
             alignItems="flex-start"
             flexWrap="wrap">
        <Typography sx={{width: "100%", textAlign: "center"}} level="title-lg">Winrate</Typography>
        <Divider />
        <BarChart dataset={chartData as any}
                  height={200}
                  xAxis={[{
                    scaleType: 'band',
                    dataKey: 'type',
                    valueFormatter: (x) => x,
                  }]}
                  sx={{
                    marginVertical: -40,
                    "& .MuiChartsAxis-bottom": { display: "none" },
                    "& .MuiChartsAxis-left": { display: "none" },
                    "& .MuiChartsLegend-row": { display: "none" }
                  }}
                  yAxis={[{ min: 0, max: 1 }]}
                  series={[
                    { dataKey: 'total', label: 'Total', color: primary["500"], valueFormatter },
                    { dataKey: 'light', label: 'Light', color: primary["300"], valueFormatter },
                    { dataKey: 'medium', label: 'Medium', color: primary["200"], valueFormatter },
                    { dataKey: 'heavy', label: 'Heavy', color: primary["100"], valueFormatter },
                  ]} />
        <Stack direction="row"
               justifyContent="space-evenly"
               alignItems="center"
               sx={{ width: "100%" }}>
          <Typography level="title-md">Round</Typography>
          <Typography level="title-md">Tournament</Typography>
        </Stack>
      </Stack>
    </Card>
  )
}
