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
    constructor(public width: ramon.ScalarMap=randomScalar,
                public height: ramon.ScalarMap=randomScalar,
                public depth: ramon.ScalarMap=randomScalar,
                public position: ramon.PointMap=randomVector) {
        super(BoxBufferGeometry);
    }

    get dimensions() {
        return [this.width, this.height, this.depth];
    }
}