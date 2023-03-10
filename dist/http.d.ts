import { AxiosRequestConfig } from "axios";
export declare const remotePost: (url: string, payload: any, options?: AxiosRequestConfig) => Promise<any>;
export declare const remoteGet: (url: string, query?: any, options?: AxiosRequestConfig) => Promise<any>;
export declare const fetchAll: (path: string, options?: AxiosRequestConfig) => Promise<any>;
export declare const searchRecord: (searchTerm: any, path?: string, options?: AxiosRequestConfig) => Promise<any>;
export declare const searchRecords: (searchTerm: any, path?: string, options?: AxiosRequestConfig) => Promise<any>;
export declare const fetchRecord: (id: string | number, path?: string, options?: AxiosRequestConfig) => Promise<any>;
export declare const createRecord: (payload: any, path?: string, multipart?: boolean, options?: AxiosRequestConfig) => Promise<any>;
export declare const remotePut: (payload: any, path?: string, multipart?: boolean, options?: AxiosRequestConfig) => Promise<any>;
export declare const remotePatch: (payload: any, path?: string, multipart?: boolean, options?: AxiosRequestConfig) => Promise<any>;
export declare const deleteRecord: (id: number | string, path?: string, options?: AxiosRequestConfig) => Promise<any>;
