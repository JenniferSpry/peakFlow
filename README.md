# Peak flow

## Projekt
Takes peak flow values from astma testing tool and displays the results.

## Development details
Build with webpack (very rudimentary setup). 

Development server:
```
npm run start
```

Build

```
npm build
```

Built with help of tutorial from: https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/

## To-do

* color bars depending on state ✅
* display values between minimum and maximum value only (incl padding)  ✅
* display all days not just the ones in the data (between earliest and latest day)  ✅
* fix date text display
* display notes
* add hover state with informations
* add controls
    * max / lowest / average measurement
    * only morning / evening
    * only measurement no state