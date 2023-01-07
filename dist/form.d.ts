declare module "debounce" {
    export default function debounce<F extends (...params: any[]) => ReturnType<F>>(fn: F, delay: number): F;
}
declare module "types" {
    import { AxiosResponse, CancelTokenSource } from 'axios';
    export type Errors = Record<string, string>;
    export type ErrorBag = Record<string, Errors>;
    export type FormDataConvertible = Array<FormDataConvertible> | Blob | FormDataEntryValue | Date | boolean | number | null | undefined;
    export enum Method {
        GET = "get",
        POST = "post",
        PUT = "put",
        PATCH = "patch",
        DELETE = "delete"
    }
    export type RequestPayload = Record<string, FormDataConvertible> | FormData;
    export interface PageProps {
        [key: string]: unknown;
    }
    export interface Page<SharedProps = PageProps> {
        component: string;
        props: PageProps & SharedProps & {
            errors: Errors & ErrorBag;
        };
        url: string;
        version: string | null;
        scrollRegions: Array<{
            top: number;
            left: number;
        }>;
        rememberedState: Record<string, unknown>;
        resolvedErrors: Errors;
    }
    export type PageResolver = (name: string) => Component;
    export type PageHandler = ({ component, page, preserveState, }: {
        component: Component;
        page: Page;
        preserveState: PreserveStateOption;
    }) => Promise<unknown>;
    export type PreserveStateOption = boolean | string | ((page: Page) => boolean);
    export type Progress = ProgressEvent & {
        percentage: number;
    };
    export type LocationVisit = {
        preserveScroll: boolean;
    };
    export type Visit = {
        method: Method;
        data: RequestPayload;
        replace: boolean;
        preserveScroll: PreserveStateOption;
        preserveState: PreserveStateOption;
        only: Array<string>;
        headers: Record<string, string>;
        errorBag: string | null;
        forceFormData: boolean;
        queryStringArrayFormat: 'indices' | 'brackets';
    };
    export type GlobalEventsMap = {
        before: {
            parameters: [PendingVisit];
            details: {
                visit: PendingVisit;
            };
            result: boolean | void;
        };
        start: {
            parameters: [PendingVisit];
            details: {
                visit: PendingVisit;
            };
            result: void;
        };
        progress: {
            parameters: [Progress | undefined];
            details: {
                progress: Progress | undefined;
            };
            result: void;
        };
        finish: {
            parameters: [ActiveVisit];
            details: {
                visit: ActiveVisit;
            };
            result: void;
        };
        cancel: {
            parameters: [];
            details: {};
            result: void;
        };
        navigate: {
            parameters: [Page];
            details: {
                page: Page;
            };
            result: void;
        };
        success: {
            parameters: [Page];
            details: {
                page: Page;
            };
            result: void;
        };
        error: {
            parameters: [Errors];
            details: {
                errors: Errors;
            };
            result: void;
        };
        invalid: {
            parameters: [AxiosResponse];
            details: {
                response: AxiosResponse;
            };
            result: boolean | void;
        };
        exception: {
            parameters: [Error];
            details: {
                exception: Error;
            };
            result: boolean | void;
        };
    };
    export type GlobalEventNames = keyof GlobalEventsMap;
    export type GlobalEvent<TEventName extends GlobalEventNames> = CustomEvent<GlobalEventDetails<TEventName>>;
    export type GlobalEventParameters<TEventName extends GlobalEventNames> = GlobalEventsMap[TEventName]['parameters'];
    export type GlobalEventResult<TEventName extends GlobalEventNames> = GlobalEventsMap[TEventName]['result'];
    export type GlobalEventDetails<TEventName extends GlobalEventNames> = GlobalEventsMap[TEventName]['details'];
    export type GlobalEventTrigger<TEventName extends GlobalEventNames> = (...params: GlobalEventParameters<TEventName>) => GlobalEventResult<TEventName>;
    export type GlobalEventCallback<TEventName extends GlobalEventNames> = (...params: GlobalEventParameters<TEventName>) => GlobalEventResult<TEventName>;
    export type VisitOptions = Partial<Visit & {
        onCancelToken: {
            ({ cancel }: {
                cancel: VoidFunction;
            }): void;
        };
        onBefore: GlobalEventCallback<'before'>;
        onStart: GlobalEventCallback<'start'>;
        onProgress: GlobalEventCallback<'progress'>;
        onFinish: GlobalEventCallback<'finish'>;
        onCancel: GlobalEventCallback<'cancel'>;
        onSuccess: GlobalEventCallback<'success'>;
        onError: GlobalEventCallback<'error'>;
    }>;
    export type PendingVisit = Visit & {
        url: URL;
        completed: boolean;
        cancelled: boolean;
        interrupted: boolean;
    };
    export type ActiveVisit = PendingVisit & Required<VisitOptions> & {
        cancelToken: CancelTokenSource;
    };
    export type VisitId = unknown;
    export type Component = unknown;
    export type InertiaAppResponse = Promise<{
        head: string[];
        body: string;
    } | void>;
    global {
        interface DocumentEventMap {
            'inertia:before': GlobalEvent<'before'>;
            'inertia:start': GlobalEvent<'start'>;
            'inertia:progress': GlobalEvent<'progress'>;
            'inertia:success': GlobalEvent<'success'>;
            'inertia:error': GlobalEvent<'error'>;
            'inertia:invalid': GlobalEvent<'invalid'>;
            'inertia:exception': GlobalEvent<'exception'>;
            'inertia:finish': GlobalEvent<'finish'>;
            'inertia:navigate': GlobalEvent<'navigate'>;
        }
    }
}
declare module "events" {
    import { GlobalEventTrigger } from "types";
    export const fireBeforeEvent: GlobalEventTrigger<'before'>;
    export const fireErrorEvent: GlobalEventTrigger<'error'>;
    export const fireExceptionEvent: GlobalEventTrigger<'exception'>;
    export const fireFinishEvent: GlobalEventTrigger<'finish'>;
    export const fireInvalidEvent: GlobalEventTrigger<'invalid'>;
    export const fireNavigateEvent: GlobalEventTrigger<'navigate'>;
    export const fireProgressEvent: GlobalEventTrigger<'progress'>;
    export const fireStartEvent: GlobalEventTrigger<'start'>;
    export const fireSuccessEvent: GlobalEventTrigger<'success'>;
}
declare module "files" {
    import { FormDataConvertible, RequestPayload } from "types";
    export function hasFiles(data: RequestPayload | FormDataConvertible): boolean;
}
declare module "formData" {
    import { FormDataConvertible } from "types";
    export function objectToFormData(source: Record<string, FormDataConvertible>, form?: FormData, parentKey?: string | null): FormData;
}
declare module "modal" {
    const _default: {
        modal: null;
        listener: null;
        show(html: Record<string, unknown> | string): void;
        hide(): void;
        hideOnEscape(event: KeyboardEvent): void;
    };
    export default _default;
}
declare module "url" {
    import { FormDataConvertible, Method } from "types";
    export function hrefToUrl(href: string | URL): URL;
    export function mergeDataIntoQueryString(method: Method, href: URL | string, data: Record<string, FormDataConvertible>, qsArrayFormat?: 'indices' | 'brackets'): [string, Record<string, FormDataConvertible>];
    export function urlWithoutHash(url: URL | Location): URL;
}
declare module "router" {
    import { AxiosResponse } from 'axios';
    import { ActiveVisit, GlobalEvent, GlobalEventNames, GlobalEventResult, LocationVisit, Page, PageHandler, PageResolver, PreserveStateOption, RequestPayload, VisitId, VisitOptions } from "types";
    export class Router {
        protected page: Page;
        protected resolveComponent: PageResolver;
        protected swapComponent: PageHandler;
        protected navigationType?: string;
        protected activeVisit?: ActiveVisit;
        protected visitId: VisitId;
        init({ initialPage, resolveComponent, swapComponent, }: {
            initialPage: Page;
            resolveComponent: PageResolver;
            swapComponent: PageHandler;
        }): void;
        protected setNavigationType(): void;
        protected clearRememberedStateOnReload(): void;
        protected handleInitialPageVisit(page: Page): void;
        protected setupEventListeners(): void;
        protected scrollRegions(): NodeListOf<Element>;
        protected handleScrollEvent(event: Event): void;
        protected saveScrollPositions(): void;
        protected resetScrollPositions(): void;
        protected restoreScrollPositions(): void;
        protected isBackForwardVisit(): boolean;
        protected handleBackForwardVisit(page: Page): void;
        protected locationVisit(url: URL, preserveScroll: LocationVisit['preserveScroll']): boolean | void;
        protected isLocationVisit(): boolean;
        protected handleLocationVisit(page: Page): void;
        protected isLocationVisitResponse(response: AxiosResponse): boolean;
        protected isInertiaResponse(response: AxiosResponse): boolean;
        protected createVisitId(): VisitId;
        protected cancelVisit(activeVisit: ActiveVisit, { cancelled, interrupted }: {
            cancelled?: boolean;
            interrupted?: boolean;
        }): void;
        protected finishVisit(visit: ActiveVisit): void;
        protected resolvePreserveOption(value: PreserveStateOption, page: Page): boolean | string;
        visit(href: string | URL, { method, data, replace, preserveScroll, preserveState, only, headers, errorBag, forceFormData, onCancelToken, onBefore, onStart, onProgress, onFinish, onCancel, onSuccess, onError, queryStringArrayFormat, }?: VisitOptions): void;
        protected setPage(page: Page, { visitId, replace, preserveScroll, preserveState, }?: {
            visitId?: VisitId;
            replace?: boolean;
            preserveScroll?: PreserveStateOption;
            preserveState?: PreserveStateOption;
        }): Promise<void>;
        protected pushState(page: Page): void;
        protected replaceState(page: Page): void;
        protected handlePopstateEvent(event: PopStateEvent): void;
        get(url: URL | string, data?: RequestPayload, options?: Exclude<VisitOptions, 'method' | 'data'>): void;
        reload(options?: Exclude<VisitOptions, 'preserveScroll' | 'preserveState'>): void;
        replace(url: URL | string, options?: Exclude<VisitOptions, 'replace'>): void;
        post(url: URL | string, data?: RequestPayload, options?: Exclude<VisitOptions, 'method' | 'data'>): void;
        put(url: URL | string, data?: RequestPayload, options?: Exclude<VisitOptions, 'method' | 'data'>): void;
        patch(url: URL | string, data?: RequestPayload, options?: Exclude<VisitOptions, 'method' | 'data'>): void;
        delete(url: URL | string, options?: Exclude<VisitOptions, 'method'>): void;
        remember(data: unknown, key?: string): void;
        restore(key?: string): unknown;
        on<TEventName extends GlobalEventNames>(type: TEventName, callback: (event: GlobalEvent<TEventName>) => GlobalEventResult<TEventName>): VoidFunction;
    }
}
declare module "progress" {
    export default function setupProgress({ delay, color, includeCSS, showSpinner, }?: {
        delay?: number | undefined;
        color?: string | undefined;
        includeCSS?: boolean | undefined;
        showSpinner?: boolean | undefined;
    }): void;
}
declare module "shouldIntercept" {
    export default function shouldIntercept(event: KeyboardEvent): boolean;
}
declare module "form" {
    import { Progress, VisitOptions } from "types";
    import { Router } from "router";
    export { default as setupProgress } from "progress";
    export { default as shouldIntercept } from "shouldIntercept";
    export * from "types";
    export { hrefToUrl, mergeDataIntoQueryString, urlWithoutHash } from "url";
    export { type Router };
    export const router: Router;
    interface InertiaFormProps<TForm extends Record<string, unknown>> {
        isDirty: boolean;
        errors: Partial<Record<keyof TForm, string>>;
        hasErrors: boolean;
        processing: boolean;
        progress: Progress | null;
        wasSuccessful: boolean;
        recentlySuccessful: boolean;
        data(): TForm;
        transform(callback: (data: TForm) => object): this;
        defaults(): this;
        defaults(field: keyof TForm, value: string): this;
        defaults(fields: Record<keyof TForm, string>): this;
        reset(...fields: (keyof TForm)[]): this;
        clearErrors(...fields: (keyof TForm)[]): this;
        setError(field: keyof TForm, value: string): this;
        setError(errors: Record<keyof TForm, string>): this;
        submit(method: string, url: string, options?: Partial<VisitOptions>): void;
        get(url: string, options?: Partial<VisitOptions>): void;
        post(url: string, options?: Partial<VisitOptions>): void;
        put(url: string, options?: Partial<VisitOptions>): void;
        patch(url: string, options?: Partial<VisitOptions>): void;
        delete(url: string, options?: Partial<VisitOptions>): void;
        cancel(): void;
    }
    type InertiaForm<TForm extends Record<string, unknown>> = TForm & InertiaFormProps<TForm>;
    export default function useForm<TForm extends Record<string, unknown>>(data: TForm): InertiaForm<TForm>;
    export default function useForm<TForm extends Record<string, unknown>>(rememberKey: string, data: TForm): InertiaForm<TForm>;
}
declare module "server" {
    import { InertiaAppResponse, Page } from "types";
    type AppCallback = (page: Page) => InertiaAppResponse;
    const _default_1: (render: AppCallback, port?: number) => void;
    export default _default_1;
}
