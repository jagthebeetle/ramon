import {
    BufferGeometry,
    Color,
    Float32BufferAttribute,
    LineSegments,
    LineBasicMaterial,
    VertexColors
} from 'three';
import {randomColor} from './ColorfulObject';
import {randomVector} from './Vector';
import Visualizable from './Visualizable';

export default class Line extends Visualizable<LineBasicMaterial, LineSegments>
                          implements ramon.ColorfulObject {
    constructor(public colorMap: ramon.ColorMap=randomColor,
                public fromMap: ramon.PointMap=randomVector,
                public toMap: ramon.PointMap=randomVector) {
        super();
        this.primaMateria = LineBasicMaterial.bind(null, {vertexColors: VertexColors, linewidth: 2});
        this.morphe = LineSegments;
    }

    get pointMaps() {
        return [this.fromMap, this.toMap];
    }
}