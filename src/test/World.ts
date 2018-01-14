import { expect } from 'chai';
import { datasetFromRange, Line, World } from '../index';
import { randomColor, randomPoint, randomScalar } from '../geometries/util';
import Solid from '../geometries/Solid';
import { PlaneBufferGeometry, Mesh } from 'three';

describe('World', () => {
    describe('.set()', () => {
        it('should set the corresponding .maps key and value.', () => {
            const w = new World(datasetFromRange(3), Line);
            const pointMap = randomPoint;
            w.set('from', pointMap);
            expect(w.maps.from).to.equal(pointMap);
        });
    });

    describe('.setMaps()', () => {
        it('should set all maps that have been set so far on visObject.',
                () => {
            const w = new World(datasetFromRange(3), Line);
            const pointMap = randomPoint;
            const colorMap = randomColor;
            w.set('from', pointMap);
            w.set('color', colorMap);
            const l = new Line();
            w.setMaps(l);
            expect(l.from).to.equal(pointMap);
            expect(l.color).to.equal(colorMap);
        });
    });

    describe('.make()', () => {
        it('should make .data.length instances of ctor if ctor is a Solid, ' + 
           'passing each instance the datum and index.', () => {
            const calls: Array<[ramon.Datum, number]> = [];
            class Blob extends Solid<PlaneBufferGeometry> {
                constructor() {super(PlaneBufferGeometry);}
                position = randomPoint;
                dimensions = [randomScalar];

                realize(d: ramon.Datum, i: number) {
                    calls.push([d, i]);
                    return new Mesh();
                }
            }
            const numData = 10;
            const dataset = datasetFromRange(numData);
            const w = new World(dataset, Blob);
            const planes = w.make();
            expect(planes.length).to.equal(numData);
            for (let i = 0; i < numData; ++i) {
                const [datumArg, iArg] = calls[i];
                expect(datumArg).to.equal(dataset.data[i]);
                expect(iArg).to.equal(i);
            }
        });
    });
});
