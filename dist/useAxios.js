(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("axios"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "axios"], factory);
	else if(typeof exports === 'object')
		exports["useAxios"] = factory(require("react"), require("axios"));
	else
		root["useAxios"] = factory(root["react"], root["axios"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__297__, __WEBPACK_EXTERNAL_MODULE__376__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 577:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ src_useAxios,
  "useAxios": () => /* reexport */ lib_useAxios,
  "useAxiosDebounced": () => /* reexport */ lib_useAxiosDebounced
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(297);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: ./src/lib/useAxios.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


/**
 * Hooks up an axios instance to the component's state
 * @param {UseAxiosConfig} config the configuration for useAxios
 */
function useAxios(initialConfig) {
    var _this = this;
    if (initialConfig === void 0) { initialConfig = undefined; }
    var configRef = (0,external_react_.useRef)(initialConfig);
    var config = configRef.current;
    if (!config)
        config = {};
    //Set the default axios instance if a custom one hasn't been passed in
    if (!config.axiosInstance)
        config.axiosInstance = (external_axios_default());
    var cancelTokenSource = (0,external_react_.useRef)(undefined);
    var _a = (0,external_react_.useState)(null), response = _a[0], setResponse = _a[1];
    var _b = (0,external_react_.useState)(null), error = _b[0], setError = _b[1];
    var _c = (0,external_react_.useState)(false), isLoading = _c[0], setIsLoading = _c[1];
    /**
     * Executes an axios request with the given options
     * Takes in the same arguments as Axios()
     */
    var execute = (0,external_react_.useCallback)(function (param1, param2) { return __awaiter(_this, void 0, void 0, function () {
        var requestConfig, r, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    if (typeof param1 === 'string') {
                        requestConfig = param2 || {};
                        requestConfig.url = param1;
                    }
                    else {
                        requestConfig = param1 || {};
                    }
                    if (config.cancelLastRequestOnExecute && cancelTokenSource.current) {
                        cancelTokenSource.current.cancel("Request cancelled because a new one was executed");
                    }
                    cancelTokenSource.current = external_axios_default().CancelToken.source();
                    requestConfig.cancelToken = cancelTokenSource.current.token;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, config.axiosInstance(requestConfig)];
                case 2:
                    r = _a.sent();
                    setResponse(r);
                    setError(null);
                    setIsLoading(false);
                    if (config.callbackOnSuccess)
                        config.callbackOnSuccess(r);
                    return [2 /*return*/, r];
                case 3:
                    e_1 = _a.sent();
                    setIsLoading(false);
                    if (!external_axios_default().isCancel(e_1)) {
                        setResponse(null);
                        setError(e_1);
                    }
                    if (config.callbackOnError)
                        config.callbackOnError(e_1);
                    throw e_1; //Rethrow it so that we might do something with it down the line
                case 4: return [2 /*return*/];
            }
        });
    }); }, [config]);
    var cancel = function (message) {
        if (cancelTokenSource.current) {
            cancelTokenSource.current.cancel(message);
        }
    };
    //Automatically cancel the request if we remove the component
    (0,external_react_.useEffect)(function () {
        return function () {
            var _a;
            // eslint-disable-next-line react-hooks/exhaustive-deps
            (_a = cancelTokenSource.current) === null || _a === void 0 ? void 0 : _a.cancel();
        };
    }, []);
    (0,external_react_.useEffect)(function () {
        if (config.loadEagerly && config.defaultAxiosConfig) {
            execute(config.defaultAxiosConfig);
        }
        else if (config.loadEagerly && !config.defaultAxiosConfig) {
            console.warn("useAxios warning: Eager loading is enabled, but no default axios configuration is provided. Data will not be loaded eagerly");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function reset(dontCancelRequests) {
        if (!dontCancelRequests)
            cancel();
        setResponse(undefined);
        setError(undefined);
        setIsLoading(false);
    }
    return {
        execute: execute,
        data: response && response.data ? response.data : null,
        response: response,
        error: error,
        isLoading: isLoading,
        cancel: cancel,
        reset: reset
    };
}
/* harmony default export */ const lib_useAxios = (useAxios);

;// CONCATENATED MODULE: ./node_modules/@react-hook/latest/dist/module/index.js


const useLatest = current => {
  const storedValue = external_react_.useRef(current);
  external_react_.useEffect(() => {
    storedValue.current = current;
  });
  return storedValue;
};

/* harmony default export */ const dist_module = (useLatest);
;// CONCATENATED MODULE: ./node_modules/@react-hook/debounce/dist/module/index.js


const useDebounceCallback = (callback, wait = 100, leading = false) => {
  const storedCallback = dist_module(callback);
  const timeout = external_react_.useRef();
  const deps = [wait, leading, storedCallback]; // Cleans up pending timeouts when the deps change

  function _ref() {
    timeout.current && clearTimeout(timeout.current);
    timeout.current = void 0;
  }

  external_react_.useEffect(() => _ref, deps);

  function _ref2() {
    timeout.current = void 0;
  }

  return external_react_.useCallback(function () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const {
      current
    } = timeout; // Calls on leading edge

    if (current === void 0 && leading) {
      timeout.current = setTimeout(_ref2, wait); // eslint-disable-next-line prefer-spread

      return storedCallback.current.apply(null, args);
    } // Clear the timeout every call and start waiting again


    current && clearTimeout(current); // Waits for `wait` before invoking the callback

    timeout.current = setTimeout(() => {
      timeout.current = void 0;
      storedCallback.current.apply(null, args);
    }, wait);
  }, deps);
};
const useDebounce = (initialState, wait, leading) => {
  const state = React.useState(initialState);
  return [state[0], useDebounceCallback(state[1], wait, leading)];
};
;// CONCATENATED MODULE: ./src/lib/useAxiosDebounced.ts
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


/**
 * @param wait The amount of time in ms you want to wait after the latest request before starting a new request
 * @param config
 */
function useAxiosDebounced(wait, config) {
    var useAxiosData = lib_useAxios(config);
    var execute = useAxiosData.execute;
    var executeDebounced = useDebounceCallback(function (param1, param2) {
        if (typeof param1 === "string")
            execute(param1, param2);
        else
            execute(param1);
    }, wait, config.loadEagerly);
    return __assign(__assign({}, useAxiosData), { executeDebounced: executeDebounced });
}
/* harmony default export */ const lib_useAxiosDebounced = (useAxiosDebounced);

;// CONCATENATED MODULE: ./src/useAxios.ts



/* harmony default export */ const src_useAxios = (lib_useAxios);


/***/ }),

/***/ 376:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__376__;

/***/ }),

/***/ 297:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__297__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(577);
/******/ })()
;
});
//# sourceMappingURL=useAxios.js.map