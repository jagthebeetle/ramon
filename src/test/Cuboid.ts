import Cuboid from '../geometries/Cuboid';
import { expect } from 'chai';
import { BoxBufferGeometry } from 'three';

describe('Cuboid', () => {
    it('should use a BoxBufferGeometry.', () => {
        const box = new Cuboid();
        box.realize({}, 0);
        expect(box.geometry).to.be.an.instanceOf(BoxBufferGeometry); 
    });

    describe('.dimensions', () => {
        it('should return [.width, .height, .depth], in that order.', () => {
            function width() { return 3; }
            function height() { return 3; }
            function depth() { return 3; }
            const box = new Cuboid(width, height, depth);
            const [testW, testH, testD] = box.dimensions;
            expect(testW).to.equal(width);
            expect(testH).to.equal(height);
            expect(testD).to.equal(depth);
        });
    });
});