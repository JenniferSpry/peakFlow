import * as d3 from "d3";
import data from './data.csv';
import { extractKeyData } from './data-helper';
import "./style.css"; // hack to get the css file loaded

console.log(data)

const keyData = extractKeyData(data);

console.log(keyData);

const stateClasses = {
    'Gut': 'state-1',
    'Ok': 'state-2',
    'Mittel': 'state-3',
    'Mäßig': 'state-4',
    'Schlecht': 'state-5'
}

const margin = 60;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;
const measurementPadding = 30;

const svg = d3.select('svg');

const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

const xScale = d3.scaleBand()
    .range([0, width])
    .domain(data.map((s) => s.timestamp))
    .padding(0.2)

chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([
        keyData.lowestMeasurement - measurementPadding, 
        keyData.highestMeasurement + measurementPadding
    ]);

const makeYLines = () => d3.axisLeft()
    .scale(yScale)

chart.append('g')
    .call(d3.axisLeft(yScale));

chart.append('g')
    .attr('class', 'grid')
    .call(makeYLines()
      .tickSize(-width, 0, 0)
      .tickFormat('')
    )

const barGroups = chart.selectAll()
    .data(data)
    .enter()
    .append('g')

barGroups
    .append('rect')
    .attr('class', (g) => stateClasses[g.state])
    .attr('x', (g) => xScale(g.timestamp))
    .attr('y', (g) => yScale(g.measurement1))
    .attr('height', (g) => height - yScale(g.measurement1))
    .attr('width', xScale.bandwidth())
