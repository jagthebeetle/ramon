import { Color } from 'three';

/** Random integer between a (inclusive) and b (exclusive). */
export function randInt(a = 0, b = 10) {
    return a + Math.floor(Math.random() * (b - a));
}

/** Array of three random numbers, from -50 to 49 (inclusive). */
export function randomPoint(): [number, number, number] {
    return [randInt(-50, 50), randInt(-50, 50), randInt(-50, 50)];
}

/** Random number 0-9 inclusive, for small attributes. */
export function randomScalar() {
    return randInt(0, 10);
}

/** Random THREE.Color, sampled from entire RGB space. */
export function randomColor() {
    return new Color(randInt(0x000000, 0x1000000));
}

/** Returns a function that returns the provided value. */
export function toFunction<T>(x: T): () => T {
    return () => x;
}
