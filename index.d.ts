import CameraSettings from "./src/CameraSettings";

// Type definitions for ramon 1.0.0
// Project: ramon
// Definitions by: jagthebeetle https://poet.computer

export as namespace ramon;

export type PrimitiveDatum = string | number | boolean;

export interface Datum {
    [field: string]: PrimitiveDatum;
}

export class Dataset {
    id: string;
    data: ramon.Datum[];
}

export interface AggregateFunction<D extends ramon.Datum> {
    (data: D[], aggregateField: keyof D): ramon.PrimitiveDatum;
}

export interface Grouping<D extends ramon.Datum> {
    groupFields: (keyof D)[];
    aggregateField: keyof D;
    aggregateFn: AggregateFunction<D>;
}

// Visualization Types
export interface Visualizable {
    realize(datum: ramon.Datum | ramon.Datum[], i?: number): THREE.Object3D;
    geometry: THREE.BufferGeometry;
    material: THREE.Material;
    eidos: THREE.Object3D;
}

export abstract class ColorfulObject {
    colorMap: ColorMap;
}
export abstract class Vector {
    positionMap: PointMap;
}

// Hylomorphism dimension maps
export interface ColorMap {
    (datum: ramon.Datum, i: number): string | THREE.Color;
}

export interface PointMap {
    (datum: ramon.Datum, i: number): [number, number, number];
}

export interface ScalarMap {
    (datum: ramon.Datum, i: number): number;
}

export type VisMap = ColorMap | PointMap | ScalarMap;

// other three.js wrappers
export class RenderLoop {
    renderFn: FrameRequestCallback;
    new(cameraSettings: CameraSettings,
        renderFn: FrameRequestCallback): RenderLoop;
}
