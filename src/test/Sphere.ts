import Sphere from '../geometries/Sphere';
import { SphereBufferGeometry } from 'three';

describe('Sphere', () => {
    it('should use a SphereBufferGeometry', () => {
        const ball = new Sphere();
        ball.realize({}, 0);
        expect(ball.geometry).toBeInstanceOf(SphereBufferGeometry);
    });

    describe('.dimensions', () => {
        it('should return [.radius, toFn(.latitudeSegments), ' + 
                                   'toFn(.longitudeSegments)]', () => {
            const radiusMap = () => 3;
            const ball = new Sphere(radiusMap);
            const [testRadius, testLat, testLng] = ball.dimensions;
            expect(testRadius).toBe(radiusMap);
            expect(testLat({}, 0)).toBe(ball.latitudeSegments);
            expect(testLng({}, 0)).toBe(ball.longitudeSegments);
        });
    });
});
