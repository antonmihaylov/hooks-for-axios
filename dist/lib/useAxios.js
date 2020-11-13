import { useEffect, useRef, useState } from "react";
import Axios from "axios";
/**
 * Hooks up an axios instance to the component's state
 * @param {UseAxiosConfig} config the configuration for useAxios
 */
function useAxios(config) {
    if (config === void 0) { config = undefined; }
    if (!config)
        config = {};
    //Set the default axios instance if a custom one hasn't been passed in
    if (!config.axiosInstance)
        config.axiosInstance = Axios;
    var cancelTokenSource = useRef(undefined);
    var _a = useState(null), data = _a[0], setData = _a[1];
    var _b = useState(null), error = _b[0], setError = _b[1];
    var _c = useState(false), isLoading = _c[0], setIsLoading = _c[1];
    /**
     * Executes an axios request with the given options
     * Takes in the same arguments as Axios()
     */
    var execute = function (param1, param2) {
        setIsLoading(true);
        var requestConfig;
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
        return config.axiosInstance(requestConfig)
            .then(function (r) {
            setData(r.data);
            setError(null);
            setIsLoading(false);
            return r;
        }).catch(function (e) {
            setIsLoading(false);
            if (!Axios.isCancel(e)) {
                setData(null);
                setError(e);
            }
            throw e; //Rethrow it so that we might do something with it down the line
        });
    };
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
    useEffect(function () {
        firstTimeRender.current = false;
    });
    return {
        execute: execute,
        data: data,
        error: error,
        isLoading: isLoading,
        cancel: cancel
    };
}
export default useAxios;
//# sourceMappingURL=useAxios.js.map