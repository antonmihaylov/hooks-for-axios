var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
import { useEffect, useRef, useState } from "react";
import Axios from "axios";
/**
 * Hooks up an axios instance to the component's state
 * @param {UseAxiosConfig} config the configuration for useAxios
 */
function useAxios(config) {
    var _this = this;
    if (config === void 0) { config = undefined; }
    if (!config)
        config = {};
    //Set the default axios instance if a custom one hasn't been passed in
    if (!config.axiosInstance)
        config.axiosInstance = Axios;
    var cancelTokenSource = useRef(undefined);
    var _a = useState(null), response = _a[0], setResponse = _a[1];
    var _b = useState(null), error = _b[0], setError = _b[1];
    var _c = useState(false), isLoading = _c[0], setIsLoading = _c[1];
    /**
     * Executes an axios request with the given options
     * Takes in the same arguments as Axios()
     */
    var execute = function (param1, param2) { return __awaiter(_this, void 0, void 0, function () {
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
                    cancelTokenSource.current = Axios.CancelToken.source();
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
                    if (!Axios.isCancel(e_1)) {
                        setResponse(null);
                        setError(e_1);
                    }
                    if (config.callbackOnError)
                        config.callbackOnError(e_1);
                    throw e_1; //Rethrow it so that we might do something with it down the line
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var cancel = function (message) {
        if (cancelTokenSource.current) {
            cancelTokenSource.current.cancel(message);
        }
    };
    //Automatically cancel the request if we remove the component
    useEffect(function () {
        return function () {
            var _a;
            // eslint-disable-next-line react-hooks/exhaustive-deps
            (_a = cancelTokenSource.current) === null || _a === void 0 ? void 0 : _a.cancel();
        };
    }, []);
    var firstTimeRender = useRef(true);
    if (firstTimeRender.current) {
        if (config.loadEagerly && config.defaultAxiosConfig) {
            execute(config.defaultAxiosConfig);
        }
        else if (config.loadEagerly && !config.defaultAxiosConfig) {
            console.warn("useAxios warning: Eager loading is enabled, but no default axios configuration is provided. Data will not be loaded eagerly");
        }
    }
    function reset(dontCancelRequests) {
        if (!dontCancelRequests)
            cancel();
        setResponse(undefined);
        setError(undefined);
        setIsLoading(false);
    }
    useEffect(function () {
        firstTimeRender.current = false;
    });
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
export default useAxios;
//# sourceMappingURL=useAxios.js.map