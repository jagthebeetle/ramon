/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = THREE;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = randInt;
/* harmony export (immutable) */ __webpack_exports__["c"] = randomScalar;
/* harmony export (immutable) */ __webpack_exports__["b"] = randomColor;
/* harmony export (immutable) */ __webpack_exports__["d"] = toFunction;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);

function randInt(a = 0, b = 10) {
    return a + Math.floor(Math.random() * (b - a));
}
function randomScalar() {
    return randInt(0, 10);
}
function randomColor() {
    return new __WEBPACK_IMPORTED_MODULE_0_three__["Color"](randInt(0x000000, 0x1000000));
}
function toFunction(x) {
    return () => x;
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = randomVector;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);

function randomVector(datum) {
    return [Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* randInt */])(-50, 50), Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* randInt */])(-50, 50), Object(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* randInt */])(-50, 50)];
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);

class Hylomorphism {
    constructor() {
        this.geometry = new __WEBPACK_IMPORTED_MODULE_0_three__["BufferGeometry"]();
    }
    getGeometryBuffers(data, colorMap, ...positionMaps) {
        const pointsPerObject = positionMaps.length;
        const componentsPerObject = pointsPerObject * 3;
        const bufferLength = componentsPerObject * data.length;
        const positionBuffer = new Float32Array(bufferLength);
        const colorBuffer = new Float32Array(bufferLength);
        const colorCalculator = new __WEBPACK_IMPORTED_MODULE_0_three__["Color"]();
        data.forEach((datum, i) => {
            positionMaps.forEach((map, j) => {
                positionBuffer.set(map(datum, i), componentsPerObject * i + j * 3);
            });
            const requestedColor = colorMap(datum, i);
            const color = (typeof requestedColor === 'string') ?
                colorCalculator.set(requestedColor)
                : requestedColor;
            const rgb = color.toArray();
            for (let p = 0; p < pointsPerObject; ++p) {
                colorBuffer.set(rgb, componentsPerObject * i + 3 * p);
            }
        });
        return [colorBuffer, positionBuffer];
    }
    realize(data, i) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        this.material = new this.primaMateria();
        const [colorBuffer, positionBuffer] = this.getGeometryBuffers(data, this.color, ...this.pointMaps);
        this.geometry.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_0_three__["Float32BufferAttribute"](positionBuffer, 3));
        this.geometry.addAttribute('color', new __WEBPACK_IMPORTED_MODULE_0_three__["Float32BufferAttribute"](colorBuffer, 3));
        this.eidos = new this.morphe(this.geometry, this.material);
        return this.eidos;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Hylomorphism;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Hylomorphism__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);



