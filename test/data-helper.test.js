import { extractKeyData, transformData } from '../src/data-helper';

const highestMeasurement = 510;
const lowestMeasurement = 380;

const testData = [
  {
    measurement1: 509,
    measurement2: 507,
    measurement3: 480,
    meta: null,
    state: "Schlecht",
    timestamp: "09.07.2021 08:00:17"
  },
  {
    measurement1: 475,
    measurement2: highestMeasurement,
    measurement3: 460,
    meta: null,
    state: "Ok",
    timestamp: "09.07.2021 22:00:17",
  },
  {
    measurement1: 420,
    measurement2: 400,
    measurement3: lowestMeasurement,
    meta: null,
    state: "Mittel",
    timestamp: "11.07.2021 07:55:44"
  }
]

describe('extractKeyData', () => {
  test('finds the lowest measurement', () => {
    expect(extractKeyData(testData).lowestMeasurement).toBe(lowestMeasurement);
  });

  test('finds the highest measurement', () => {
    expect(extractKeyData(testData).highestMeasurement).toBe(highestMeasurement);
  });
});

describe('transformData', () =>  {
  test('adds missing days', () => {
    const expectedResponse = [
      {
        date: '09.07.2021',
        measurements: [
          {
            measurement1: 509,
            measurement2: 507,
            measurement3: 480,
            meta: null,
            state: "Schlecht",
            timestamp: "09.07.2021 08:00:17"
          },
          {
            measurement1: 475,
            measurement2: highestMeasurement,
            measurement3: 460,
            meta: null,
            state: "Ok",
            timestamp: "09.07.2021 22:00:17",
          }
        ]
      },
      {
        date: '10.07.2021',
        measurements: []
      },
      {
        date: '11.07.2021',
        measurements: [
          {
            measurement1: 420,
            measurement2: 400,
            measurement3: lowestMeasurement,
            meta: null,
            state: "Mittel",
            timestamp: "11.07.2021 07:55:44"
          }
        ]
      }
    ];

    expect(transformData(testData)).toStrictEqual(expectedResponse);
  })
})