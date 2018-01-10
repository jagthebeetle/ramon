import {
    BufferGeometry,
    Float32BufferAttribute,
    Points
} from 'three';
import {randomColor} from './ColorfulObject';
import {randomVector} from './Vector';

export default class Point implements ramon.Visualizable, ramon.Vector, ramon.ColorfulObject {
    geometry: THREE.BufferGeometry;
    constructor(public positionMap: ramon.PointMap=randomVector,
                public colorMap: ramon.ColorMap=randomColor) {}

    realize(datum: ramon.Datum) {
        this.geometry = new BufferGeometry();
        this.geometry.addAttribute(
            'position',
            new Float32BufferAttribute(this.positionMap(datum), 3));
        return new Points(this.geometry);
    }
} 