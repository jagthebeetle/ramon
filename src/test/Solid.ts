import { expect } from 'chai';
import Solid from '../geometries/Solid';
import {
    BufferGeometry,
    PlaneBufferGeometry,
    Mesh,
    MeshBasicMaterial
} from 'three';
import { randomPoint } from '../geometries/util';

class Plane extends Solid<PlaneBufferGeometry> {
    position=randomPoint;
    dimensions: ramon.ScalarMap[] = [];
}

describe('Solid', () => {
    it('should have a default .morphe of Mesh.', () => {
        const plane = new Plane(PlaneBufferGeometry);
        expect(plane.morphe).to.equal(Mesh);
    });

    it('should be able to produce a Material without arguments.', () => {
        const plane = new Plane(PlaneBufferGeometry);
        expect(new plane.primaMateria()).to.be.an.instanceOf(MeshBasicMaterial);
    });

    describe('.realize()', () => {
        it('should init Geometry with return value of each .dimensions fn,' + 
           'called in order on the provided datum.', 
                () => {
            const plane = new Plane(PlaneBufferGeometry);
            plane.dimensions = [
                (d: ramon.Datum) => (d.val as number) + 39,
                (d: ramon.Datum) => (d.val as number) * 8
            ];
            const planeBody = plane.realize({val: 3}, 0);
            /* tslint:disable:no-any */
            // Mesh.geometry doesn't seem to know what geometry was used to
            // construct it. Possible TODO on @types/three.
            const geometry = planeBody.geometry as any as PlaneBufferGeometry;
            /* tslint:enable */
            expect(geometry.parameters.width).to.equal(42);
            expect(geometry.parameters.height).to.equal(24);
        });

        it('should translate the Object3D by the `position` map', () => {
            const plane = new Plane(PlaneBufferGeometry);
            plane.position = () => [8, 6, 7];
            const planeBody = plane.realize({val: 0}, 0);
            expect(planeBody.position.toArray()).to.deep.equal([8, 6, 7]);
        });
    });
});