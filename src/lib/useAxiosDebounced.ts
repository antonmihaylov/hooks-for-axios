import {useDebounceCallback} from "@react-hook/debounce";
import {UseAxiosConfig} from "lib/UseAxiosConfig";
import useAxios from "./useAxios";
import {AxiosDebouncedExecuteFunction, UseAxiosDebouncedData} from "lib/UseAxiosData";
import {AxiosRequestConfig} from "axios";

/**
 * @param wait The amount of time in ms you want to wait after the latest request before starting a new request
 * @param config
 */
function useAxiosDebounced<TOut>(wait?: number, config?: UseAxiosConfig<TOut>): UseAxiosDebouncedData<TOut> {
    const useAxiosData = useAxios<TOut>(config);
    const {execute} = useAxiosData;

    const executeDebounced: AxiosDebouncedExecuteFunction = useDebounceCallback((param1: string | AxiosRequestConfig, param2?: AxiosRequestConfig) => {
        if (typeof param1 === "string")
            execute(param1, param2);
        else execute(param1)
    }, wait, config.loadEagerly);

    return {
        ...useAxiosData,
        executeDebounced
    };
}

export default useAxiosDebounced;