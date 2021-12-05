import { extractKeyData } from '../src/data-helper';

const testData = [
  {
    measurement1: 509,
    measurement2: null,
    measurement3: null,
    meta: null,
    state: "Schlecht",
    timestamp: "09.07.2021"
  },
  {
    measurement1: 475,
    measurement2: 460,
    measurement3: 460,
    meta: null,
    state: "Ok",
    timestamp: "09.09.2021 08:00:17",
  },
  {
    measurement1: 420,
    measurement2: 400,
    measurement3: 390,
    meta: null,
    state: "Mittel",
    timestamp: "17.11.2021 07:55:44"
  }
]

describe('extractKeyData', () => {
  test('finds the earliest date', () => {
    expect(extractKeyData(testData).earliestDate).toBe(testData[0].timestamp);
  });

  test('finds the latest date', () => {
    expect(extractKeyData(testData).latestDate).toBe(testData[testData.length-1].timestamp);
  });
});