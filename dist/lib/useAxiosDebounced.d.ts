import { UseAxiosConfig } from "lib/UseAxiosConfig";
import { UseAxiosDebouncedData } from "lib/UseAxiosData";
/**
 * @param wait The amount of time in ms you want to wait after the latest request before starting a new request
 * @param config
 */
declare function useAxiosDebounced<TOut>(wait?: number, config?: UseAxiosConfig): UseAxiosDebouncedData<TOut>;
export default useAxiosDebounced;
