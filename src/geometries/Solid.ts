import Hylomorphism from "./Hylomorphism";
import { MeshBasicMaterial, Mesh } from "three";
import { randomColor } from "./util";

export default abstract class Solid<G extends THREE.BufferGeometry>
                              extends Hylomorphism<MeshBasicMaterial, Mesh>
                              implements ramon.Vector {
    abstract dimensions: ramon.ScalarMap[];
    abstract position: ramon.PointMap;
    /** 
     * Dummy pointMaps. Since these are only used for generating
     * BufferGeometries manually in [[Hylomorphism.realize]], and this class
     * overrides that method, this field is merely here because Hylomorphism
     * wants it.
     */
    pointMaps: ramon.PointMap[];
    constructor(public form: new (...dimensions: number[]) => G,
                ...dimensions: ramon.ScalarMap[]) {
        super();
        this.primaMateria = MeshBasicMaterial.bind(null, {
            color: randomColor()
        });
        this.morphe = Mesh;
    }

    /** @override */
    realize(datum: ramon.Datum, i: number) {
        this.geometry = new this.form(
            ...this.dimensions.map((scalarMap, i) => scalarMap(datum, i))
        );
        this.material = new this.primaMateria();
        this.eidos = new this.morphe(this.geometry, this.material);
        const [x, y, z] = this.position(datum, i);
        this.eidos.translateX(x);
        this.eidos.translateY(y);
        this.eidos.translateZ(z);
        return this.eidos;
    }
}