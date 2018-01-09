export function sum(data: ramon.Datum[], aggregateField: string) {
    return data.reduce((p, c) => p + (c[aggregateField] as number), 0)
}

export function average(data: ramon.Datum[], aggregateField: string) {
    return sum(data, aggregateField) / data.length;
}

export function count(data: ramon.Datum[], aggregateField: string) {
    return data.length;
}