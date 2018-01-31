import { PerspectiveCamera } from 'three';
import TrackballControls = require('three-trackballcontrols');
import CameraSettings from '../CameraSettings';

describe('CameraSettings', () => {
    it('should initialize a new PerspectiveCamera.', () => {
        const settings = new CameraSettings(75);
        expect(settings.camera).toBeInstanceOf(PerspectiveCamera);
    });

    describe('.activateControls()', () => {
        it('should set the controls to a new TrackballControls', () => {
            const settings = new CameraSettings(75);
            settings.activateControls({});
            expect(settings.controls).toBeInstanceOf(TrackballControls);
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
            const updateSpy = jest.spyOn(settings.camera,
                                          "updateProjectionMatrix");
            settings.refitWindow();
            expect(settings.camera.aspect).toBe(840 / 20);
            expect(updateSpy).toHaveBeenCalled();
        });
    });
});