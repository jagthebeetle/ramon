/**
 * Groups `data` by: bucketing it according to `grouping.groupFields` and then
 * applying grouping.aggregateFn.
 * @param data
 * @param grouping A grouping description by which to transform data.
 */
export function group(data: ramon.Datum[], grouping: ramon.Grouping) {
    const groups: _GroupIntermediate = {};
    const keyFromDatum = function(d: ramon.Datum) {
        return JSON.stringify(grouping.groupFields.map(key => d[key]));
    };
    data.forEach(datum => {
        const groupKey = keyFromDatum(datum);
        groups[groupKey] = groups[groupKey] || [];
        groups[groupKey].push(datum);
    });

    const result: ramon.Datum[] = [];
    const aggregateName = `${grouping.aggregateFn.name}_${grouping.aggregateField}`;
    for (let groupKey in groups) {
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
    return result;
}

interface _GroupIntermediate {
    [domain: string]: ramon.Datum[];
}
