import { AxisHelper } from 'three';
import {
    initialize, 
    datasetFromRange,
    CameraSettings,
    Sphere,
    RenderLoop,
    World
} from "../src/index";
// API Demo
const {scene, renderer} = initialize(document.getElementById('visualization'));
const SCALE = 20;
const POINTS = 60;
const world = new World(datasetFromRange(POINTS), Sphere)
    .set('radius', () => 0.1)
    .set('position', (d: ramon.Datum, i: number): [number, number, number] => {
        return [
            10*Math.sin(4*Math.PI * i / POINTS),
            i,
            10*Math.cos(4*Math.PI * i / POINTS)
        ];
    })
    .set('color', (d: ramon.Datum, i: number) => {
        return `hsl(${360*i/POINTS}, 100%, 50%)`;
    });
const visObjects = world.make();
scene.add(...visObjects);
scene.add(new AxisHelper(10));
const cameraSettings = new CameraSettings(60);
cameraSettings.camera.position.x = 50;
cameraSettings.activateControls({
    rotateSpeed: 2,
    panSpeed: 0.8,
    zoomSpeed: 2,
});
const time = new RenderLoop(cameraSettings, () => {
    renderer.render(scene, cameraSettings.camera);
});
