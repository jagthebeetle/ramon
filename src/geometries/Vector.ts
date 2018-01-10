import { randInt } from './util';

export function randomVector(datum?: ramon.Datum): [number, number, number] {
    return [randInt(-50, 50), randInt(-50, 50), randInt(-50, 50)];
}