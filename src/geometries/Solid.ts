import Hylomorphism from "./Hylomorphism";
import { Color, MeshBasicMaterial, Mesh } from "three";
import { randomColor, standardizeColor } from "./util";

export default abstract class Solid<G extends THREE.BufferGeometry>
                              extends Hylomorphism<MeshBasicMaterial, Mesh>
                              implements ramon.Vector, ramon.Colorful {
    abstract dimensions: ramon.ScalarMap[];
    abstract position: ramon.PointMap;
    /** 
     * Dummy pointMaps. Since these are only used for generating
     * BufferGeometries manually in [[Hylomorphism.realize]], and this class
     * overrides that method, this field is merely here because Hylomorphism
     * wants it.
     */
    pointMaps: ramon.PointMap[];
    constructor(public morphe: new (...dimensions: number[]) => G,
                ...dimensions: ramon.ScalarMap[]) {
        super();
        this.hyle = MeshBasicMaterial.bind(null, {
            color: randomColor()
        });
        this.ousia = Mesh;
    }

    /** @override */
    realize(datum: ramon.Datum, i: number) {
        this.geometry = new this.morphe(
            ...this.dimensions.map((scalarMap) => scalarMap(datum, i))
        );
        this.material = new this.hyle();
        if (this.color) {
            this.material.setValues({
                color: standardizeColor(this.color(datum, i))
            });
        }
        this.mesh = new this.ousia(this.geometry, this.material);
        const [x, y, z] = this.position(datum, i);
        this.mesh.translateX(x);
        this.mesh.translateY(y);
        this.mesh.translateZ(z);
        return this.mesh;
    }
}