import { Points, PointsMaterial } from 'three';
import Point from '../geometries/Point';

describe('Point', () => {
    it('should have Points as its .ousia.', () => {
        const p = new Point();
        expect(p.ousia).toBe(Points);
    });

    it('should be able to produce a PointsMaterial without arguments.', () => {
        const p = new Point();
        expect(new p.hyle()).toBeInstanceOf(PointsMaterial);
    });

    describe('.pointMaps', () => {
        it('should return [.positionMap].', () => {
            const posMap = (): [number, number, number] => [6, 7, 42];
            const p = new Point(posMap);
            const [testPosMap] = p.pointMaps;
            expect(testPosMap).toBe(posMap);
        });
    });
});
