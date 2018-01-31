import CameraSettings from '../CameraSettings';
import RenderLoop from '../RenderLoop';

describe('RenderLoop', () => {
    it('should begin calling renderFn in a loop.', (done) => {
        const settings = new CameraSettings(75);
        let calls = 0;
        function renderSpy(t: number) {
            if (++calls === 1) {
                cancelAnimationFrame(0);
                done();
            }
        }
        const loop = new RenderLoop(settings, renderSpy);
    });

    it('should, if controls are active, call renderFn on control.change.',
            () => {
        const settings = new CameraSettings(75);
        settings.activateControls({});
        const renderSpy = jest.fn();
        const loop = new RenderLoop(settings, renderSpy);
        expect(renderSpy).toHaveBeenCalledTimes(1);
        settings.controls.dispatchEvent({type: 'change'});
        expect(renderSpy).toHaveBeenCalledTimes(2);
    });
});
