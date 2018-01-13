import {
    BufferGeometry,
    Color,
    Float32BufferAttribute,
    LineSegments,
    LineBasicMaterial,
    VertexColors
} from 'three';
import {randomColor, randomPoint} from './util';
import Hylomorphism from './Hylomorphism';

export default class Line extends Hylomorphism<LineBasicMaterial, LineSegments>
                          implements ramon.Colorful {
    constructor(public color: ramon.ColorMap=randomColor,
                public from: ramon.PointMap=randomPoint,
                public to: ramon.PointMap=randomPoint) {
        super();
        this.hyle = LineBasicMaterial.bind(null, 
            {vertexColors: VertexColors, linewidth: 2}
        );
        this.ousia = LineSegments;
    }

    get pointMaps() {
        return [this.from, this.to];
    }
}