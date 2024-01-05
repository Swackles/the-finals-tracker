import {LineChart} from "@mui/x-charts";
import Card from "@mui/joy/Card";
import Stack from "@mui/joy/Stack";
import {CircularProgress, Typography, useTheme} from "@mui/joy";
import {useEffect} from "react";
import {useAuthStore, useStore} from "@common/stores";
import {RanksChartCardStore} from "./RanksChartCardStore";
import {observer} from "mobx-react";

export const RanksChartCard = observer(() => {
  const {palette: { primary }} = useTheme()
  const { profile } = useAuthStore()
  const store = useStore(RanksChartCardStore.new)

  useEffect(() => {
    if (!profile || !profile.embarkName || !profile.steamName) return

    store.fetchData(profile.embarkName, profile.steamName)
  }, [profile])


  if (store.isLoading) return (
    <Card variant="soft">
      <Stack direction="row"
             justifyContent="center"
             alignItems="center"
             spacing={2}
             sx={{ height: 250 }} >
        <CircularProgress size="lg" variant="soft" />
      </Stack>
    </Card>
  )


  if (store.isErrored) return (
    <Card variant="soft">
      <Stack direction="row"
             justifyContent="center"
             alignItems="center"
             spacing={2}
             sx={{ height: 250 }} >
        <Typography color="danger" level="title-lg">{store.getError}</Typography>
      </Stack>
    </Card>
  )


  if (!store!.isDataAvailable) return (
    <Card variant="soft">
      <Stack direction="row"
             justifyContent="center"
             alignItems="center"
             spacing={2}
             sx={{ height: 250 }} >
        <Typography level="title-lg">No Data Available</Typography>
      </Stack>
    </Card>
  )

  return (
  <Card variant="soft">
    <Stack direction="row"
           justifyContent="center"
           alignItems="center"
           spacing={1} >
      <Stack direction="column"
             justifyContent="center"
             alignItems="center"
             spacing={1} >
        <img alt={store.getLeague} style={{ width: 150, height: 150}} src={`/images/ranks/${store.getLeague.toLowerCase().replace(" ", "-")}.png`} />
        <Typography sx={{ position: "absolute", textShadow: "1px 1px 2px black" }}
                    color="danger"
                    level="h2" >
          {store.getRanks[store.getRanks.length - 1] * -1}
        </Typography>
      </Stack>
      <LineChart xAxis={[{
                  data: store.getDates,
                  valueFormatter: (date: Date) =>
                    date.toLocaleDateString(undefined, {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    }),
                  scaleType: 'time',
                  tickLabelInterval: (date: Date) => date.getHours() === 0
                 }]}
                 yAxis={[
                   {
                     id: 'fameAxis',
                     scaleType: 'linear',
                     tickMinStep: 20_000,
                     max: Math.max(...store.getFames) * 1.2,
                     min: Math.min(...store.getFames) * 0.2,
                   },
                   {
                     id: 'rankAxis',
                     scaleType: 'linear',
                     tickMinStep: 1,
                     max: -1,
                     min: Math.min(...store.getRanks) * 1.1,
                     valueFormatter: (value) => (value * -1).toString()
                   }
                 ]}
                 series={[
                   {
                     yAxisKey: 'rankAxis',
                     showMark: false,
                     data: store.getRanks,
                     label: 'Rank',
                     color: primary["500"],
                     valueFormatter: (value) => (value * -1).toString()
                   },
                   {
                     yAxisKey: 'fameAxis',
                     showMark: false,
                     data: store.getFames,
                     label: 'Fame',
                     color: primary["400"]
                   }
                 ]}
                 sx={{
                   "& .MuiChartsAxis-right": { display: "none" },
                   "& .MuiChartsAxis-left": { display: "none" },
                   "& .MuiChartsLegend-row": { display: "none" }
                 }}
                 leftAxis="fameAxis"
                 rightAxis="rankAxis"
                 height={250} />
    </Stack>
  </Card>
  )
})
