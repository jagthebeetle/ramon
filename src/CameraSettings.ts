import { PerspectiveCamera } from 'three';
import TrackballControls = require('three-trackballcontrols');

export default class CameraSettings {
    camera: THREE.PerspectiveCamera;
    /** If controls are activated, the `TrackballControls` instance. */
    controls: THREE.TrackballControls;

    /**
     * Instantiates a `THREE.PerspectiveCamera`, matching its aspect ratio to
     * the full window; this can be overridden. 
     * @param fieldOfView
     * @param aspectRatio
     * @param nearFrustum
     * @param farFrustum
     */
    constructor(fieldOfView: number,
                aspectRatio=window.innerWidth/window.innerHeight,
                nearFrustum?: number,
                farFrustum?: number) {
        this.camera = new PerspectiveCamera(fieldOfView, aspectRatio);
    }

    /**
     * Activates `TrackballControls` for this camera and passes provided
     * initialization options.
     * @param config `TrackballControls` options to set.
     */
    activateControls(config: Partial<TrackballControls>) {
        this.controls = new TrackballControls(this.camera);
        Object.assign(this.controls, config);
    }

    /**
     * Useful for window resizes, recalculates aspect ratio and three.js
     * projection matrix.
     */
    refitWindow() {
        this.camera.aspect = window.innerWidth/window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}