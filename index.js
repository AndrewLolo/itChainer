(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["itchainer"] = factory();
	else
		root["itchainer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.chain = undefined;

	var _Pipe = __webpack_require__(1);

	var _Pipe2 = _interopRequireDefault(_Pipe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var chain = exports.chain = function chain(iterable) {
	  return new _Pipe2.default(iterable);
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Map = __webpack_require__(2);

	var _Map2 = _interopRequireDefault(_Map);

	var _Filter = __webpack_require__(3);

	var _Filter2 = _interopRequireDefault(_Filter);

	var _Reduce = __webpack_require__(4);

	var _Reduce2 = _interopRequireDefault(_Reduce);

	var _ForEach = __webpack_require__(5);

	var _ForEach2 = _interopRequireDefault(_ForEach);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _class = function () {
	    function _class(iterable) {
	        _classCallCheck(this, _class);

	        this.value = iterable;
	        this.queue = [];
	    }

	    _createClass(_class, [{
	        key: 'map',
	        value: function map() {
	            return this.append(_Map2.default, arguments);
	        }
	    }, {
	        key: 'filter',
	        value: function filter() {
	            return this.append(_Filter2.default, arguments);
	        }
	    }, {
	        key: 'forEach',
	        value: function forEach() {
	            return this.append(_ForEach2.default, arguments);
	        }
	    }, {
	        key: 'reduce',
	        value: function reduce() {
	            return this.append(_Reduce2.default, arguments);
	        }
	    }, {
	        key: 'append',
	        value: function append(method, params) {
	            var queueElement = {
	                method: method,
	                params: params
	            };
	            this.queue.push(queueElement);
	            return this;
	        }
	    }, {
	        key: 'process',
	        value: function process(queueElement, value) {
	            var method = queueElement.method.bind(this, value);
	            var params = queueElement.params;
	            return method.apply(null, params);
	        }
	    }, {
	        key: 'run',
	        value: function run() {
	            for (var i = 0; i < this.queue.length; i++) {
	                if (!this.value) {
	                    return null;
	                }
	                this.value = this.process(this.queue[i], this.value);
	            }
	            return this.value;
	        }
	    }]);

	    return _class;
	}();

	exports.default = _class;
	;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = function (array, handler) {
	    var resultArray = [];
	    if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) != 'object') {
	        throw new TypeError('Incorrect input data: not array');
	    }
	    for (var i = 0; i < array.length; ++i) {
	        resultArray.push(handler(array[i], i, array));
	    }
	    return resultArray;
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = function (array, handler) {
	    var resultArray = [];
	    if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) != 'object') {
	        throw new TypeError('Incorrect input data: not array');
	    }
	    for (var i = 0; i < array.length; ++i) {
	        if (handler(array[i], i, array)) {
	            resultArray.push(array[i]);
	        }
	    }
	    return resultArray;
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = function (array, handler) {
	    var initialValue = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	    var length = array.length;
	    if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) != 'object') {
	        throw new TypeError('Incorrect input data: not array');
	    }
	    if (length === 0) {
	        return null;
	    }
	    if (length === 1) {
	        return array[0];
	    }
	    var aggregator = initialValue;
	    for (var i = 0; i < array.length; ++i) {
	        aggregator = handler(aggregator, array[i], i, array);
	    }
	    return aggregator;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = function (array, handler) {
	    if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) != 'object') {
	        throw new TypeError('Incorrect input data: not array');
	    }
	    for (var i = 0; i < array.length; ++i) {
	        handler(array[i], i, array);
	    }
	    return array;
	};

/***/ }
/******/ ])
});
;