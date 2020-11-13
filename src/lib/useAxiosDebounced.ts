import {useDebounce} from "@react-hook/debounce";
import {UseAxiosConfig} from "lib/UseAxiosConfig";
import useAxios from "./useAxios";
import {AxiosDebouncedExecuteFunction, UseAxiosDebouncedData} from "lib/UseAxiosData";
import {useEffect} from "react";
import {AxiosRequestConfig} from "axios";

/**
 *
 * @param wait The amount of time in ms you want to wait after the latest request before starting a new request
 * @param config
 */
function useAxiosDebounced<TOut>(wait?: number, config?: UseAxiosConfig): UseAxiosDebouncedData<TOut> {
    const useAxiosData = useAxios<TOut>(config);
    const {execute} = useAxiosData;

    const [requestConfig, setRequestConfig] = useDebounce(config.defaultAxiosConfig, wait, config.loadEagerly);

    const executeDebounced: AxiosDebouncedExecuteFunction = (param1: string | AxiosRequestConfig, param2?: AxiosRequestConfig) => {
        let requestConfigTemp;
        if (typeof param1 === 'string') {
            requestConfigTemp = param2 || {};
            requestConfigTemp.url = param1;
        } else {
            requestConfigTemp = param1 || {};
        }
        setRequestConfig(requestConfigTemp);
    }

    useEffect(() => {
        execute(requestConfig);
    }, [requestConfig]);

    return {
        ...useAxiosData,
        executeDebounced
    };
}

export default useAxiosDebounced;