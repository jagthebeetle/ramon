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

// API Demo
initialize(document.getElementById('visualization'), cameraSettings);
const SCALE = 20;
const POINTS = 60;
const world = new World(datasetFromRange(POINTS), Point);
world.set('positionMap', (d: ramon.Datum): [number, number, number] => {
    const i = Number(d.val);
    return [SCALE*Math.cos(2*Math.PI*i/10),
            SCALE*Math.sin(2*Math.PI*i/10), i];
});
world.set('colorMap', (d: ramon.Datum) => {
    const i = Number(d.val);
    return `hsl(${360*i/POINTS}, 100%, 50%)`;
});
const visObjects = world.make();
scene.add(...visObjects);
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
