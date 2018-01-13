import CameraSettings from './CameraSettings';

export default class RenderLoop {
    /** 
     * A lexically bound function that drives the main animation loop.
     */
    private loop_: FrameRequestCallback;
    /**
     * The function called during each iteration of the loop.
     */
    renderFn: FrameRequestCallback;
    /**
     * Sets up main animation loop. The provided `renderFn` will be called in
     * the main loop if trackball controls have not been activated; otherwise,
     * the function will be called on the trackball controls' `change` event.
     * @param cameraSettings Configured `CameraSettings` object
     * @param renderFn Function to call at each animation frame
     */
    constructor(cameraSettings: CameraSettings,
                renderFn: FrameRequestCallback) {
        this.renderFn = cameraSettings.controls ?
            cameraSettings.controls.update : 
            renderFn;
        if (cameraSettings.controls) {
            cameraSettings.controls.addEventListener('change', (event: Event) => {
                renderFn(event.timeStamp);
            });
            renderFn(0);
        }
        this.loop_ = (timestamp: number) => {
            requestAnimationFrame(this.loop_);
            this.renderFn(timestamp);
        };
        this.loop_(0);
    }
}
