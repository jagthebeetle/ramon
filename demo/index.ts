import { AxisHelper } from 'three';
import {
    initialize, 
    datasetFromRange,
    CameraSettings,
    Line,
    RenderLoop,
    World
} from "../src";
// API Demo
const {scene, renderer} = initialize(document.getElementById('visualization'));
const SCALE = 20;
const POINTS = 60;
const world = new World(datasetFromRange(POINTS), Line);
world.set('fromMap', (d: ramon.Datum): [number, number, number] => {
    const i = Number(d.val);
    return [SCALE*Math.cos(2*Math.PI*i/10),
            SCALE*Math.sin(2*Math.PI*i/10), i];
});
world.set('toMap', (d: ramon.Datum): [number, number, number] => {
    const i = Number(d.val) + 1;
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
