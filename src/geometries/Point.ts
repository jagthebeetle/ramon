import {
    BufferGeometry,
    Float32BufferAttribute,
    Points,
    PointsMaterial,
    VertexColors
} from 'three';
import {randomColor} from './ColorfulObject';
import {randomVector} from './Vector';
import Visualizable from './Visualizable';

export default class Point extends Visualizable<PointsMaterial, Points>
                           implements ramon.Vector, ramon.ColorfulObject {
    constructor(public positionMap: ramon.PointMap=randomVector,
                public colorMap: ramon.ColorMap=randomColor) {
        super();
        this.primaMateria = PointsMaterial.bind(null, {vertexColors: VertexColors});
        this.morphe = Points;
        this.pointMaps = [this.positionMap];
    }
} 