import { PerspectiveCamera } from 'three';

export default class CameraSettings {
    camera: THREE.PerspectiveCamera;

    constructor(fieldOfView: number,
                aspectRatio=window.innerWidth/window.innerHeight,
                nearFrustum?: number,
                farFrustum?: number) {
        this.camera = new PerspectiveCamera(fieldOfView, aspectRatio);
    }

    refitWindow() {
        this.camera.aspect = window.innerWidth/window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}