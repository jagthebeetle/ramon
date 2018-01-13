import {
    SphereBufferGeometry,
    Mesh,
    MeshBasicMaterial
} from 'three';
import {randomColor, randomPoint, randomScalar, toFunction} from './util';
import Solid from './Solid';

export default class Sphere extends Solid<SphereBufferGeometry> {
    latitudeSegments = 30;
    longitudeSegments = 30;
    constructor(public radius: ramon.ScalarMap=randomScalar,
                public position: ramon.PointMap=randomPoint) {
        super(SphereBufferGeometry);
    }
    
    get dimensions() {
        return [
            this.radius, 
            toFunction(this.latitudeSegments),
            toFunction(this.longitudeSegments)
        ];
    }
}