import { AxiosRequestConfig } from "axios";
interface TFormOpts {
    onStart?: Function;
    onCancelToken?: Function;
    onBefore?: Function;
    onSuccess?: Function;
    onError?: Function;
    onFinally?: Function;
    onProgress?: Function;
    onComplete?: Function;
    onAbort?: Function;
    onTimeout?: Function;
    onCancel?: Function;
    onUploadProgress?: Function;
    onFinish?: Function;
}
export default function useForm<TForm extends Record<string, any>>(data: TForm): import("vue").UnwrapNestedRefs<TForm & {
    isDirty: boolean;
    errors: any;
    hasErrors: boolean;
    processing: boolean;
    progress: null;
    wasSuccessful: boolean;
    recentlySuccessful: boolean;
    data(): any;
    transform(callback: Function): any;
    defaults(key: any, value: any): any;
    reset(...fields: any): any;
    setError(key: any, value: any): any;
    clearErrors(...fields: any): any;
    submit(method: string, url: string, options?: TFormOpts & AxiosRequestConfig): Promise<any>;
    get(url: string, options?: TFormOpts & AxiosRequestConfig): Promise<any>;
    post(url: string, options?: TFormOpts & AxiosRequestConfig): Promise<any>;
    put(url: string, options?: TFormOpts & AxiosRequestConfig): Promise<any>;
    patch(url: string, options?: TFormOpts & AxiosRequestConfig): Promise<any>;
    delete(url: string, options?: TFormOpts & AxiosRequestConfig): Promise<any>;
    cancel(): void;
}>;
export {};
