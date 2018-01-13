import {
    BoxBufferGeometry,
    Mesh,
    MeshBasicMaterial
} from 'three';
import {randomColor, randomScalar} from './util';
import Solid from './Solid';
import {randomVector} from './Vector';

export default class Cuboid extends Solid<BoxBufferGeometry>
                           implements ramon.Vector, ramon.Colorful {
    constructor(public widthMap: ramon.ScalarMap=randomScalar,
                public heightMap: ramon.ScalarMap=randomScalar,
                public depthMap: ramon.ScalarMap=randomScalar,
                public positionMap: ramon.PointMap=randomVector) {
        super(BoxBufferGeometry);
    }

    get dimensions() {
        return [this.widthMap, this.heightMap, this.depthMap];
    }
}