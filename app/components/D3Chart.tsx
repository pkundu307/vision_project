"use client"
import React, { useEffect } from 'react';
import * as d3 from 'd3';

const D3Chart = ({ width = 300, height = 200 }) => {
  const chartRef = React.useRef(null);

  useEffect(() => {
    const data = [
      { name: 'Students', value: 500 },
      { name: 'Trainers', value: 200 },
      { name: 'Courses', value: 150 }
    ];

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = chartRef.current.clientHeight - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc()
      .innerRadius(50)
      .outerRadius(Math.min(width / 2, height / 2) * 0.8);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const g = svg.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.name));

    g.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(d => d.data.name);

    g.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text(d => d.data.value);
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '200px' }} />;
};

export default D3Chart;
