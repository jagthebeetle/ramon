import { PerspectiveCamera } from 'three';
import TrackballControls from 'three-trackballcontrols';

export default class CameraSettings {
    camera: THREE.PerspectiveCamera;
    controls: TrackballControls;

    constructor(fieldOfView: number,
                aspectRatio=window.innerWidth/window.innerHeight,
                nearFrustum?: number,
                farFrustum?: number) {
        this.camera = new PerspectiveCamera(fieldOfView, aspectRatio);
    }

    activateControls(config: Partial<TrackballControls>) {
        this.controls = new TrackballControls(this.camera);
        Object.assign(this.controls, config);
    }

    refitWindow() {
        this.camera.aspect = window.innerWidth/window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}