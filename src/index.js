import * as d3 from "d3";
import data from './data.csv';
import { extractKeyData, transformData } from './data-helper';
import "./style.css"; // hack to get the css file loaded

console.log(data)

const keyData = extractKeyData(data);
console.log(keyData);

const transformedData = transformData(data);
console.log(transformedData);

const stateClasses = {
    'Gut': 'state-1',
    'Ok': 'state-2',
    'Mittel': 'state-3',
    'Mäßig': 'state-4',
    'Schlecht': 'state-5'
}

var svg1 = document.getElementById('svg');

const margin = 60;
const width = svg1.clientWidth - 2 * margin;
const height = 600 - 2 * margin;
const measurementPadding = 30;
const xScalePadding = 0.5;

const svg = d3.select('svg');

const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

const xScale = d3.scaleBand()
    .range([0, width])
    .domain(transformedData.map((d) => d.date))
    .padding(xScalePadding)

// create x scale
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
    .data(transformedData)
    .enter()
    .append('g')

// display first measurement of the day
barGroups
    .append('rect')
    .filter(function(d){ 
        return d.measurements.length > 0; 
    })
    .attr('width', xScale.bandwidth() / 2)
    .attr('height', (g) => height - yScale(g.measurements[0].measurement1))
    .attr('class', (g) => stateClasses[g.measurements[0].state])
    .attr('x', (g) => xScale(g.date))
    .attr('y', (g) => yScale(g.measurements[0].measurement1))

// display second measurement of the day
barGroups
    .append('rect')
    .filter(function(d){ 
        return d.measurements.length > 1; 
    })
    .attr('width', xScale.bandwidth() / 2)
    .attr('height', (g) => height - yScale(g.measurements[1].measurement1))
    .attr('class', (g) => stateClasses[g.measurements[1].state])
    .attr('x', (g) => xScale(g.date) + xScale.bandwidth() / 2)
    .attr('y', (g) => yScale(g.measurements[1].measurement1))
