import CameraSettings from "./src/CameraSettings";

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
    realize(datum: ramon.Datum | ramon.Datum[]): THREE.Object3D;
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

export interface ColorMap {
    (datum: ramon.Datum): string | THREE.Color;
}

export interface PointMap {
    (datum: ramon.Datum): [number, number, number];
}

export type VisMap = ColorMap | PointMap;

// Rendering Classes
export class RenderLoop {
    renderFn: FrameRequestCallback;
    new(cameraSettings: CameraSettings,
        renderFn: FrameRequestCallback): RenderLoop;
}
