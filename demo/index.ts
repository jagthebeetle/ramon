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
    .set('colorMap', (d: ramon.Datum, i: number) => {
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
