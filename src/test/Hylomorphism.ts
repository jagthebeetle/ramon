import { expect } from 'chai';
import { BufferGeometry, Color, MeshBasicMaterial, Mesh } from 'three';
import Hylomorphism from '../geometries/Hylomorphism';
import { datasetFromRange } from '../data';


class TestObject extends Hylomorphism<THREE.MeshBasicMaterial, THREE.Mesh> {
    color = () => '#FACADE';
    pointMaps: ramon.PointMap[] = [];
    hyle = MeshBasicMaterial;
    ousia = Mesh;
}

describe('Hylomorphism', () => {
    it('should have a default .morphe of BufferGeometry.', () => {
        const testObject = new TestObject();
        expect(testObject.morphe).to.equal(BufferGeometry);
    });

    // In the below tests, comparison should be made to Float32Arrays or else
    // chai's .closeTo assertion should be used with a domain-appropriate
    // precision, like 1/255 for normalized RGB space.
    // For terseness, Python comprehensions are used.
    describe('.getGeometryBuffers()', () => {
        it('should return 2 Float32Arrays.', () => {
            const [color,position] = new TestObject().getGeometryBuffers(
                                                datasetFromRange(3).data,
                                                ()=> '#FACADE',
                                                () => [0, 0, 0]);
            expect(color).to.be.an.instanceOf(Float32Array);
            expect(position).to.be.an.instanceOf(Float32Array);
        });

        describe('first element of return value (color buffer):', () => {
            it('should be: [Color(colorMap(d)*pointMaps.length).toArray() ' +
                           'for d in data], flattened.', () => {
                const [color1,] = new TestObject().getGeometryBuffers(
                    datasetFromRange(3).data,
                    (d: ramon.Datum)=> `#FACAD${d.val}`
                );
                /* tslint:disable:no-unused-expression */
                expect(color1).to.be.empty;
                /* tslint:enable */
                // 2 pointMaps => colorMaps will be called twice per datum.
                const [color2,] = new TestObject().getGeometryBuffers(
                    datasetFromRange(3).data,
                    (d: ramon.Datum)=> `#FACAD${d.val}`,
                    () => [0, 0, 0], () => [0, 0, 0]);
                const expected = colorsToRgbs(
                    '#FACAD0', '#FACAD0',
                    '#FACAD1', '#FACAD1',
                    '#FACAD2', '#FACAD2'
                );
                expect(color2).to.deep.equal(expected);
            });
        });
        
        describe('second element of return value (position buffer):', () => {
            it('should be: [pt(d) for pt in pointMaps for d in data], ' +
               'flattened.', () => {
                function datumToTriple(d: ramon.Datum): 
                        [number, number, number] {
                    const i = 3*Number(d.val);
                    return [i, i+1, i+2];
                }
                const [, position] = new TestObject().getGeometryBuffers(
                    datasetFromRange(3).data,
                    (d: ramon.Datum)=> `#FACADE`,
                    datumToTriple, datumToTriple);
                expect(position).to.deep.equal(new Float32Array([
                    0, 1, 2, 0, 1, 2, 3, 4, 5, 3, 4, 5, 6, 7, 8, 6, 7, 8
                ]));
            });
        });
    });

    describe('.realize()', () => {
        it('should accept a single datum.', () => {
            const testObject = new TestObject();
            testObject.pointMaps = [() => [0, 0, 0]];
            const datum = datasetFromRange(1).data[0];
            const result = testObject.realize(datum);
            expect(result).to.be.an.instanceOf(Mesh);
            expect(testObject.geometry.getAttribute('position').array.length)
                .to.equal(3);
        });
        it('should set .material to a new .hyle().', () => {
            const testObject = new TestObject();
            class FancyMaterial extends MeshBasicMaterial {}
            testObject.hyle = FancyMaterial;
            testObject.realize(datasetFromRange(3).data);
            expect(testObject.material).to.be.an.instanceOf(FancyMaterial);
        });
        it('should set the position and color attributes of .geometry.', () => {
            const testObject = new TestObject();
            testObject.color = () => '#facade';
            testObject.pointMaps = [() => [0, 0, 0]];
            testObject.realize(datasetFromRange(2).data);
            expect(testObject.geometry.getAttribute('color').array)
                .to.deep.equal(colorsToRgbs('#facade', '#facade'));
            expect(testObject.geometry.getAttribute('position').array)
                .to.deep.equal(new Float32Array([0,0,0, 0,0,0]));
        });
        it('should make an Object3D.', () => {
            const testObject = new TestObject();
            testObject.color = () => '#facade';
            testObject.pointMaps = [() => [0, 0, 0]];
            testObject.realize(datasetFromRange(1).data);
            expect(testObject.mesh).to.be.an.instanceOf(Mesh);
        });
    });
});

function colorsToRgbs(...colors: string[]): Float32Array {
    const rgbs = new Float32Array(colors.length * 3);
    colors.forEach((hexString, i) => {
        rgbs.set(new Color(hexString).toArray(), 3*i);
    });
    return rgbs;
}