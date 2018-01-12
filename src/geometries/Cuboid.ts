import {
    BoxBufferGeometry,
    Mesh,
    MeshBasicMaterial
} from 'three';
import {randomScalar} from './util';
import {randomColor} from './ColorfulObject';
import Hylomorphism from './Hylomorphism';
import {randomVector} from './Vector';

export default class Cuboid extends Hylomorphism<MeshBasicMaterial, Mesh>
                           implements ramon.Vector, ramon.ColorfulObject {
    constructor(public widthMap: ramon.ScalarMap=randomScalar,
                public heightMap: ramon.ScalarMap=randomScalar,
                public depthMap: ramon.ScalarMap=randomScalar,
                public positionMap: ramon.PointMap=randomVector) {
        super();
        this.primaMateria = MeshBasicMaterial.bind(null, {
            color: randomColor()});
        this.morphe = Mesh;
    }

    realize(datum: ramon.Datum) {
        this.geometry = new BoxBufferGeometry(
            this.widthMap(datum),
            this.heightMap(datum),
            this.depthMap(datum)
        );
        this.material = new this.primaMateria();
        this.eidos = new this.morphe(this.geometry, this.material);
        const [x, y, z] = this.positionMap(datum);
        this.eidos.translateX(x);
        this.eidos.translateY(y);
        this.eidos.translateZ(z);
        return this.eidos;
    }
}