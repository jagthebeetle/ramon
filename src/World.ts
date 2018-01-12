import Point from './geometries/Point';
import Line from './geometries/Line';

export default class World<T extends ramon.Visualizable> {
    maps: {[key: string]: ramon.VisMap} = {};
    constructor(public dataset: ramon.Dataset, private ctor: new() => T) {}

    set<K extends keyof T>(key: K, fn: T[K]): this {
        this.maps[key] = fn;
        return this;
    }

    make(): THREE.Object3D[] {
        // Odd indirection required to trick TS into comparing these two.
        switch (this.ctor.prototype.constructor) {
            case Point:
            case Line:
                const visObject = new this.ctor();
                this.setMaps(visObject);
                return [visObject.realize(this.dataset.data)];
            default:
                return this.dataset.data.map((datum, i) => {
                    const visObject = new this.ctor();
                    this.setMaps(visObject);
                    return visObject.realize(datum, i);
                });
        }
    }

    setMaps<K extends keyof T>(visObject: T) {
        /* tslint:disable:forin */
        for (const key in this.maps) {
            visObject[(key as K)] = this.maps[key];
        }
        /* tslint:enable */
    }
}
