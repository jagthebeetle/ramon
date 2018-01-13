import {
    BufferGeometry,
    Float32BufferAttribute,
    Points,
    PointsMaterial,
    VertexColors
} from 'three';
import {randomColor, randomPoint} from './util';
import Hylomorphism from './Hylomorphism';

export default class Point extends Hylomorphism<PointsMaterial, Points>
                           implements ramon.Vector, ramon.Colorful {
    constructor(public position: ramon.PointMap=randomPoint,
                public color: ramon.ColorMap=randomColor) {
        super();
        this.primaMateria = PointsMaterial.bind(null, 
            {vertexColors: VertexColors}
        );
        this.morphe = Points;
    }

    get pointMaps() {
        return [this.position];
    }
} 