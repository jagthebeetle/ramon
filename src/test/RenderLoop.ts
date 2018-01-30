import chai = require('chai');
import spies = require('chai-spies');
import CameraSettings from '../CameraSettings';
import RenderLoop from '../RenderLoop';

const {expect} = chai;
chai.use(spies);

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
        const renderSpy = chai.spy();
        const loop = new RenderLoop(settings, renderSpy);
        /* tslint:disable:no-unused-expression */
        expect(renderSpy).to.have.been.called.once;
        /* tslint:enable */
        settings.controls.dispatchEvent({type: 'change'});
        /* tslint:disable:no-unused-expression */
        expect(renderSpy).to.have.been.called.twice;
        /* tslint:enable */
    });
});
