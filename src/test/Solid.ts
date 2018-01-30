import { expect } from 'chai';
import Solid from '../geometries/Solid';
import {
    BufferGeometry,
    PlaneBufferGeometry,
    Mesh,
    MeshBasicMaterial
} from 'three';
import { randomPoint } from '../geometries/util';
import { datasetFromRange } from '../index';

class Plane extends Solid<PlaneBufferGeometry> {
    position=randomPoint;
    dimensions: ramon.ScalarMap[] = [];
}

describe('Solid', () => {
    it('should have a default .ousia of Mesh.', () => {
        const plane = new Plane(PlaneBufferGeometry);
        expect(plane.ousia).to.equal(Mesh);
    });

    it('should be able to produce a Material without arguments.', () => {
        const plane = new Plane(PlaneBufferGeometry);
        expect(new plane.hyle()).to.be.an.instanceOf(MeshBasicMaterial);
    });

    describe('.realize()', () => {
        it('should init Geometry with return value of each .dimensions fn, ' + 
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

        it('should translate the Object3D by the `position` map.', () => {
            const plane = new Plane(PlaneBufferGeometry);
            plane.position = () => [8, 6, 7];
            const planeBody = plane.realize({val: 0}, 0);
            expect(planeBody.position.toArray()).to.deep.equal([8, 6, 7]);
        });

        it('should pass the datum index to `position` maps.', () => {
            const plane = new Plane(PlaneBufferGeometry);
            const calls: number[] = [];
            plane.dimensions = [
                (d, i) => {
                    calls.push(i);
                    return i;
                },
            ];
            const planeBody = plane.realize({val: 0}, 3);
            expect(calls.length).to.equal(1);
            expect(calls[0]).to.equal(3);
        });

        it('should set material.color using .color(d, i) if present.', () => {
            const plane = new Plane(PlaneBufferGeometry);
            const result: ramon.Datum[] = [];
            plane.color = (d, i) => {
                result[i] = d;
                return '#ffffff';
            };
            const testDatum = {val: 9};
            const testIndex = 4;
            plane.realize(testDatum, testIndex);
            expect(result[testIndex]).to.equal(testDatum);
            expect(plane.material.color.getHex()).to.equal(0xffffff);
        });
    });
});