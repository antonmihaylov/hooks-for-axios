import {AxiosPromise, AxiosRequestConfig} from "axios";
import useAxiosDebounced from "./useAxiosDebounced";

export interface AxiosDebouncedExecuteFunction {
    (config: AxiosRequestConfig): void;
    (url: string, config?: AxiosRequestConfig): void;
}

export interface AxiosExecuteFunction<TOut> {
    (config: AxiosRequestConfig): AxiosPromise;

    (url: string, config?: AxiosRequestConfig): AxiosPromise<TOut>;
}

export interface UseAxiosData<TOut> {
    /**
     * Executes an axios request with the given options
     * Takes in the same arguments as axios
     */
    execute: AxiosExecuteFunction<TOut>;
    data: TOut | null;
    error: any | null;
    isLoading: boolean;
    cancel: (message?: string) => void;
}

export interface UseAxiosDebouncedData<TOut> extends UseAxiosData<TOut> {
    /**
     * Will execute an request only after a certain period without request execution has passed (the wait parameter in {@link useAxiosDebounced}
     */
    executeDebounced: AxiosDebouncedExecuteFunction;
}