import moment from "moment";
// the input data will be sorted by timestamp

export function extractKeyData(data) {
    return {
        lowestMeasurement: findlowest(data),
        highestMeasurement: findHighest(data)
    }
}

export function transformData(data) {
    data.map((d) => d.max = maxMeasurement(d))
    const earliestDate = toMomentDate(data[0].timestamp);
    const latestDate = toMomentDate(data[data.length-1].timestamp);
    let transformed = {};
    for (let day = earliestDate.clone(); day.isBefore(latestDate.clone().add(1, 'day')); day = day.clone().add(1, 'day')) {
        transformed[day.format('DD.MM.YYYY')] = {
            measurements: []
        };
    }
    for (let i = 0; i < data.length; i++) {
        let day = toMomentDate(data[i].timestamp).format('DD.MM.YYYY');
        transformed[day].measurements.push(data[i]);
    };
    return Object.keys(transformed).map((key) => { return {...transformed[key], date: key }});
}

function toMomentDate(dateString) {
    return moment(dateString, "DD.MM.YYYY hh:mm:ss");
}

function findlowest(data) {
    let result = 1000;
    data.forEach(day => {
        result = day.measurement1 < result ? day.measurement1 : result;
        result = day.measurement2 < result ? day.measurement2 : result;
        result = day.measurement3 < result ? day.measurement3 : result;
    });
    return result;
}

function findHighest(data) {
    let result = 0;
    data.forEach(day => {
        result = day.measurement1 > result ? day.measurement1 : result;
        result = day.measurement2 > result ? day.measurement2 : result;
        result = day.measurement3 > result ? day.measurement3 : result;
    });
    return result;
}

function maxMeasurement(data) {
    let result = 0;
    result = data.measurement1 > result ? data.measurement1 : result;
    result = data.measurement2 > result ? data.measurement2 : result;
    result = data.measurement3 > result ? data.measurement3 : result;
    return result;
}