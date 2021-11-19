import * as d3 from "d3";
import data from './data.csv';
import "./style.css"; // hack to get the css file loaded

console.log(data)

const svgElement = document.createElement('svg');
document.body.appendChild(svgElement);

const margin = 60;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;

const svg = d3.select('svg');

const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

// var yScale = d3.scaleLinear()
//     .range ([height, 0])
//     .domain([0, 100]);

// chart.append('g')
//     .call(d3.axisLeft(yScale));

const xScale = d3.scaleBand()
    .range([0, width])
    .domain(data.map((s) => s.timestamp))
    .padding(0.2)

chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

// var svg = d3.select("svg"),
//     margin = 200,
//     width = svg.attr("width") - margin,
//     height = svg.attr("height") - margin;

// var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
//     yScale = d3.scaleLinear().range ([height, 0]);

// var g = svg.append("g")
//         .attr("transform", "translate(" + 100 + "," + 100 + ")");

// xScale.domain(Test.map(function(d) { return d.year; }));
// yScale.domain([0, d3.max(Test, function(d) { return d.value; })]);

// g.append("g")
// .attr("transform", "translate(0," + height + ")")
// .call(d3.axisBottom(xScale));

// g.append("g")
// .call(d3.axisLeft(yScale).tickFormat(function(d){
//     return "$" + d;
// }).ticks(10))
// .append("text")
// .attr("y", 6)
// .attr("dy", "0.71em")
// .attr("text-anchor", "end")
// .text("value");
