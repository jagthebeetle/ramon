import { Scene, PerspectiveCamera } from 'THREE';

let scene: THREE.Scene;
let camera: THREE.Camera;
let renderer: THREE.Renderer;

function render(config) {
    const data = config.dataset.data;
}

function initialize(fov: number, aspectRatio=window.innerWidth/window.innerHeight) {
    scene = new Scene();
    camera = new PerspectiveCamera(fov, aspectRatio);
}
