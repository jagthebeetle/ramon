export default class World<T extends ramon.Visualizable> {
    maps: {[key: string]: ramon.VisMap} = {};
    constructor(public dataset: ramon.Dataset, private ctor: new() => T) {}

    set<K extends keyof T>(key: K, fn: ramon.VisMap) {
        this.maps[key] = fn;
    }

    make<K extends keyof T>(): THREE.Object3D[] {
        return this.dataset.data.map(datum => {
            const object = new this.ctor();
            /* tslint:disable:forin */
            for (const key in this.maps) {
                object[(key as K)] = this.maps[key];
            }
            /* tslint:enable */
            return object.realize(datum);
        });
    }
}