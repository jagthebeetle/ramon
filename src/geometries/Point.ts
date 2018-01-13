import {
    BufferGeometry,
    Float32BufferAttribute,
    Points,
    PointsMaterial,
    VertexColors
} from 'three';
import {randomColor} from './util';
import {randomVector} from './Vector';
import Hylomorphism from './Hylomorphism';

export default class Point extends Hylomorphism<PointsMaterial, Points>
                           implements ramon.Vector, ramon.Colorful {
    constructor(public positionMap: ramon.PointMap=randomVector,
                public color: ramon.ColorMap=randomColor) {
        super();
        this.primaMateria = PointsMaterial.bind(null, 
            {vertexColors: VertexColors}
        );
        this.morphe = Points;
    }

    get pointMaps() {
        return [this.positionMap];
    }
} 