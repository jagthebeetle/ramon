import {
    AxisHelper, 
    Scene, PerspectiveCamera, WebGLRenderer,
    Vector3
} from 'three';
import { datasetFromRange } from './data';
import CameraSettings from './CameraSettings';
import Line from './geometries/Line';
import Point from './geometries/Point';
import RenderLoop from './RenderLoop';
import World from './World';

let scene: THREE.Scene;
const cameraSettings: CameraSettings = new CameraSettings(75);
let renderer: THREE.WebGLRenderer;

function initialize(container=document.body) {
    scene = new Scene();
    renderer = new WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

// API Demo
initialize(document.getElementById('visualization'));
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
cameraSettings.camera.position.x = 50;
cameraSettings.activateControls({
    rotateSpeed: 2,
    panSpeed: 0.8,
    staticMoving: true,
    zoomSpeed: 2,
});
const time = new RenderLoop(cameraSettings, () => {
    renderer.render(scene, cameraSettings.camera);
});
