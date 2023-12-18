import {Progress, Radar} from "@ant-design/charts";
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useMemo} from "react";

export interface PerClassChartData {
  light?: number
  medium?: number
  heavy?: number
}

export interface RadarChartProps {
  title: string
  data: PerClassChartData
}

export const PerClassChartCard = ({title, data}: RadarChartProps) => {
  const mappedData = useMemo(() => {
    const light = data.light ? data.light : 0,
          medium = data.medium ? data.medium : 0,
          heavy = data.heavy ? data.heavy : 0
    const maxValue = Math.max(light, medium, heavy)

    return [
      { key: "Light", value: Math.round(light / maxValue * 1000) / 10 },
      { key: "Medium", value: Math.round(medium / maxValue * 1000) / 10 },
      { key: "Heavy", value: Math.round(heavy / maxValue * 1000) / 10 }
    ].filter(x => x.value !== 0)
  }, [data])

  const config = {
    autoFit: true,
    color: ['#5B8FF9', '#FFF'],
  };

  return (
    <Grid container xs={12} md={4}>
      <TableContainer>
        <Table style={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableCell colSpan={2} align="center">{title}</TableCell>
          </TableHead>
          <TableBody>
            {mappedData.map(({key, value}) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>
                  <Grid container
                        xs={12}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2} >
                    <Grid xs={10} item><Progress {...config} percent={value / 100} /></Grid>
                    <Grid xs={2} item>{value}%</Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}