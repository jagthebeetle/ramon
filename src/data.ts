/**
 * Groups `data` by: bucketing it according to `grouping.groupFields` and then
 * applying grouping.aggregateFn.
 * @param data
 * @param grouping A grouping description by which to transform data.
 */
export function group(data: ramon.Datum[], grouping: ramon.Grouping) {
    const groups: GroupIntermediate = {};
    const keyFromDatum = (d: ramon.Datum) => {
        return JSON.stringify(grouping.groupFields.map(key => d[key]));
    };
    data.forEach(datum => {
        const groupKey = keyFromDatum(datum);
        groups[groupKey] = groups[groupKey] || [];
        groups[groupKey].push(datum);
    });

    const result: ramon.Datum[] = [];
    const aggregateName = `${grouping.aggregateFn.name}_${grouping.aggregateField}`;
    /* tslint:disable:forin */
    for (const groupKey in groups) {
        const group: ramon.Datum = {};
        const aggregateVal = grouping.aggregateFn(groups[groupKey],
                                                  grouping.aggregateField);
        const groupedVals: ramon.PrimitiveDatum[] = JSON.parse(groupKey);
        grouping.groupFields.forEach((groupField, i) => {
            group[groupField] = groupedVals[i];
        });
        group[aggregateName] = aggregateVal;
        result.push(group);
    }
    /* tslint:enable */
    return result;
}

interface GroupIntermediate {
    [domain: string]: ramon.Datum[];
}

/**
 * Produces a dataset of integers under the optional field, up to provided
 * limit.
 * @param upTo Exclusive upper bound on data generated.
 * @param fieldName Field under which each datum will be contained, defaulting
 *                  to `val`.
 */
let nextDatasetId = 0;
export function datasetFromRange(upTo: number, fieldName='val'): ramon.Dataset {
    const data = [];
    for (let i = 0; i < upTo; ++i) {
        data.push({[fieldName]: i});
    }
    return {id: String(nextDatasetId++), data};
}
