import {
    AxisHelper, 
    Scene, PerspectiveCamera, WebGLRenderer,
    Vector3
} from 'three';
import { datasetFromRange } from './data';
import CameraSettings from './CameraSettings';
import Line from './geometries/Line';
import Point from './geometries/Point';
import World from './World';

let scene: THREE.Scene;
const cameraSettings: CameraSettings = new CameraSettings(75);
let renderer: THREE.WebGLRenderer;

function initialize(container=document.body,
                    camera: CameraSettings) {
    scene = new Scene();
    renderer = new WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}


initialize(document.getElementById('visualization'), cameraSettings);
const world = new World(datasetFromRange(10), Point);
scene.add(...world.make());
scene.add(new AxisHelper(10));
let t = 0;
const zero = new Vector3(0, 0, 0);
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, cameraSettings.camera);
    cameraSettings.camera.position.x = 70*Math.cos(t);
    cameraSettings.camera.position.y = 30;
    cameraSettings.camera.position.z = 70*Math.sin(t);
    cameraSettings.camera.lookAt(zero);
    t+= Math.PI / 100;
}

render();
