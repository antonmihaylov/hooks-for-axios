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
import { useDebounceCallback } from "@react-hook/debounce";
import useAxios from "./useAxios";
/**
 * @param wait The amount of time in ms you want to wait after the latest request before starting a new request
 * @param config
 */
function useAxiosDebounced(wait, config) {
    var useAxiosData = useAxios(config);
    var execute = useAxiosData.execute;
    var executeDebounced = useDebounceCallback(function (param1, param2) {
        if (typeof param1 === "string")
            execute(param1, param2);
        else
            execute(param1);
    }, wait, config.loadEagerly);
    return __assign(__assign({}, useAxiosData), { executeDebounced: executeDebounced });
}
export default useAxiosDebounced;
//# sourceMappingURL=useAxiosDebounced.js.map