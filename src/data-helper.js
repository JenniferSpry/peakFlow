export function extractKeyData(data) {
    return {
        earliestDate: data[0].timestamp,
        latestDate: data[data.length-1].timestamp,
    }
}
