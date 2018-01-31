import { LineSegments, LineBasicMaterial } from 'three';
import Line from '../geometries/Line';
import { randomPoint } from '../geometries/util';

describe('Line', () => {
    it('should have LineSegments as its .ousia.', () => {
        const path = new Line();
        expect(path.ousia).toBe(LineSegments);
    });
    
    it('should be able to produce a LineBasicMaterial without arguments.',
            () => {
        const path = new Line();
        expect(new path.hyle()).toBeInstanceOf(LineBasicMaterial);
    });

    describe('.pointMaps', () => {
        it('should return [.from, .to], in that order.', () => {
            const colorMap = () => '#facade';
            const fromMap = () => randomPoint();
            const toMap = () => randomPoint();
            const path = new Line(colorMap, fromMap, toMap);
            const [testFrom, testTo] = path.pointMaps;
            expect(testFrom).toBe(fromMap);
            expect(testTo).toBe(toMap);
        });
    });
});
