var __assign = (this && this.__assign) || function () {
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
import { useDebounce } from "@react-hook/debounce";
import useAxios from "./useAxios";
import { useEffect } from "react";
/**
 *
 * @param wait The amount of time in ms you want to wait after the latest request before starting a new request
 * @param config
 */
function useAxiosDebounced(wait, config) {
    var useAxiosData = useAxios(config);
    var execute = useAxiosData.execute;
    var _a = useDebounce(config.defaultAxiosConfig, wait, config.loadEagerly), requestConfig = _a[0], setRequestConfig = _a[1];
    var executeDebounced = function (param1, param2) {
        var requestConfigTemp;
        if (typeof param1 === 'string') {
            requestConfigTemp = param2 || {};
            requestConfigTemp.url = param1;
        }
        else {
            requestConfigTemp = param1 || {};
        }
        setRequestConfig(requestConfigTemp);
    };
    useEffect(function () {
        execute(requestConfig);
    }, [requestConfig]);
    return __assign(__assign({}, useAxiosData), { executeDebounced: executeDebounced });
}
export default useAxiosDebounced;
//# sourceMappingURL=useAxiosDebounced.js.map