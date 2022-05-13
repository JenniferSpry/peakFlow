# Peak flow

## Project

Takes peak flow values from asthma testing tool and displays the results.

An example can be found here: https://jenniferspry.github.io/peakFlow

This MVP solution simply takes it's data from a csv file (see `src/data.csv`) and has to be redeployed when changes in the data should be displayed.

Built with help of tutorial from: https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/

## Development

Build with webpack (very rudimentary setup).

Development server:

```
npm install
npm run serve
```

## Deploy

Refresh the `src/data.csv` with your actual data and build the project.

```
npm install
npm run build
```

Deploy the contents of the `/dist` folder to a server of your choice.

## To-do

- color bars depending on state ✅
- display values between minimum and maximum value only (incl padding) ✅
- display all days not just the ones in the data (between earliest and latest day) ✅
- display only months on x scale ✅
- display notes (as lines behind the bars) ✅
- 🐞 will break if there is no data entry with 0 measurements
- add controls
  - max / lowest / average measurement
  - only morning / evening
  - only measurement no state
- separate first and last measurement into morning (before 12) and evening (after), maybe include values after midnight in previous day?
- add hover state with information
