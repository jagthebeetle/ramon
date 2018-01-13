import Point from './geometries/Point';
import Line from './geometries/Line';

/**
 * A `World` is a visualization configuration for a dataset. The motivating
 * principle is that all data in a particular world get rendered as a
 * particular `Body`, according to certain functions from
 * data to the spatial/visual domain. (See [[Hylomorphism]] for all such
 * `Body` classes.)
 */
export default class World<T extends ramon.Body> {
    /** Hash of `Body` attribute to data-mapping function. */
    maps: {[key: string]: ramon.VisMap} = {};
    constructor(public dataset: ramon.Dataset, private ctor: new() => T) {}

    /**
     * Sets the mapping function for the specified visualization attribute.
     * These will be used when objects are created in order to determine their
     * final appearance.
     * @param key A key on the Body class
     * @param fn The map function from data space to visualization space
     */
    set<K extends keyof T>(key: K, fn: T[K]): this {
        this.maps[key] = fn;
        return this;
    }

    /**
     * After all maps have been set, create `Object3D` instance(s) and return
     * them. The invocation is different for [[Line]]s and [[Point]]s since
     * these support creating a single mesh.
     */
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

    /**
     * Sets all provided map functions onto a ramon.Body instance. This gets
     * called by `make()`. 
     * @param visObject 
     */
    setMaps<K extends keyof T>(visObject: T) {
        /* tslint:disable:forin */
        for (const key in this.maps) {
            visObject[(key as K)] = this.maps[key];
        }
        /* tslint:enable */
    }
}
