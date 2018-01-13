import {
    SphereBufferGeometry,
    Mesh,
    MeshBasicMaterial
} from 'three';
import {randomColor, randomScalar} from './util';
import Hylomorphism from './Hylomorphism';
import {randomVector} from './Vector';

export default class Sphere extends Hylomorphism<MeshBasicMaterial, Mesh>
                            implements ramon.Vector, ramon.ColorfulObject {
    latitudeSegments = 30;
    longitudeSegments = 30;
    constructor(public radiusMap: ramon.ScalarMap=randomScalar,
                public positionMap: ramon.PointMap=randomVector) {
        super();
        this.primaMateria = MeshBasicMaterial.bind(null, {
            color: randomColor()});
        this.morphe = Mesh;
    }

    realize(datum: ramon.Datum, i: number) {
        this.geometry = new SphereBufferGeometry(
            this.radiusMap(datum, i),
            this.longitudeSegments,
            this.latitudeSegments
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