import { Color } from 'three';

export function randInt(a: number, b: number) {
    return a + Math.floor(Math.random() * (b - a));
}

export function randomColor() {
    return new Color(randInt(0x000000, 0x1000000));
}
