import Axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

export interface UseAxiosConfig<TOut> {
    /** Provide a custom axios instance. If not set, the default {@link Axios} instance will be used */
    axiosInstance?: AxiosInstance;

    /** If this is true when you call execute if there is an unfinished request it will get cancelled  */
    cancelLastRequestOnExecute?: boolean;

    /**
     * Set this if you have any default axios configuration applied for every request.
     * Any config passed to the execute() function  will get merged with this one, with the execute config overriding this one
     */
    defaultAxiosConfig?: AxiosRequestConfig;

    /** Set this to true to fetch a request right after rendering for the first time */
    loadEagerly?: boolean;

    /** Will get called after each successful request */
    callbackOnSuccess?: (response: AxiosResponse<TOut>) => void;
    
    /** Will get called after each unsuccessful request */
    callbackOnError?: (e: any) => void;
}