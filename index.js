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

	var _Filter = __webpack_require__(5);

	var _Filter2 = _interopRequireDefault(_Filter);

	var _Reduce = __webpack_require__(6);

	var _Reduce2 = _interopRequireDefault(_Reduce);

	var _ForEach = __webpack_require__(7);

	var _ForEach2 = _interopRequireDefault(_ForEach);

	var _Sort = __webpack_require__(8);

	var _Sort2 = _interopRequireDefault(_Sort);

	var _FlowConstants = __webpack_require__(4);

	var _FlowConstants2 = _interopRequireDefault(_FlowConstants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var flows = {
	    map: _Map2.default,
	    filter: _Filter2.default,
	    reduce: _Reduce2.default,
	    forEach: _ForEach2.default,
	    sort: _Sort2.default
	};

	var flowKeys = Object.keys(flows);

	var _class = function () {
	    function _class(iterable) {
	        _classCallCheck(this, _class);

	        this.value = iterable;
	        this.queue = [];
	        this.createFlowMethods(flowKeys);
	    }

	    _createClass(_class, [{
	        key: 'createFlowMethods',
	        value: function createFlowMethods(flowKeys) {
	            var _this = this;

	            var _loop = function _loop(i) {
	                var flow = flowKeys[i];

	                if (flows[flow].type === _FlowConstants2.default.STAGED) {
	                    _this[flow] = function () {
	                        return this.appendStaged(flows[flow], arguments);
	                    };
	                } else if (flows[flow].type === _FlowConstants2.default.TERMINATOR) {
	                    _this[flow] = function () {
	                        return this.appendTerminator(flows[flow], arguments);
	                    };
	                }
	            };

	            for (var i = 0; i < flowKeys.length; ++i) {
	                _loop(i);
	            }
	        }
	    }, {
	        key: 'appendStaged',
	        value: function appendStaged(flow, params) {
	            var ctx = params[flow.ctxIndex];
	            var handler = params[flow.handlerIndex].bind(ctx);
	            var method = flow.method.bind(ctx, this.value, handler);

	            params = _Filter2.default.method(params, function (el, index) {
	                return index > flow.handlerIndex && index !== flow.ctxIndex;
	            });
	            params.length++;

	            var queueElement = {
	                method: method,
	                handler: handler,
	                params: params
	            };

	            this.queue.push(queueElement);
	            return this;
	        }
	    }, {
	        key: 'appendTerminator',
	        value: function appendTerminator(flow, params) {
	            var ctx = params[flow.ctxIndex];
	            var handler = params[flow.handlerIndex].bind(ctx);
	            var method = flow.method.bind(ctx, this.value, handler);

	            params = _Filter2.default.method(params, function (el, index) {
	                return index > flow.handlerIndex && index !== flow.ctxIndex;
	            });

	            var queueElement = {
	                method: method,
	                handler: handler,
	                params: params
	            };

	            this.queue.push(queueElement);
	            this.value = this.processQueueIteration();
	            return this;
	        }
	    }, {
	        key: 'process',
	        value: function process(queueElement, iterationIndex) {
	            var params = queueElement.params;
	            params[params.length - 1] = iterationIndex;
	            return queueElement.method.apply(null, params);
	        }
	    }, {
	        key: 'processQueueIteration',
	        value: function processQueueIteration() {
	            console.log('Process Iteration');
	            var terminator = this.queue[this.queue.length - 1];
	            for (var valueIndex = 0; valueIndex < this.value.length; ++valueIndex) {
	                for (var queueIndex = 0; queueIndex < this.queue.length - 1; ++queueIndex) {
	                    this.process(this.queue[queueIndex], valueIndex);
	                }
	            }

	            this.queue = [];
	            return terminator.method.apply(null, terminator.params);
	        }
	    }, {
	        key: 'run',
	        value: function run() {
	            return this.queue.length ? this.processQueueIteration() : this.value;
	        }
	    }]);

	    return _class;
	}();

	exports.default = _class;
	;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _BaseFlow = __webpack_require__(3);

	var _BaseFlow2 = _interopRequireDefault(_BaseFlow);

	var _FlowConstants = __webpack_require__(4);

	var _FlowConstants2 = _interopRequireDefault(_FlowConstants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var method = function method(array, handler, iterationIndex) {
	    if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) != 'object') {
	        throw new TypeError('Incorrect input data: not array');
	    }

	    array[iterationIndex] = handler(array[iterationIndex], iterationIndex, array);
	};

	var ctxIndex = _FlowConstants2.default.SECOND;
	var handlerIndex = _FlowConstants2.default.FIRST;
	var type = _FlowConstants2.default.STAGED;

	exports.default = new _BaseFlow2.default(method, ctxIndex, handlerIndex, type);

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _class = function _class(method, ctxIndex, handlerIndex, type) {
	    _classCallCheck(this, _class);

	    this.method = method;
	    this.ctxIndex = ctxIndex;
	    this.handlerIndex = handlerIndex;
	    this.type = type;
	};

	exports.default = _class;
	;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    FIRST: 0,
	    SECOND: 1,
	    THIRD: 2,
	    TERMINATOR: 0,
	    STAGED: 1
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _BaseFlow = __webpack_require__(3);

	var _BaseFlow2 = _interopRequireDefault(_BaseFlow);

	var _FlowConstants = __webpack_require__(4);

	var _FlowConstants2 = _interopRequireDefault(_FlowConstants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var method = function method(array, handler) {
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

	var ctxIndex = _FlowConstants2.default.SECOND;
	var handlerIndex = _FlowConstants2.default.FIRST;
	var type = _FlowConstants2.default.TERMINATOR;

	exports.default = new _BaseFlow2.default(method, ctxIndex, handlerIndex, type);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _BaseFlow = __webpack_require__(3);

	var _BaseFlow2 = _interopRequireDefault(_BaseFlow);

	var _FlowConstants = __webpack_require__(4);

	var _FlowConstants2 = _interopRequireDefault(_FlowConstants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var method = function method(array, handler) {
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

	var ctxIndex = _FlowConstants2.default.THIRD;
	var handlerIndex = _FlowConstants2.default.FIRST;
	var type = _FlowConstants2.default.TERMINATOR;

	exports.default = new _BaseFlow2.default(method, ctxIndex, handlerIndex, type);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _BaseFlow = __webpack_require__(3);

	var _BaseFlow2 = _interopRequireDefault(_BaseFlow);

	var _FlowConstants = __webpack_require__(4);

	var _FlowConstants2 = _interopRequireDefault(_FlowConstants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var method = function method(array, handler, iterationIndex) {
	    if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) != 'object') {
	        throw new TypeError('Incorrect input data: not array');
	    }

	    handler(array[iterationIndex], iterationIndex, array);
	};

	var ctxIndex = _FlowConstants2.default.SECOND;
	var handlerIndex = _FlowConstants2.default.FIRST;
	var type = _FlowConstants2.default.STAGED;

	exports.default = new _BaseFlow2.default(method, ctxIndex, handlerIndex, type);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _Strategies = __webpack_require__(9);

	var _Strategies2 = _interopRequireDefault(_Strategies);

	var _BaseFlow = __webpack_require__(3);

	var _BaseFlow2 = _interopRequireDefault(_BaseFlow);

	var _FlowConstants = __webpack_require__(4);

	var _FlowConstants2 = _interopRequireDefault(_FlowConstants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var method = function method(array, handler) {
	    var strategy = arguments.length <= 2 || arguments[2] === undefined ? 'quickSort' : arguments[2];

	    if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) != 'object') {
	        throw new TypeError('Incorrect input data: not array');
	    }

	    if (!_Strategies2.default.hasOwnProperty(strategy)) {
	        strategy = 'quickSort';
	    }

	    _Strategies2.default[strategy](array, handler);
	    return array;
	};

	var ctxIndex = _FlowConstants2.default.SECOND;
	var handlerIndex = _FlowConstants2.default.FIRST;
	var type = _FlowConstants2.default.TERMINATOR;

	exports.default = new _BaseFlow2.default(method, ctxIndex, handlerIndex, type);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Quicksort = __webpack_require__(10);

	exports.default = {
	    quickSort: _Quicksort.quickSort
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.quickSort = undefined;

	var _Utility = __webpack_require__(11);

	var quickSort = exports.quickSort = function quickSort(array, handler, left, right) {
	    left = left || 0;
	    right = right || array.length - 1;
	    var leftIndex = left;
	    var rightIndex = right;
	    var baseEl = array[leftIndex + rightIndex >> 1];

	    while (leftIndex <= rightIndex) {
	        while (handler(array[leftIndex], baseEl) === -1) {
	            leftIndex++;
	        }
	        while (handler(array[rightIndex], baseEl) === 1) {
	            rightIndex--;
	        }
	        if (leftIndex <= rightIndex) {
	            (0, _Utility.swap)(array, leftIndex++, rightIndex--);
	        }
	    }

	    if (left < rightIndex) {
	        quickSort(array, handler, left, rightIndex);
	    }
	    if (leftIndex < right) {
	        quickSort(array, handler, leftIndex, right);
	    }
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var swap = exports.swap = function swap(array, src, dest) {
	    var buffer = array[src];
	    array[src] = array[dest];
	    array[dest] = buffer;
	};

/***/ }
/******/ ])
});
;