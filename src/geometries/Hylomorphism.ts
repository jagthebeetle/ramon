import { 
    Color,
    BufferGeometry,
    Float32BufferAttribute,
    Material
} from 'three';
import { standardizeColor } from './util';

export default abstract class Hylomorphism<M extends THREE.Material,
                                           O extends THREE.Object3D>
                              implements ramon.Body {
    geometry = new BufferGeometry();
    mesh: O;
    morphe: new(geometry: THREE.BufferGeometry, material: M) => O;
    material: M;
    primaMateria: new() => M;
    color: ramon.ColorMap;
    abstract pointMaps: ramon.PointMap[];

    getGeometryBuffers(
            data: ramon.Datum[],
            colorMap: ramon.ColorMap, 
            ...positionMaps: ramon.PointMap[]): [Float32Array, Float32Array] {
        const pointsPerObject = positionMaps.length;
        const componentsPerObject = pointsPerObject * 3;
        const bufferLength = componentsPerObject*data.length;
        const positionBuffer = new Float32Array(bufferLength);
        const colorBuffer = new Float32Array(bufferLength);
        data.forEach((datum, i) => {
            positionMaps.forEach((map, j) => {
                positionBuffer.set(
                    map(datum, i),
                    componentsPerObject*i + j*3);
            });
            const requestedColor = colorMap(datum, i);
            const color = standardizeColor(requestedColor);
            const rgb = color.toArray();
            for (let p = 0; p < pointsPerObject; ++p) {
                colorBuffer.set(rgb, componentsPerObject*i + 3*p);
            }
        });
        
        return [colorBuffer, positionBuffer];
    }

    realize(data: ramon.Datum | ramon.Datum[], i?: number) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        this.material = new this.primaMateria();
        const [colorBuffer, positionBuffer] = this.getGeometryBuffers(
                                                       data,
                                                       this.color,
                                                       ...this.pointMaps);
        this.geometry.addAttribute(
            'position',
            new Float32BufferAttribute(positionBuffer, 3));
        this.geometry.addAttribute(
            'color',
            new Float32BufferAttribute(colorBuffer, 3));
        this.mesh = new this.morphe(this.geometry, this.material);
        return this.mesh;
    }
}