import chai = require('chai');
import spies = require('chai-spies');
import { PerspectiveCamera } from 'three';
import TrackballControls = require('three-trackballcontrols');
import CameraSettings from '../CameraSettings';

chai.use(spies);
const expect = chai.expect;

describe('CameraSettings', () => {
    it('should initialize a new PerspectiveCamera.', () => {
        const settings = new CameraSettings(75);
        expect(settings.camera).to.be.an.instanceOf(PerspectiveCamera);
    });

    describe('.activateControls()', () => {
        it('should set the controls to a new TrackballControls', () => {
            const settings = new CameraSettings(75);
            settings.activateControls({});
            expect(settings.controls).to.be.an.instanceOf(TrackballControls);
        });
    });

    describe('.refitWindow()', () => {
        it('should set the camera\'s aspect ratio and update its projection ' +
           'matrix.', () => {
            const settings = new CameraSettings(75);
            /* tslint:disable:no-any */
            (window as any).innerWidth = 840;
            (window as any).innerHeight = 20;
            /* tslint:enable */
            const updateSpy = chai.spy.on(settings.camera,
                                          "updateProjectionMatrix");
            settings.refitWindow();
            expect(settings.camera.aspect).to.equal(840 / 20);
            expect(updateSpy).to.have.been.called();
        });
    });
});