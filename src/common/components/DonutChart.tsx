import {useEffect, useRef} from "react";
import * as d3 from "d3"

export interface DonutChartData {
  legend: string,
  value: number
}

export interface DonutChartProps {
  data: DonutChartData[]
  labelGenerator: (x: number) => string
}

export const DonutChart = ({ data, labelGenerator }: DonutChartProps) => {
  const div = useRef<HTMLDivElement | null>(null)
  const colors = [ '#8ce8ad', '#57e188', '#34c768', '#2db757', '#27acaa', '#42c9c2', '#60e6e1', '#93f0e6', '#87d3f2', '#4ebeeb', '#35a4e8', '#188ce5', '#542ea5', '#724bc3', '#9c82d4', '#c981b2', '#b14891', '#ff6d00', '#ff810a', '#ff9831', '#ffb46a', '#ff9a91', '#ff736a', '#f95d54', '#ff4136', '#c4c4cd' ];

    useEffect(()=> {
      const svgContainer = d3.select(div.current).node();
      if (!svgContainer) return

      const width  = svgContainer.getBoundingClientRect().width;
      const height = width;
      const margin = 15;
      let radius = Math.min(width, height) / 2  - margin;

      // Create SVG
      d3.select("#div svg").remove()
      const svg  = d3.select("#div")
        .append('svg')
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox', '0 0 ' + width + ' ' + width )
        //.attr('preserveAspectRatio','xMinYMin')
        .append("g")
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
        .attr("stroke", "#fff")
        .style("stroke-width", "2")
        .style("opacity", "0.8")

      // legend Position
      let legendPosition = d3.arc().innerRadius(radius/1.75).outerRadius(radius);

      // Legend group and legend name
      svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('g')
        .attr("transform", d => `translate(${legendPosition.centroid(d as any)})`)
        .attr("class", 'legend-g')
        .style("user-select", "none")
        .append('text')
        .text(d => (d.data as any as DonutChartData).legend)
        .transition()
        .duration(1000)
        .style("text-anchor", "middle")
        .style("font-weight", 700)
        .style("fill", '#222')
        .style("font-size", 14);

      //Label for value
      svg
        .selectAll('.legend-g')
        .append('text')
        .transition()
        .duration(1000)
        .text((d: any) => labelGenerator(d.value))
        .style("fill", '#444')
        .style("font-size", 12)
        .style("text-anchor", "middle")
        .attr("y", 16);

      svg.append("text")
        .attr("text-anchor", "middle")
        .text(labelGenerator(data.map(x => x.value).reduce((a, b) => a + b, 0)));
    }, [data])


    return (
      <>
        <div id="div" ref={x => div.current = x}></div>
      </>
  )
}