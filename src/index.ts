import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

let scene: THREE.Scene;
let camera: THREE.Camera;
let renderer: THREE.Renderer;

function initialize(container=document.body,
                    fov=75,
                    aspectRatio=window.innerWidth/window.innerHeight,) {
    scene = new Scene();
    camera = new PerspectiveCamera(fov, aspectRatio);
    renderer = new WebGLRenderer();
    container.appendChild(renderer.domElement);
}

initialize(document.getElementById('visualization'));