class Solid extends __WEBPACK_IMPORTED_MODULE_0__Hylomorphism__["a" /* default */] {
    constructor(form, ...dimensions) {
        super();
        this.form = form;
        this.dimensions = [];
        this.primaMateria = __WEBPACK_IMPORTED_MODULE_1_three__["MeshBasicMaterial"].bind(null, {
            color: Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* randomColor */])()
        });
        this.morphe = __WEBPACK_IMPORTED_MODULE_1_three__["Mesh"];
    }
    realize(datum, i) {
        this.geometry = new this.form(...this.dimensions.map((scalarMap, i) => scalarMap(datum, i)));
        this.material = new this.primaMateria();
        this.eidos = new this.morphe(this.geometry, this.material);
        const [x, y, z] = this.positionMap(datum, i);
        this.eidos.translateX(x);
        this.eidos.translateY(y);
        this.eidos.translateZ(z);
        return this.eidos;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Solid;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Vector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Hylomorphism__ = __webpack_require__(3);




class Line extends __WEBPACK_IMPORTED_MODULE_3__Hylomorphism__["a" /* default */] {
    constructor(color = __WEBPACK_IMPORTED_MODULE_1__util__["b" /* randomColor */], fromMap = __WEBPACK_IMPORTED_MODULE_2__Vector__["a" /* randomVector */], toMap = __WEBPACK_IMPORTED_MODULE_2__Vector__["a" /* randomVector */]) {
        super();
        this.color = color;
        this.fromMap = fromMap;
        this.toMap = toMap;
        this.primaMateria = __WEBPACK_IMPORTED_MODULE_0_three__["LineBasicMaterial"].bind(null, { vertexColors: __WEBPACK_IMPORTED_MODULE_0_three__["VertexColors"], linewidth: 2 });
        this.morphe = __WEBPACK_IMPORTED_MODULE_0_three__["LineSegments"];
    }
    get pointMaps() {
        return [this.fromMap, this.toMap];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Line;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Vector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Hylomorphism__ = __webpack_require__(3);




class Point extends __WEBPACK_IMPORTED_MODULE_3__Hylomorphism__["a" /* default */] {
    constructor(positionMap = __WEBPACK_IMPORTED_MODULE_2__Vector__["a" /* randomVector */], color = __WEBPACK_IMPORTED_MODULE_1__util__["b" /* randomColor */]) {
        super();
        this.positionMap = positionMap;
        this.color = color;
        this.primaMateria = __WEBPACK_IMPORTED_MODULE_0_three__["PointsMaterial"].bind(null, { vertexColors: __WEBPACK_IMPORTED_MODULE_0_three__["VertexColors"] });
        this.morphe = __WEBPACK_IMPORTED_MODULE_0_three__["Points"];
    }
    get pointMaps() {
        return [this.positionMap];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Point;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_index__ = __webpack_require__(8);


// API Demo
const { scene, renderer } = Object(__WEBPACK_IMPORTED_MODULE_1__src_index__["f" /* initialize */])(document.getElementById('visualization'));
const SCALE = 20;
const POINTS = 60;
const world = new __WEBPACK_IMPORTED_MODULE_1__src_index__["d" /* World */](Object(__WEBPACK_IMPORTED_MODULE_1__src_index__["e" /* datasetFromRange */])(POINTS), __WEBPACK_IMPORTED_MODULE_1__src_index__["c" /* Sphere */])
    .set('colorMap', (d, i) => {
    return `hsl(${360 * i / POINTS}, 100%, 50%)`;
});
const visObjects = world.make();
scene.add(...visObjects);
scene.add(new __WEBPACK_IMPORTED_MODULE_0_three__["AxisHelper"](10));
const cameraSettings = new __WEBPACK_IMPORTED_MODULE_1__src_index__["a" /* CameraSettings */](60);
cameraSettings.camera.position.x = 50;
cameraSettings.activateControls({
    rotateSpeed: 2,
    panSpeed: 0.8,
    zoomSpeed: 2,
});
const time = new __WEBPACK_IMPORTED_MODULE_1__src_index__["b" /* RenderLoop */](cameraSettings, () => {
    renderer.render(scene, cameraSettings.camera);
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["f"] = initialize;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data__ = __webpack_require__(9);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_1__data__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CameraSettings__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__CameraSettings__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__geometries_Cuboid__ = __webpack_require__(12);
/* unused harmony reexport Cuboid */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__geometries_Line__ = __webpack_require__(5);
/* unused harmony reexport Line */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__geometries_Point__ = __webpack_require__(6);
/* unused harmony reexport Point */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__geometries_Sphere__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_6__geometries_Sphere__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__RenderLoop__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_7__RenderLoop__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__World__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_8__World__["a"]; });









/**
 * Initializes a scene and `WebGLRenderer`, appending the canvas element under
 * the provided `container` node.
 * @param container Container for WebGL `<canvas>`.
 */
function initialize(container = document.body) {
    const scene = new __WEBPACK_IMPORTED_MODULE_0_three__["Scene"]();
    const renderer = new __WEBPACK_IMPORTED_MODULE_0_three__["WebGLRenderer"]();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    return { scene, renderer };
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export group */
/* harmony export (immutable) */ __webpack_exports__["a"] = datasetFromRange;
/**
 * Groups `data` by: bucketing it according to `grouping.groupFields` and then
 * applying grouping.aggregateFn.
 * @param data
 * @param grouping A grouping description by which to transform data.
 */
function group(data, grouping) {
    const groups = {};
    const keyFromDatum = (d) => {
        return JSON.stringify(grouping.groupFields.map(key => d[key]));
    };
    data.forEach(datum => {
        const groupKey = keyFromDatum(datum);
        groups[groupKey] = groups[groupKey] || [];
        groups[groupKey].push(datum);
    });
    const result = [];
    const aggregateName = `${grouping.aggregateFn.name}_${grouping.aggregateField}`;
    /* tslint:disable:forin */
    for (const groupKey in groups) {
        const group = {};
        const aggregateVal = grouping.aggregateFn(groups[groupKey], grouping.aggregateField);
        const groupedVals = JSON.parse(groupKey);
        grouping.groupFields.forEach((groupField, i) => {
            group[groupField] = groupedVals[i];
        });
        group[aggregateName] = aggregateVal;
        result.push(group);
    }
    /* tslint:enable */
    return result;
}
let nextDatasetId = 0;
/**
 * Produces a dataset of integers under the optional field, up to provided
 * limit.
 * @param upTo Exclusive upper bound on data generated.
 * @param fieldName Field under which each datum will be contained, defaulting
 *                  to `val`.
 */
function datasetFromRange(upTo, fieldName = 'val') {
    const data = [];
    for (let i = 0; i < upTo; ++i) {
        data.push({ [fieldName]: i });
    }
    return { id: String(nextDatasetId++), data };
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_three_trackballcontrols__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_three_trackballcontrols___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_three_trackballcontrols__);


class CameraSettings {
    /**
     * Instantiates a `THREE.PerspectiveCamera`, matching its aspect ratio to
     * the full window; this can be overridden.
     * @param fieldOfView
     * @param aspectRatio
     * @param nearFrustum
     * @param farFrustum
     */
    constructor(fieldOfView, aspectRatio = window.innerWidth / window.innerHeight, nearFrustum, farFrustum) {
        this.camera = new __WEBPACK_IMPORTED_MODULE_0_three__["PerspectiveCamera"](fieldOfView, aspectRatio);
    }
    /**
     * Activates `TrackballControls` for this camera and passes provided
     * initialization options.
     * @param config `TrackballControls` options to set.
     */
    activateControls(config) {
        this.controls = new __WEBPACK_IMPORTED_MODULE_1_three_trackballcontrols___default.a(this.camera);
        Object.assign(this.controls, config);
    }
    /**
     * Useful for window resizes, recalculates aspect ratio and three.js
     * projection matrix.
     */
    refitWindow() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CameraSettings;



/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin 	/ http://mark-lundin.com
 * @author Simone Manini / http://daron1337.github.io
 * @author Luca Antiga 	/ http://lantiga.github.io

 ** three-trackballcontrols module
 ** @author Jon Lim / http://jonlim.ca
 */

var THREE = window.THREE || __webpack_require__(0);

var TrackballControls;
module.exports = TrackballControls = function ( object, domElement ) {

	var _this = this;
	var STATE = { NONE: - 1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };

	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;

	// API

	this.enabled = true;

	this.screen = { left: 0, top: 0, width: 0, height: 0 };

	this.rotateSpeed = 1.0;
	this.zoomSpeed = 1.2;
	this.panSpeed = 0.3;

	this.noRotate = false;
	this.noZoom = false;
	this.noPan = false;

	this.staticMoving = false;
	this.dynamicDampingFactor = 0.2;

	this.minDistance = 0;
	this.maxDistance = Infinity;

	/**
	 * `KeyboardEvent.keyCode` values which should trigger the different 
	 * interaction states. Each element can be a single code or an array
	 * of codes. All elements are required.
	 */
	this.keys = [ 65 /*A*/, 83 /*S*/, 68 /*D*/ ];

	// internals

	this.target = new THREE.Vector3();

	var EPS = 0.000001;

	var lastPosition = new THREE.Vector3();

	var _state = STATE.NONE,
	_prevState = STATE.NONE,

	_eye = new THREE.Vector3(),

	_movePrev = new THREE.Vector2(),
	_moveCurr = new THREE.Vector2(),

	_lastAxis = new THREE.Vector3(),
	_lastAngle = 0,

	_zoomStart = new THREE.Vector2(),
	_zoomEnd = new THREE.Vector2(),

	_touchZoomDistanceStart = 0,
	_touchZoomDistanceEnd = 0,

	_panStart = new THREE.Vector2(),
	_panEnd = new THREE.Vector2();

	// for reset

	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.up0 = this.object.up.clone();

	// events

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };


	// methods

	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.screen.left = 0;
			this.screen.top = 0;
			this.screen.width = window.innerWidth;
			this.screen.height = window.innerHeight;

		} else {

			var box = this.domElement.getBoundingClientRect();
			// adjustments come from similar code in the jquery offset() function
			var d = this.domElement.ownerDocument.documentElement;
			this.screen.left = box.left + window.pageXOffset - d.clientLeft;
			this.screen.top = box.top + window.pageYOffset - d.clientTop;
			this.screen.width = box.width;
			this.screen.height = box.height;

		}

	};

	this.handleEvent = function ( event ) {

		if ( typeof this[ event.type ] == 'function' ) {

			this[ event.type ]( event );

		}

	};

	var getMouseOnScreen = ( function () {

		var vector = new THREE.Vector2();

		return function getMouseOnScreen( pageX, pageY ) {

			vector.set(
				( pageX - _this.screen.left ) / _this.screen.width,
				( pageY - _this.screen.top ) / _this.screen.height
			);

			return vector;

		};

	}() );

	var getMouseOnCircle = ( function () {

		var vector = new THREE.Vector2();

		return function getMouseOnCircle( pageX, pageY ) {

			vector.set(
				( ( pageX - _this.screen.width * 0.5 - _this.screen.left ) / ( _this.screen.width * 0.5 ) ),
				( ( _this.screen.height + 2 * ( _this.screen.top - pageY ) ) / _this.screen.width ) // screen.width intentional
			);

			return vector;

		};

	}() );

	this.rotateCamera = ( function() {

		var axis = new THREE.Vector3(),
			quaternion = new THREE.Quaternion(),
			eyeDirection = new THREE.Vector3(),
			objectUpDirection = new THREE.Vector3(),
			objectSidewaysDirection = new THREE.Vector3(),
			moveDirection = new THREE.Vector3(),
			angle;

		return function rotateCamera() {

			moveDirection.set( _moveCurr.x - _movePrev.x, _moveCurr.y - _movePrev.y, 0 );
			angle = moveDirection.length();

			if ( angle ) {

				_eye.copy( _this.object.position ).sub( _this.target );

				eyeDirection.copy( _eye ).normalize();
				objectUpDirection.copy( _this.object.up ).normalize();
				objectSidewaysDirection.crossVectors( objectUpDirection, eyeDirection ).normalize();

				objectUpDirection.setLength( _moveCurr.y - _movePrev.y );
				objectSidewaysDirection.setLength( _moveCurr.x - _movePrev.x );

				moveDirection.copy( objectUpDirection.add( objectSidewaysDirection ) );

				axis.crossVectors( moveDirection, _eye ).normalize();

				angle *= _this.rotateSpeed;
				quaternion.setFromAxisAngle( axis, angle );

				_eye.applyQuaternion( quaternion );
				_this.object.up.applyQuaternion( quaternion );

				_lastAxis.copy( axis );
				_lastAngle = angle;

			} else if ( ! _this.staticMoving && _lastAngle ) {

				_lastAngle *= Math.sqrt( 1.0 - _this.dynamicDampingFactor );
				_eye.copy( _this.object.position ).sub( _this.target );
				quaternion.setFromAxisAngle( _lastAxis, _lastAngle );
				_eye.applyQuaternion( quaternion );
				_this.object.up.applyQuaternion( quaternion );

			}

			_movePrev.copy( _moveCurr );

		};

	}() );


	this.zoomCamera = function () {

		var factor;

		if ( _state === STATE.TOUCH_ZOOM_PAN ) {

			factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
			_touchZoomDistanceStart = _touchZoomDistanceEnd;
			_eye.multiplyScalar( factor );

		} else {

			factor = 1.0 + ( _zoomEnd.y - _zoomStart.y ) * _this.zoomSpeed;

			if ( factor !== 1.0 && factor > 0.0 ) {

				_eye.multiplyScalar( factor );

			}

			if ( _this.staticMoving ) {

				_zoomStart.copy( _zoomEnd );

			} else {

				_zoomStart.y += ( _zoomEnd.y - _zoomStart.y ) * this.dynamicDampingFactor;

			}

		}

	};

	this.panCamera = ( function() {

		var mouseChange = new THREE.Vector2(),
			objectUp = new THREE.Vector3(),
			pan = new THREE.Vector3();

		return function panCamera() {

			mouseChange.copy( _panEnd ).sub( _panStart );

			if ( mouseChange.lengthSq() ) {

				mouseChange.multiplyScalar( _eye.length() * _this.panSpeed );

				pan.copy( _eye ).cross( _this.object.up ).setLength( mouseChange.x );
				pan.add( objectUp.copy( _this.object.up ).setLength( mouseChange.y ) );

				_this.object.position.add( pan );
				_this.target.add( pan );

				if ( _this.staticMoving ) {

					_panStart.copy( _panEnd );

				} else {

					_panStart.add( mouseChange.subVectors( _panEnd, _panStart ).multiplyScalar( _this.dynamicDampingFactor ) );

				}

			}

		};

	}() );

	this.checkDistances = function () {

		if ( ! _this.noZoom || ! _this.noPan ) {

			if ( _eye.lengthSq() > _this.maxDistance * _this.maxDistance ) {

				_this.object.position.addVectors( _this.target, _eye.setLength( _this.maxDistance ) );
				_zoomStart.copy( _zoomEnd );

			}

			if ( _eye.lengthSq() < _this.minDistance * _this.minDistance ) {

				_this.object.position.addVectors( _this.target, _eye.setLength( _this.minDistance ) );
				_zoomStart.copy( _zoomEnd );

			}

		}

	};

	this.update = function () {

		_eye.subVectors( _this.object.position, _this.target );

		if ( ! _this.noRotate ) {

			_this.rotateCamera();

		}

		if ( ! _this.noZoom ) {

			_this.zoomCamera();

		}

		if ( ! _this.noPan ) {

			_this.panCamera();

		}

		_this.object.position.addVectors( _this.target, _eye );

		_this.checkDistances();

		_this.object.lookAt( _this.target );

		if ( lastPosition.distanceToSquared( _this.object.position ) > EPS ) {

			_this.dispatchEvent( changeEvent );

			lastPosition.copy( _this.object.position );

		}

	};

	this.reset = function () {

		_state = STATE.NONE;
		_prevState = STATE.NONE;

		_this.target.copy( _this.target0 );
		_this.object.position.copy( _this.position0 );
		_this.object.up.copy( _this.up0 );

		_eye.subVectors( _this.object.position, _this.target );

		_this.object.lookAt( _this.target );

		_this.dispatchEvent( changeEvent );

		lastPosition.copy( _this.object.position );

	};

	// helpers

	/**
	 * Checks if the pressed key is any of the configured modifier keys for
	 * a specified behavior.
	 * 
	 * @param {number | number[]} keys 
	 * @param {number} key 
	 * 
	 * @returns {boolean} `true` if `keys` contains or equals `key`
	 */
	function containsKey(keys, key) {
		if (Array.isArray(keys)) {
			return keys.indexOf(key) !== -1;
		} else {
			return keys === key;
		}
	}

	// listeners

	function keydown( event ) {

		if ( _this.enabled === false ) return;

		window.removeEventListener( 'keydown', keydown );

		_prevState = _state;

		if ( _state !== STATE.NONE ) {

			return;

		} else if ( containsKey( _this.keys[ STATE.ROTATE ], event.keyCode ) && ! _this.noRotate ) {

			_state = STATE.ROTATE;

		} else if ( containsKey( _this.keys[ STATE.ZOOM ], event.keyCode ) && ! _this.noZoom ) {

			_state = STATE.ZOOM;

		} else if ( containsKey( _this.keys[ STATE.PAN ], event.keyCode ) && ! _this.noPan ) {

			_state = STATE.PAN;

		}

	}

	function keyup( event ) {

		if ( _this.enabled === false ) return;

		_state = _prevState;

		window.addEventListener( 'keydown', keydown, false );

	}

	function mousedown( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		if ( _state === STATE.NONE ) {

			_state = event.button;

		}

		if ( _state === STATE.ROTATE && ! _this.noRotate ) {

			_moveCurr.copy( getMouseOnCircle( event.pageX, event.pageY ) );
			_movePrev.copy( _moveCurr );

		} else if ( _state === STATE.ZOOM && ! _this.noZoom ) {

			_zoomStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
			_zoomEnd.copy( _zoomStart );

		} else if ( _state === STATE.PAN && ! _this.noPan ) {

			_panStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
			_panEnd.copy( _panStart );

		}

		document.addEventListener( 'mousemove', mousemove, false );
		document.addEventListener( 'mouseup', mouseup, false );

		_this.dispatchEvent( startEvent );

	}

	function mousemove( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		if ( _state === STATE.ROTATE && ! _this.noRotate ) {

			_movePrev.copy( _moveCurr );
			_moveCurr.copy( getMouseOnCircle( event.pageX, event.pageY ) );

		} else if ( _state === STATE.ZOOM && ! _this.noZoom ) {

			_zoomEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );

		} else if ( _state === STATE.PAN && ! _this.noPan ) {

			_panEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );

		}

	}

	function mouseup( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		_state = STATE.NONE;

		document.removeEventListener( 'mousemove', mousemove );
		document.removeEventListener( 'mouseup', mouseup );
		_this.dispatchEvent( endEvent );

	}

	function mousewheel( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		switch ( event.deltaMode ) {

			case 2:
				// Zoom in pages
				_zoomStart.y -= event.deltaY * 0.025;
				break;

			case 1:
				// Zoom in lines
				_zoomStart.y -= event.deltaY * 0.01;
				break;

			default:
				// undefined, 0, assume pixels
				_zoomStart.y -= event.deltaY * 0.00025;
				break;

		}

		_this.dispatchEvent( startEvent );
		_this.dispatchEvent( endEvent );

	}

	function touchstart( event ) {

		if ( _this.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:
				_state = STATE.TOUCH_ROTATE;
				_moveCurr.copy( getMouseOnCircle( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				_movePrev.copy( _moveCurr );
				break;

			default: // 2 or more
				_state = STATE.TOUCH_ZOOM_PAN;
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				_touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt( dx * dx + dy * dy );

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panStart.copy( getMouseOnScreen( x, y ) );
				_panEnd.copy( _panStart );
				break;

		}

		_this.dispatchEvent( startEvent );

	}

	function touchmove( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		switch ( event.touches.length ) {

			case 1:
				_movePrev.copy( _moveCurr );
				_moveCurr.copy( getMouseOnCircle( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				break;

			default: // 2 or more
				var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
				var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
				_touchZoomDistanceEnd = Math.sqrt( dx * dx + dy * dy );

				var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
				var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
				_panEnd.copy( getMouseOnScreen( x, y ) );
				break;

		}

	}

	function touchend( event ) {

		if ( _this.enabled === false ) return;

		switch ( event.touches.length ) {

			case 0:
				_state = STATE.NONE;
				break;

			case 1:
				_state = STATE.TOUCH_ROTATE;
				_moveCurr.copy( getMouseOnCircle( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
				_movePrev.copy( _moveCurr );
				break;

		}

		_this.dispatchEvent( endEvent );

	}

	function contextmenu( event ) {

		if ( _this.enabled === false ) return;

		event.preventDefault();

	}

	this.dispose = function() {

		this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
		this.domElement.removeEventListener( 'mousedown', mousedown, false );
		this.domElement.removeEventListener( 'wheel', mousewheel, false );

		this.domElement.removeEventListener( 'touchstart', touchstart, false );
		this.domElement.removeEventListener( 'touchend', touchend, false );
		this.domElement.removeEventListener( 'touchmove', touchmove, false );

		document.removeEventListener( 'mousemove', mousemove, false );
		document.removeEventListener( 'mouseup', mouseup, false );

		window.removeEventListener( 'keydown', keydown, false );
		window.removeEventListener( 'keyup', keyup, false );

	};

	this.domElement.addEventListener( 'contextmenu', contextmenu, false );
	this.domElement.addEventListener( 'mousedown', mousedown, false );
	this.domElement.addEventListener( 'wheel', mousewheel, false );

	this.domElement.addEventListener( 'touchstart', touchstart, false );
	this.domElement.addEventListener( 'touchend', touchend, false );
	this.domElement.addEventListener( 'touchmove', touchmove, false );

	window.addEventListener( 'keydown', keydown, false );
	window.addEventListener( 'keyup', keyup, false );

	this.handleResize();

	// force an update at start
	this.update();

};

function preventEvent( event ) { event.preventDefault(); }

TrackballControls.prototype = Object.create( THREE.EventDispatcher.prototype );


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Solid__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Vector__ = __webpack_require__(2);




class Cuboid extends __WEBPACK_IMPORTED_MODULE_2__Solid__["a" /* default */] {
    constructor(widthMap = __WEBPACK_IMPORTED_MODULE_1__util__["c" /* randomScalar */], heightMap = __WEBPACK_IMPORTED_MODULE_1__util__["c" /* randomScalar */], depthMap = __WEBPACK_IMPORTED_MODULE_1__util__["c" /* randomScalar */], positionMap = __WEBPACK_IMPORTED_MODULE_3__Vector__["a" /* randomVector */]) {
        super(__WEBPACK_IMPORTED_MODULE_0_three__["BoxBufferGeometry"]);
        this.widthMap = widthMap;
        this.heightMap = heightMap;
        this.depthMap = depthMap;
        this.positionMap = positionMap;
    }
    get dimensions() {
        return [this.widthMap, this.heightMap, this.depthMap];
    }
}
/* unused harmony export default */



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Solid__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Vector__ = __webpack_require__(2);




class Sphere extends __WEBPACK_IMPORTED_MODULE_2__Solid__["a" /* default */] {
    constructor(radius = __WEBPACK_IMPORTED_MODULE_1__util__["c" /* randomScalar */], positionMap = __WEBPACK_IMPORTED_MODULE_3__Vector__["a" /* randomVector */]) {
        super(__WEBPACK_IMPORTED_MODULE_0_three__["SphereBufferGeometry"]);
        this.radius = radius;
        this.positionMap = positionMap;
        this.latitudeSegments = 30;
        this.longitudeSegments = 30;
    }
    get dimensions() {
        return [
            this.radius,
            Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* toFunction */])(this.latitudeSegments),
            Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* toFunction */])(this.longitudeSegments)
        ];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sphere;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class RenderLoop {
    /**
     * Sets up main animation loop. The provided `renderFn` will be called in
     * the main loop if trackball controls have not been activated; otherwise,
     * the function will be called on the trackball controls' `change` event.
     * @param cameraSettings Configured `CameraSettings` object
     * @param renderFn Function to call at each animation frame
     */
    constructor(cameraSettings, renderFn) {
        this.renderFn = cameraSettings.controls ?
            cameraSettings.controls.update :
            renderFn;
        if (cameraSettings.controls) {
            cameraSettings.controls.addEventListener('change', ({ timeStamp }) => {
                renderFn(timeStamp);
            });
            renderFn(0);
        }
        this.loop_ = (timestamp) => {
            requestAnimationFrame(this.loop_);
            this.renderFn(timestamp);
        };
        this.loop_(0);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RenderLoop;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geometries_Point__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geometries_Line__ = __webpack_require__(5);


/**
 * A `World` is a visualization configuration for a dataset. The motivating
 * principle is that all data in a particular world get rendered as a
 * particular `Visualizable` thing, according to certain functions from
 * data to the spatial/visual domain. (See [[Hylomorphism]] for all such
 * `Visualizable` classes.)
 */
class World {
    constructor(dataset, ctor) {
        this.dataset = dataset;
        this.ctor = ctor;
        /** Hash of `Visualizable` attribute to data-mapping function. */
        this.maps = {};
    }
    /**
     * Sets the mapping function for the specified visualization attribute.
     * These will be used when objects are created in order to determine their
     * final appearance.
     * @param key A key on the Visualizable class
     * @param fn The map function from data space to visualization space
     */
    set(key, fn) {
        this.maps[key] = fn;
        return this;
    }
    /**
     * After all maps have been set, create `Object3D` instance(s) and return
     * them. The invocation is different for [[Line]]s and [[Point]]s since
     * these support creating a single mesh.
     */
    make() {
        // Odd indirection required to trick TS into comparing these two.
        switch (this.ctor.prototype.constructor) {
            case __WEBPACK_IMPORTED_MODULE_0__geometries_Point__["a" /* default */]:
            case __WEBPACK_IMPORTED_MODULE_1__geometries_Line__["a" /* default */]:
                const visObject = new this.ctor();
                this.setMaps(visObject);
                return [visObject.realize(this.dataset.data)];
            default:
                return this.dataset.data.map((datum, i) => {
                    const visObject = new this.ctor();
                    this.setMaps(visObject);
                    return visObject.realize(datum, i);
                });
        }
    }
    /**
     * Sets all provided map functions onto a {@link ramon.Visualizable}
     * instance. This get called by `make()`.
     * @param visObject
     */
    setMaps(visObject) {
        /* tslint:disable:forin */
        for (const key in this.maps) {
            visObject[key] = this.maps[key];
        }
        /* tslint:enable */
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = World;



/***/ })
/******/ ]);