import Sphere from '../geometries/Sphere';
import { expect } from 'chai';
import { SphereBufferGeometry } from 'three';

describe('Sphere', () => {
    it('should use a SphereBufferGeometry', () => {
        const ball = new Sphere();
        ball.realize({}, 0);
        expect(ball.geometry).to.be.an.instanceOf(SphereBufferGeometry);
    });
});