import _ from 'lodash';
import Peaks from './data.csv';

function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    return element;
  }
  
  console.log(Peaks);

  document.body.appendChild(component());