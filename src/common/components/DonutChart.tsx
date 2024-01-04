import {useEffect, useId, useRef} from "react";
import * as d3 from "d3"
import {AspectRatio, Card, CardContent, Divider, Stack, Typography, useTheme} from "@mui/joy";

export interface DonutChartData {
  legend: string,
  value: number
}

export interface DonutChartProps {
  title: string
  data: DonutChartData[]
  labelGenerator?: (x: number) => string
}

export const DonutChart = ({ title, data, labelGenerator = (x) => x.toString() }: DonutChartProps) => {
  const {palette: { primary }} = useTheme()
  const id = useId().replaceAll(":", "")

  const div = useRef<HTMLDivElement | null>(null)

  useEffect(()=> {
    const colors = [ primary["500"], primary["400"], primary["300"]];

    const svgContainer = d3.select(div.current).node();
    if (!svgContainer) return

    const width  = svgContainer.getBoundingClientRect().width;
    const height = width;
    const margin = 15;
    let radius = Math.min(width, height) / 2  - margin;

    // Delete old and create new SVG
    d3.select(`#${id} svg`).remove()
    const svg  = d3.select(`#${id}`)
      .append('svg')
      .attr("width", '100%')
      .attr("height", '100%')
      .attr('viewBox', '0 0 ' + width + ' ' + width )
      .append("g")
      // Center the graph
      .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

    let pie = d3.pie()
      .value( (d: any) => d.value)
    let data_ready = pie(data as any)

    const arc = d3.arc()
      .innerRadius(radius/ 1.75)  // This is the size of the donut hole
      .outerRadius(radius)

    // Donut partition
    svg
      .selectAll('whatever')
      .data(data_ready)
      .enter()
      .append('path')
      .transition()
      .duration(1000)
      .attr('d', arc as any)
      .attr('fill',  d =>  colors[d.index] )

    const tooltip = d3.select(`#tooltip-${id}`)

    svg.selectAll<SVGElement, { data: DonutChartData }>("path")
      .on('mousemove', function (d, i) {
        d3.select(this).transition()
          .duration(50)
          .attr('opacity', '.85');

        tooltip.transition()
          .duration(50)
          .style("opacity", 1);

        tooltip
          .select("p")
          .html(`${i.data.legend} ${labelGenerator(i.data.value)}`)

        console.log(d)

        tooltip
          .style("left", d.layerX + 15 + "px")
          .style("top", d.layerY + 15 + "px")
      })
      .on('mouseout', function () {
        d3.select(this).transition()
          .duration(50)
          .attr('opacity', '1');
        tooltip.transition()
          .duration(50)
          .style("opacity", 0);
      })

    svg.append("text")
      .attr("text-anchor", "middle")
      .text(labelGenerator(data.map(x => x.value).reduce((a, b) => a + b, 0)));
  }, [data, labelGenerator])

  return (
    <Card variant="soft" size="sm">
      <AspectRatio ratio="1/1.2" sx={{ "& .MuiAspectRatio-content": {overflow: "visible!important"}}}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}>
          <Typography level="title-lg">{title}</Typography>
          <Divider />
          <div id={id} ref={x => div.current = x}>
          </div>
          <Card id={`tooltip-${id}`}
                size="sm"
                sx={{
                  opacity: 0,
                  position: "absolute",
                  zIndex: 1,
                  "& [data-first-child]": { position: "static" }
                }} >
            <CardContent sx={{ position: "static"}}>
              <Typography level="body-sm" noWrap></Typography>
            </CardContent>
          </Card>
        </Stack>
      </AspectRatio>
    </Card>

  )
}
