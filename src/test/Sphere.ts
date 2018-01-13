import Sphere from '../geometries/Sphere';
import { expect } from 'chai';
import { SphereBufferGeometry } from 'three';

describe('Sphere', () => {
    it('should use a SphereBufferGeometry', () => {
        const ball = new Sphere();
        ball.realize({}, 0);
        expect(ball.geometry).to.be.an.instanceOf(SphereBufferGeometry);
    });

    describe('.dimensions', () => {
        it('should return [.radius, toFn(.latitudeSegments), ' + 
                                   'toFn(.longitudeSegments)]', () => {
            const radiusMap = () => 3;
            const ball = new Sphere(radiusMap);
            const [testRadius, testLat, testLng] = ball.dimensions;
            expect(testRadius).to.equal(radiusMap);
            expect(testLat({}, 0)).to.equal(ball.latitudeSegments);
            expect(testLng({}, 0)).to.equal(ball.longitudeSegments);
        });
    });
});
