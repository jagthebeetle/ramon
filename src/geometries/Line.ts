import {
    BufferGeometry,
    Float32BufferAttribute,
    Line as LineMesh,
    LineBasicMaterial
} from 'three';
import {randomColor} from './ColorfulObject';
import {randomVector} from './Vector';

export default class Line implements ramon.Visualizable, ramon.ColorfulObject {
    material: THREE.LineBasicMaterial;
    geometry: THREE.BufferGeometry;
    line: THREE.Line;
    constructor(public colorMap: ramon.ColorMap=randomColor,
                public fromMap: ramon.PointMap=randomVector,
                public toMap: ramon.PointMap=randomVector) {}

    realize(datum: ramon.Datum) {
        this.material = new LineBasicMaterial({color: this.colorMap(datum)});
        this.geometry = new BufferGeometry();
        const positions = [];
        positions.push(...this.fromMap(datum));
        positions.push(...this.toMap(datum));
        this.geometry.addAttribute(
            'position',
            new Float32BufferAttribute(positions, 3));
        this.line = new LineMesh(this.geometry, this.material);
        return this.line;
    }
}