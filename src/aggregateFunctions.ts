/**
 * Sums the `aggregateField` values of all data in the provided group.
 * @param data A data group
 * @param aggregateField The attribute whose values will be summed.
 */
export function sum(data: ramon.Datum[], aggregateField: string) {
    return data.reduce((p, c) => p + (c[aggregateField] as number), 0);
}

/**
 * Averages the `aggregateField` values of all data in the provided group.
 * @param data A data group
 * @param aggregateField The attribute whose values will be summed.
 */
export function average(data: ramon.Datum[], aggregateField: string) {
    return sum(data, aggregateField) / data.length;
}

/**
 * Returns length of provided group.
 * @param data A data group
 * @param aggregateField The attribute whose values will be summed.
 */
export function count(data: ramon.Datum[], aggregateField: string) {
    return data.length;
}