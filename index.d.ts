// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

export as namespace ramon;

export type PrimitiveDatum = string | number | boolean;

export interface Datum {
    [field: string]: PrimitiveDatum;
}

export class Dataset {
    id: string;
    data: ramon.Datum[];
}

export interface AggregateFunction {
    (data: ramon.Datum[], aggregateField: string): ramon.PrimitiveDatum;
}

export interface Grouping {
    groupFields: string[];
    aggregateField: string;
    aggregateFn: AggregateFunction;
}
