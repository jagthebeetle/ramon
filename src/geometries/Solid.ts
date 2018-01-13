import Hylomorphism from "./Hylomorphism";
import { MeshBasicMaterial, Mesh } from "three";
import { randomColor } from "./util";

export default abstract class Solid<G extends THREE.BufferGeometry>
                              extends Hylomorphism<MeshBasicMaterial, Mesh> {
    dimensions: ramon.ScalarMap[] = [];
    positionMap: ramon.PointMap;
    constructor(public form: new (...dimensions: number[]) => G,
                ...dimensions: ramon.ScalarMap[]) {
        super();
        this.primaMateria = MeshBasicMaterial.bind(null, {
            color: randomColor()
        });
        this.morphe = Mesh;
    }

    realize(datum: ramon.Datum, i: number) {
        this.geometry = new this.form(
            ...this.dimensions.map((scalarMap, i) => scalarMap(datum, i))
        );
        this.material = new this.primaMateria();
        this.eidos = new this.morphe(this.geometry, this.material);
        const [x, y, z] = this.positionMap(datum, i);
        this.eidos.translateX(x);
        this.eidos.translateY(y);
        this.eidos.translateZ(z);
        return this.eidos;
    }
}