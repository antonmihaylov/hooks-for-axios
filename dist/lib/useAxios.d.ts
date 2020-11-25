import { UseAxiosData } from "../lib/UseAxiosData";
import { UseAxiosConfig } from "../lib/UseAxiosConfig";
/**
 * Hooks up an axios instance to the component's state
 * @param {UseAxiosConfig} config the configuration for useAxios
 */
declare function useAxios<TOut>(initialConfig?: UseAxiosConfig<TOut> | undefined): UseAxiosData<TOut>;
export default useAxios;
