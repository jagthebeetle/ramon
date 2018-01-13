import {
    Scene, WebGLRenderer
} from 'three';
export * from './data';
export {default as CameraSettings} from './CameraSettings';
export {default as Cuboid} from './geometries/Cuboid';
export {default as Line} from './geometries/Line';
export {default as Point} from './geometries/Point';
export {default as Sphere} from './geometries/Sphere';
export {default as RenderLoop} from './RenderLoop';
export {default as World} from './World';

/**
 * Initializes a scene and `WebGLRenderer`, appending the canvas element under
 * the provided `container` node.
 * @param container Container for WebGL `<canvas>`.
 */
export function initialize(container=document.body) {
    const scene  = new Scene();
    const renderer = new WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    return {scene, renderer};
}
