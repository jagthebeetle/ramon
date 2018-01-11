import CameraSettings from './CameraSettings';

export default class RenderLoop {
    private loop_: FrameRequestCallback;
    renderFn: FrameRequestCallback;
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
