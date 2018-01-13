import { Color } from 'three';

export function randInt(a = 0, b = 10) {
    return a + Math.floor(Math.random() * (b - a));
}


export function randomPoint(): [number, number, number] {
    return [randInt(-50, 50), randInt(-50, 50), randInt(-50, 50)];
}


export function randomScalar() {
    return randInt(0, 10);
}

export function randomColor() {
    return new Color(randInt(0x000000, 0x1000000));
}

export function toFunction<T>(x: T): () => T {
    return () => x;
}
