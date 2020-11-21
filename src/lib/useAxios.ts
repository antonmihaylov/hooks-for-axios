import { useEffect, useRef, useState } from "react";
import { AxiosExecuteFunction, UseAxiosData } from "../lib/UseAxiosData";
import Axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import { UseAxiosConfig } from "../lib/UseAxiosConfig";

/**
 * Hooks up an axios instance to the component's state
 * @param {UseAxiosConfig} config the configuration for useAxios
 */
function useAxios<TOut>(config: UseAxiosConfig<TOut> | undefined = undefined): UseAxiosData<TOut> {
    if (!config)
        config = {};

    //Set the default axios instance if a custom one hasn't been passed in
    if (!config.axiosInstance)
        config.axiosInstance = Axios;

    const cancelTokenSource = useRef<CancelTokenSource | undefined>(undefined);

    const [response, setResponse] = useState<AxiosResponse<TOut> | null>(null);
    const [error, setError] = useState<any | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Executes an axios request with the given options
     * Takes in the same arguments as Axios()
     */
    const execute: AxiosExecuteFunction<TOut> = async (param1: string | AxiosRequestConfig, param2?: AxiosRequestConfig) => {
        setIsLoading(true);

        let requestConfig: AxiosRequestConfig;

        if (typeof param1 === 'string') {
            requestConfig = param2 || {};
            requestConfig.url = param1;
        } else {
            requestConfig = param1 || {};
        }

        if (config.cancelLastRequestOnExecute && cancelTokenSource.current) {
            cancelTokenSource.current.cancel("Request cancelled because a new one was executed");
        }

        cancelTokenSource.current = Axios.CancelToken.source();
        requestConfig.cancelToken = cancelTokenSource.current.token;

        try {
            const r = await config.axiosInstance(requestConfig);
            setResponse(r);
            setError(null);
            setIsLoading(false);
            if (config.callbackOnSuccess)
                config.callbackOnSuccess(r);
            return r;
        } catch (e) {
            setIsLoading(false);
            if (!Axios.isCancel(e)) {
                setResponse(null);
                setError(e);
            }

            if (config.callbackOnError)
                config.callbackOnError(e);
            throw e; //Rethrow it so that we might do something with it down the line
        }
    }

    const cancel = (message?: string) => {
        if (cancelTokenSource.current) {
            cancelTokenSource.current.cancel(message)
        }
    }

    //Automatically cancel the request if we remove the component
    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            cancelTokenSource.current?.cancel();
        }
    }, [])

    const firstTimeRender = useRef(true);

    if (firstTimeRender.current) {
        if (config.loadEagerly && config.defaultAxiosConfig) {
            execute(config.defaultAxiosConfig)
        } else if (config.loadEagerly && !config.defaultAxiosConfig) {
            console.warn("useAxios warning: Eager loading is enabled, but no default axios configuration is provided. Data will not be loaded eagerly")
        }
    }

    function reset(dontCancelRequests?: boolean) {
        if (!dontCancelRequests)
            cancel();
        setResponse(undefined);
        setError(undefined);
        setIsLoading(false);
    }

    useEffect(() => {
        firstTimeRender.current = false;
    })


    return {
        execute,
        data: response && response.data ? response.data : null,
        response,
        error,
        isLoading,
        cancel,
        reset
    }
}

export default useAxios;