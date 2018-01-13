import {
    SphereBufferGeometry,
    Mesh,
    MeshBasicMaterial
} from 'three';
import {randomColor, randomScalar, toFunction} from './util';
import Solid from './Solid';
import {randomVector} from './Vector';

export default class Sphere extends Solid<SphereBufferGeometry>
                            implements ramon.Vector, ramon.Colorful {
    latitudeSegments = 30;
    longitudeSegments = 30;
    constructor(public radiusMap: ramon.ScalarMap=randomScalar,
                public positionMap: ramon.PointMap=randomVector) {
        super(SphereBufferGeometry);
    }
    
    get dimensions() {
        return [
            this.radiusMap, 
            toFunction(this.latitudeSegments),
            toFunction(this.longitudeSegments)
        ];
    }
}