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

// Visualization Types
export interface Visualizable {
    realize(datum: ramon.Datum): THREE.Object3D;
}

export abstract class ColorfulObject {
    colorMap: ColorMap;
}
export abstract class Vector {
    positionMap: PointMap;
}

export interface ColorMap {
    (datum: ramon.Datum): string | THREE.Color;
}

export interface PointMap {
    (datum: ramon.Datum): [number, number, number];
}

type VisMap = ColorMap | PointMap;
