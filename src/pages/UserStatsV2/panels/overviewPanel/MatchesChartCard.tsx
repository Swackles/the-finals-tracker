import {LineChart} from "@mui/x-charts";
import Card from "@mui/joy/Card";
import Checkbox from "@mui/joy/Checkbox";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import {useMemo, useState} from "react";
import {MakeOptional} from "@mui/x-charts/models/helpers";
import {AxisConfig} from "@mui/x-charts/models/axis";
import {useTheme} from "@mui/joy";

export interface MatchesChartData {
  kills: number
  deaths: number
  respawns: number
  revives: number
}

export interface MatchesChartProps {
  data: MatchesChartData[]
}

export const MatchesChartCard = ({ data }: MatchesChartProps) => {
  const {palette: { primary }} = useTheme()
  const [checkboxes, setCheckboxes] = useState({
    kills: true, deaths: true, respawns: false, revives: false
  })
  const maxValue = useMemo(() =>
    Math.max(...data.map(x => [x.kills, x.deaths, x.revives, x.respawns]).flat())
  , [data])

  const series = useMemo(() => {
    const kills = {
      data: [] as number[],
      showMark: false,
      color: primary["500"],
      label: 'Kills'
    }
    const deaths = {
      data: [] as number[],
      showMark: false,
      color: primary["400"],
      label: 'Deaths'
    }
    const respawns = {
      data: [] as number[],
      showMark: false,
      color: primary["300"],
      label: 'Respawns',

    }
    const revives = {
      data: [] as number[],
      showMark: false,
      color: primary["200"],
      label: 'Revives'
    }

    for (const point of data) {
      kills.data.push(point.kills)
      deaths.data.push(point.deaths)
      respawns.data.push(point.respawns)
      revives.data.push(point.revives)
    }

    return [kills, deaths, respawns, revives].filter(({label}) => (checkboxes as any)[label.toLowerCase()])
  }, [data, checkboxes])

  const yAxis: MakeOptional<AxisConfig, 'id'>[] = [{
    disableLine: true,
    scaleType: 'linear',
    tickMinStep: 1,
    max: maxValue * 1.2,
    hideTooltip: false,
    min: -1,
  }]

  const toggleCheckbox = (key: "kills" | "deaths" | "respawns" | "revives") => {
    setCheckboxes(prev => ({...prev, [key]: !prev[key]}))
  }

  return (
  <Card variant="soft">
    <Stack direction="column"
           justifyContent="flex-start"
           alignItems="flex-start"
           spacing={1} >
      <Typography level="title-lg">Performance in last 10 rounds</Typography>
    </Stack>
    <Stack direction="row"
           justifyContent="center"
           alignItems="center"
           spacing={2}>
      <Stack direction="column"
             justifyContent="flex-start"
             alignItems="flex-start"
             spacing={1} >
        <Checkbox onClick={() => toggleCheckbox("kills")}
                  checked={checkboxes.kills}
                  label={"Kills"} />
        <Checkbox onClick={() => toggleCheckbox("deaths")}
                  checked={checkboxes.deaths}
                  label={"Deaths"} />
        <Checkbox  onClick={() => toggleCheckbox("respawns")}
                   checked={checkboxes.respawns}
                   label={"Respawns"} />
        <Checkbox  onClick={() => toggleCheckbox("revives")}
                   checked={checkboxes.revives}
                   label={"Revives"} />
      </Stack>
      <LineChart yAxis={yAxis}
                 series={series}
                 height={250}
                 sx={{
                   "& .MuiChartsAxis-bottom": { display: "none" },
                   "& .MuiChartsAxis-left": { display: "none" },
                   "& .MuiChartsLegend-row": { display: "none" }
                 }} />
    </Stack>
  </Card>
  )
}
