var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("debounce", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function debounce(fn, delay) {
        let timeoutID;
        return function (...args) {
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => fn.apply(this, args), delay);
        };
    }
    exports.default = debounce;
});
define("types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Method = void 0;
    var Method;
    (function (Method) {
        Method["GET"] = "get";
        Method["POST"] = "post";
        Method["PUT"] = "put";
        Method["PATCH"] = "patch";
        Method["DELETE"] = "delete";
    })(Method = exports.Method || (exports.Method = {}));
});
define("events", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fireSuccessEvent = exports.fireStartEvent = exports.fireProgressEvent = exports.fireNavigateEvent = exports.fireInvalidEvent = exports.fireFinishEvent = exports.fireExceptionEvent = exports.fireErrorEvent = exports.fireBeforeEvent = void 0;
    function fireEvent(name, options) {
        return document.dispatchEvent(new CustomEvent(`inertia:${name}`, options));
    }
    const fireBeforeEvent = (visit) => {
        return fireEvent('before', { cancelable: true, detail: { visit } });
    };
    exports.fireBeforeEvent = fireBeforeEvent;
    const fireErrorEvent = (errors) => {
        return fireEvent('error', { detail: { errors } });
    };
    exports.fireErrorEvent = fireErrorEvent;
    const fireExceptionEvent = (exception) => {
        return fireEvent('exception', { cancelable: true, detail: { exception } });
    };
    exports.fireExceptionEvent = fireExceptionEvent;
    const fireFinishEvent = (visit) => {
        return fireEvent('finish', { detail: { visit } });
    };
    exports.fireFinishEvent = fireFinishEvent;
    const fireInvalidEvent = (response) => {
        return fireEvent('invalid', { cancelable: true, detail: { response } });
    };
    exports.fireInvalidEvent = fireInvalidEvent;
    const fireNavigateEvent = (page) => {
        return fireEvent('navigate', { detail: { page } });
    };
    exports.fireNavigateEvent = fireNavigateEvent;
    const fireProgressEvent = (progress) => {
        return fireEvent('progress', { detail: { progress } });
    };
    exports.fireProgressEvent = fireProgressEvent;
    const fireStartEvent = (visit) => {
        return fireEvent('start', { detail: { visit } });
    };
    exports.fireStartEvent = fireStartEvent;
    const fireSuccessEvent = (page) => {
        return fireEvent('success', { detail: { page } });
    };
    exports.fireSuccessEvent = fireSuccessEvent;
});
define("files", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hasFiles = void 0;
    function hasFiles(data) {
        return (data instanceof File ||
            data instanceof Blob ||
            (data instanceof FileList && data.length > 0) ||
            (data instanceof FormData && Array.from((data).values()).some((value) => hasFiles(value))) ||
            (typeof data === 'object' && data !== null && Object.values(data).some((value) => hasFiles(value))));
    }
    exports.hasFiles = hasFiles;
});
define("formData", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.objectToFormData = void 0;
    function objectToFormData(source, form = new FormData(), parentKey = null) {
        source = source || {};
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                append(form, composeKey(parentKey, key), source[key]);
            }
        }
        return form;
    }
    exports.objectToFormData = objectToFormData;
    function composeKey(parent, key) {
        return parent ? parent + '[' + key + ']' : key;
    }
    function append(form, key, value) {
        if (Array.isArray(value)) {
            return Array.from(value.keys()).forEach((index) => append(form, composeKey(key, index.toString()), value[index]));
        }
        else if (value instanceof Date) {
            return form.append(key, value.toISOString());
        }
        else if (value instanceof File) {
            return form.append(key, value, value.name);
        }
        else if (value instanceof Blob) {
            return form.append(key, value);
        }
        else if (typeof value === 'boolean') {
            return form.append(key, value ? '1' : '0');
        }
        else if (typeof value === 'string') {
            return form.append(key, value);
        }
        else if (typeof value === 'number') {
            return form.append(key, `${value}`);
        }
        else if (value === null || value === undefined) {
            return form.append(key, '');
        }
        objectToFormData(value, form, key);
    }
});
define("modal", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        modal: null,
        listener: null,
        show(html) {
            if (typeof html === 'object') {
                html = `All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.<hr>${JSON.stringify(html)}`;
            }
            const page = document.createElement('html');
            page.innerHTML = html;
            page.querySelectorAll('a').forEach((a) => a.setAttribute('target', '_top'));
            this.modal = document.createElement('div');
            this.modal.style.position = 'fixed';
            this.modal.style.width = '100vw';
            this.modal.style.height = '100vh';
            this.modal.style.padding = '50px';
            this.modal.style.boxSizing = 'border-box';
            this.modal.style.backgroundColor = 'rgba(0, 0, 0, .6)';
            this.modal.style.zIndex = 200000;
            this.modal.addEventListener('click', () => this.hide());
            const iframe = document.createElement('iframe');
            iframe.style.backgroundColor = 'white';
            iframe.style.borderRadius = '5px';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            this.modal.appendChild(iframe);
            document.body.prepend(this.modal);
            document.body.style.overflow = 'hidden';
            if (!iframe.contentWindow) {
                throw new Error('iframe not yet ready.');
            }
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(page.outerHTML);
            iframe.contentWindow.document.close();
            this.listener = this.hideOnEscape.bind(this);
            document.addEventListener('keydown', this.listener);
        },
        hide() {
            this.modal.outerHTML = '';
            this.modal = null;
            document.body.style.overflow = 'visible';
            document.removeEventListener('keydown', this.listener);
        },
        hideOnEscape(event) {
            if (event.keyCode === 27) {
                this.hide();
            }
        },
    };
});
define("url", ["require", "exports", "deepmerge", "qs", "types"], function (require, exports, deepmerge_1, qs, types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.urlWithoutHash = exports.mergeDataIntoQueryString = exports.hrefToUrl = void 0;
    deepmerge_1 = __importDefault(deepmerge_1);
    qs = __importStar(qs);
    function hrefToUrl(href) {
        return new URL(href.toString(), window.location.toString());
    }
    exports.hrefToUrl = hrefToUrl;
    function mergeDataIntoQueryString(method, href, data, qsArrayFormat = 'brackets') {
        const hasHost = /^https?:\/\//.test(href.toString());
        const hasAbsolutePath = hasHost || href.toString().startsWith('/');
        const hasRelativePath = !hasAbsolutePath && !href.toString().startsWith('#') && !href.toString().startsWith('?');
        const hasSearch = href.toString().includes('?') || (method === types_1.Method.GET && Object.keys(data).length);
        const hasHash = href.toString().includes('#');
        const url = new URL(href.toString(), 'http://localhost');
        if (method === types_1.Method.GET && Object.keys(data).length) {
            url.search = qs.stringify((0, deepmerge_1.default)(qs.parse(url.search, { ignoreQueryPrefix: true }), data), {
                encodeValuesOnly: true,
                arrayFormat: qsArrayFormat,
            });
            data = {};
        }
        return [
            [
                hasHost ? `${url.protocol}//${url.host}` : '',
                hasAbsolutePath ? url.pathname : '',
                hasRelativePath ? url.pathname.substring(1) : '',
                hasSearch ? url.search : '',
                hasHash ? url.hash : '',
            ].join(''),
            data,
        ];
    }
    exports.mergeDataIntoQueryString = mergeDataIntoQueryString;
    function urlWithoutHash(url) {
        url = new URL(url.href);
        url.hash = '';
        return url;
    }
    exports.urlWithoutHash = urlWithoutHash;
});
define("router", ["require", "exports", "axios", "debounce", "events", "files", "formData", "modal", "types", "url"], function (require, exports, axios_1, debounce_1, events_1, files_1, formData_1, modal_1, types_2, url_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Router = void 0;
    axios_1 = __importDefault(axios_1);
    debounce_1 = __importDefault(debounce_1);
    modal_1 = __importDefault(modal_1);
    const isServer = typeof window === 'undefined';
    class Router {
        constructor() {
            this.visitId = null;
        }
        init({ initialPage, resolveComponent, swapComponent, }) {
            this.page = initialPage;
            this.resolveComponent = resolveComponent;
            this.swapComponent = swapComponent;
            this.setNavigationType();
            this.clearRememberedStateOnReload();
            if (this.isBackForwardVisit()) {
                this.handleBackForwardVisit(this.page);
            }
            else if (this.isLocationVisit()) {
                this.handleLocationVisit(this.page);
            }
            else {
                this.handleInitialPageVisit(this.page);
            }
            this.setupEventListeners();
        }
        setNavigationType() {
            this.navigationType =
                window.performance && window.performance.getEntriesByType('navigation').length > 0
                    ? window.performance.getEntriesByType('navigation')[0].type
                    : 'navigate';
        }
        clearRememberedStateOnReload() {
            var _a;
            if (this.navigationType === 'reload' && ((_a = window.history.state) === null || _a === void 0 ? void 0 : _a.rememberedState)) {
                delete window.history.state.rememberedState;
            }
        }
        handleInitialPageVisit(page) {
            this.page.url += window.location.hash;
            this.setPage(page, { preserveState: true }).then(() => (0, events_1.fireNavigateEvent)(page));
        }
        setupEventListeners() {
            window.addEventListener('popstate', this.handlePopstateEvent.bind(this));
            document.addEventListener('scroll', (0, debounce_1.default)(this.handleScrollEvent.bind(this), 100), true);
        }
        scrollRegions() {
            return document.querySelectorAll('[scroll-region]');
        }
        handleScrollEvent(event) {
            if (typeof event.target.hasAttribute === 'function' &&
                event.target.hasAttribute('scroll-region')) {
                this.saveScrollPositions();
            }
        }
        saveScrollPositions() {
            this.replaceState(Object.assign(Object.assign({}, this.page), { scrollRegions: Array.from(this.scrollRegions()).map((region) => {
                    return {
                        top: region.scrollTop,
                        left: region.scrollLeft,
                    };
                }) }));
        }
        resetScrollPositions() {
            window.scrollTo(0, 0);
            this.scrollRegions().forEach((region) => {
                if (typeof region.scrollTo === 'function') {
                    region.scrollTo(0, 0);
                }
                else {
                    region.scrollTop = 0;
                    region.scrollLeft = 0;
                }
            });
            this.saveScrollPositions();
            if (window.location.hash) {
                // We're using a setTimeout() here as a workaround for a bug in the React adapter where the
                // rendering isn't completing fast enough, causing the anchor link to not be scrolled to.
                setTimeout(() => { var _a; return (_a = document.getElementById(window.location.hash.slice(1))) === null || _a === void 0 ? void 0 : _a.scrollIntoView(); });
            }
        }
        restoreScrollPositions() {
            if (this.page.scrollRegions) {
                this.scrollRegions().forEach((region, index) => {
                    const scrollPosition = this.page.scrollRegions[index];
                    if (!scrollPosition) {
                        return;
                    }
                    else if (typeof region.scrollTo === 'function') {
                        region.scrollTo(scrollPosition.left, scrollPosition.top);
                    }
                    else {
                        region.scrollTop = scrollPosition.top;
                        region.scrollLeft = scrollPosition.left;
                    }
                });
            }
        }
        isBackForwardVisit() {
            return window.history.state && this.navigationType === 'back_forward';
        }
        handleBackForwardVisit(page) {
            window.history.state.version = page.version;
            this.setPage(window.history.state, { preserveScroll: true, preserveState: true }).then(() => {
                this.restoreScrollPositions();
                (0, events_1.fireNavigateEvent)(page);
            });
        }
        locationVisit(url, preserveScroll) {
            try {
                const locationVisit = { preserveScroll };
                window.sessionStorage.setItem('inertiaLocationVisit', JSON.stringify(locationVisit));
                window.location.href = url.href;
                if ((0, url_1.urlWithoutHash)(window.location).href === (0, url_1.urlWithoutHash)(url).href) {
                    window.location.reload();
                }
            }
            catch (error) {
                return false;
            }
        }
        isLocationVisit() {
            try {
                return window.sessionStorage.getItem('inertiaLocationVisit') !== null;
            }
            catch (error) {
                return false;
            }
        }
        handleLocationVisit(page) {
            var _a, _b, _c, _d;
            const locationVisit = JSON.parse(window.sessionStorage.getItem('inertiaLocationVisit') || '');
            window.sessionStorage.removeItem('inertiaLocationVisit');
            page.url += window.location.hash;
            page.rememberedState = (_b = (_a = window.history.state) === null || _a === void 0 ? void 0 : _a.rememberedState) !== null && _b !== void 0 ? _b : {};
            page.scrollRegions = (_d = (_c = window.history.state) === null || _c === void 0 ? void 0 : _c.scrollRegions) !== null && _d !== void 0 ? _d : [];
            this.setPage(page, { preserveScroll: locationVisit.preserveScroll, preserveState: true }).then(() => {
                if (locationVisit.preserveScroll) {
                    this.restoreScrollPositions();
                }
                (0, events_1.fireNavigateEvent)(page);
            });
        }
        isLocationVisitResponse(response) {
            return !!(response && response.status === 409 && response.headers['x-inertia-location']);
        }
        isInertiaResponse(response) {
            return !!(response === null || response === void 0 ? void 0 : response.headers['x-inertia']);
        }
        createVisitId() {
            this.visitId = {};
            return this.visitId;
        }
        cancelVisit(activeVisit, { cancelled = false, interrupted = false }) {
            if (activeVisit && !activeVisit.completed && !activeVisit.cancelled && !activeVisit.interrupted) {
                activeVisit.cancelToken.cancel();
                activeVisit.onCancel();
                activeVisit.completed = false;
                activeVisit.cancelled = cancelled;
                activeVisit.interrupted = interrupted;
                (0, events_1.fireFinishEvent)(activeVisit);
                activeVisit.onFinish(activeVisit);
            }
        }
        finishVisit(visit) {
            if (!visit.cancelled && !visit.interrupted) {
                visit.completed = true;
                visit.cancelled = false;
                visit.interrupted = false;
                (0, events_1.fireFinishEvent)(visit);
                visit.onFinish(visit);
            }
        }
        resolvePreserveOption(value, page) {
            if (typeof value === 'function') {
                return value(page);
            }
            else if (value === 'errors') {
                return Object.keys(page.props.errors || {}).length > 0;
            }
            else {
                return value;
            }
        }
        visit(href, { method = types_2.Method.GET, data = {}, replace = false, preserveScroll = false, preserveState = false, only = [], headers = {}, errorBag = '', forceFormData = false, onCancelToken = () => { }, onBefore = () => { }, onStart = () => { }, onProgress = () => { }, onFinish = () => { }, onCancel = () => { }, onSuccess = () => { }, onError = () => { }, queryStringArrayFormat = 'brackets', } = {}) {
            let url = typeof href === 'string' ? (0, url_1.hrefToUrl)(href) : href;
            if (((0, files_1.hasFiles)(data) || forceFormData) && !(data instanceof FormData)) {
                data = (0, formData_1.objectToFormData)(data);
            }
            if (!(data instanceof FormData)) {
                const [_href, _data] = (0, url_1.mergeDataIntoQueryString)(method, url, data, queryStringArrayFormat);
                url = (0, url_1.hrefToUrl)(_href);
                data = _data;
            }
            const visit = {
                url,
                method,
                data,
                replace,
                preserveScroll,
                preserveState,
                only,
                headers,
                errorBag,
                forceFormData,
                queryStringArrayFormat,
                cancelled: false,
                completed: false,
                interrupted: false,
            };
            if (onBefore(visit) === false || !(0, events_1.fireBeforeEvent)(visit)) {
                return;
            }
            if (this.activeVisit) {
                this.cancelVisit(this.activeVisit, { interrupted: true });
            }
            this.saveScrollPositions();
            const visitId = this.createVisitId();
            this.activeVisit = Object.assign(Object.assign({}, visit), { onCancelToken,
                onBefore,
                onStart,
                onProgress,
                onFinish,
                onCancel,
                onSuccess,
                onError,
                queryStringArrayFormat, cancelToken: axios_1.default.CancelToken.source() });
            onCancelToken({
                cancel: () => {
                    if (this.activeVisit) {
                        this.cancelVisit(this.activeVisit, { cancelled: true });
                    }
                },
            });
            (0, events_1.fireStartEvent)(visit);
            onStart(visit);
            (0, axios_1.default)({
                method,
                url: (0, url_1.urlWithoutHash)(url).href,
                data: method === types_2.Method.GET ? {} : data,
                params: method === types_2.Method.GET ? data : {},
                cancelToken: this.activeVisit.cancelToken.token,
                headers: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, headers), { Accept: 'text/html, application/xhtml+xml', 'X-Requested-With': 'XMLHttpRequest', 'X-Inertia': true }), (only.length
                    ? {
                        'X-Inertia-Partial-Component': this.page.component,
                        'X-Inertia-Partial-Data': only.join(','),
                    }
                    : {})), (errorBag && errorBag.length ? { 'X-Inertia-Error-Bag': errorBag } : {})), (this.page.version ? { 'X-Inertia-Version': this.page.version } : {})),
                onUploadProgress: (progress) => {
                    if (data instanceof FormData) {
                        progress.percentage = Math.round((progress.loaded / progress.total) * 100);
                        (0, events_1.fireProgressEvent)(progress);
                        onProgress(progress);
                    }
                },
            })
                .then((response) => {
                var _a;
                if (!this.isInertiaResponse(response)) {
                    return Promise.reject({ response });
                }
                const pageResponse = response.data;
                if (only.length && pageResponse.component === this.page.component) {
                    pageResponse.props = Object.assign(Object.assign({}, this.page.props), pageResponse.props);
                }
                preserveScroll = this.resolvePreserveOption(preserveScroll, pageResponse);
                preserveState = this.resolvePreserveOption(preserveState, pageResponse);
                if (preserveState && ((_a = window.history.state) === null || _a === void 0 ? void 0 : _a.rememberedState) && pageResponse.component === this.page.component) {
                    pageResponse.rememberedState = window.history.state.rememberedState;
                }
                const requestUrl = url;
                const responseUrl = (0, url_1.hrefToUrl)(pageResponse.url);
                if (requestUrl.hash && !responseUrl.hash && (0, url_1.urlWithoutHash)(requestUrl).href === responseUrl.href) {
                    responseUrl.hash = requestUrl.hash;
                    pageResponse.url = responseUrl.href;
                }
                return this.setPage(pageResponse, { visitId, replace, preserveScroll, preserveState });
            })
                .then(() => {
                const errors = this.page.props.errors || {};
                if (Object.keys(errors).length > 0) {
                    const scopedErrors = errorBag ? (errors[errorBag] ? errors[errorBag] : {}) : errors;
                    (0, events_1.fireErrorEvent)(scopedErrors);
                    return onError(scopedErrors);
                }
                (0, events_1.fireSuccessEvent)(this.page);
                return onSuccess(this.page);
            })
                .catch((error) => {
                if (this.isInertiaResponse(error.response)) {
                    return this.setPage(error.response.data, { visitId });
                }
                else if (this.isLocationVisitResponse(error.response)) {
                    const locationUrl = (0, url_1.hrefToUrl)(error.response.headers['x-inertia-location']);
                    const requestUrl = url;
                    if (requestUrl.hash && !locationUrl.hash && (0, url_1.urlWithoutHash)(requestUrl).href === locationUrl.href) {
                        locationUrl.hash = requestUrl.hash;
                    }
                    this.locationVisit(locationUrl, preserveScroll === true);
                }
                else if (error.response) {
                    if ((0, events_1.fireInvalidEvent)(error.response)) {
                        modal_1.default.show(error.response.data);
                    }
                }
                else {
                    return Promise.reject(error);
                }
            })
                .then(() => {
                if (this.activeVisit) {
                    this.finishVisit(this.activeVisit);
                }
            })
                .catch((error) => {
                if (!axios_1.default.isCancel(error)) {
                    const throwException = (0, events_1.fireExceptionEvent)(error);
                    if (this.activeVisit) {
                        this.finishVisit(this.activeVisit);
                    }
                    if (throwException) {
                        return Promise.reject(error);
                    }
                }
            });
        }
        setPage(page, { visitId = this.createVisitId(), replace = false, preserveScroll = false, preserveState = false, } = {}) {
            return Promise.resolve(this.resolveComponent(page.component)).then((component) => {
                if (visitId === this.visitId) {
                    page.scrollRegions = page.scrollRegions || [];
                    page.rememberedState = page.rememberedState || {};
                    replace = replace || (0, url_1.hrefToUrl)(page.url).href === window.location.href;
                    replace ? this.replaceState(page) : this.pushState(page);
                    this.swapComponent({ component, page, preserveState }).then(() => {
                        if (!preserveScroll) {
                            this.resetScrollPositions();
                        }
                        if (!replace) {
                            (0, events_1.fireNavigateEvent)(page);
                        }
                    });
                }
            });
        }
        pushState(page) {
            this.page = page;
            window.history.pushState(page, '', page.url);
        }
        replaceState(page) {
            this.page = page;
            window.history.replaceState(page, '', page.url);
        }
        handlePopstateEvent(event) {
            if (event.state !== null) {
                const page = event.state;
                const visitId = this.createVisitId();
                Promise.resolve(this.resolveComponent(page.component)).then((component) => {
                    if (visitId === this.visitId) {
                        this.page = page;
                        this.swapComponent({ component, page, preserveState: false }).then(() => {
                            this.restoreScrollPositions();
                            (0, events_1.fireNavigateEvent)(page);
                        });
                    }
                });
            }
            else {
                const url = (0, url_1.hrefToUrl)(this.page.url);
                url.hash = window.location.hash;
                this.replaceState(Object.assign(Object.assign({}, this.page), { url: url.href }));
                this.resetScrollPositions();
            }
        }
        get(url, data = {}, options = {}) {
            return this.visit(url, Object.assign(Object.assign({}, options), { method: types_2.Method.GET, data }));
        }
        reload(options = {}) {
            return this.visit(window.location.href, Object.assign(Object.assign({}, options), { preserveScroll: true, preserveState: true }));
        }
        replace(url, options = {}) {
            var _a;
            console.warn(`Inertia.replace() has been deprecated and will be removed in a future release. Please use Inertia.${(_a = options.method) !== null && _a !== void 0 ? _a : 'get'}() instead.`);
            return this.visit(url, Object.assign(Object.assign({ preserveState: true }, options), { replace: true }));
        }
        post(url, data = {}, options = {}) {
            return this.visit(url, Object.assign(Object.assign({ preserveState: true }, options), { method: types_2.Method.POST, data }));
        }
        put(url, data = {}, options = {}) {
            return this.visit(url, Object.assign(Object.assign({ preserveState: true }, options), { method: types_2.Method.PUT, data }));
        }
        patch(url, data = {}, options = {}) {
            return this.visit(url, Object.assign(Object.assign({ preserveState: true }, options), { method: types_2.Method.PATCH, data }));
        }
        delete(url, options = {}) {
            return this.visit(url, Object.assign(Object.assign({ preserveState: true }, options), { method: types_2.Method.DELETE }));
        }
        remember(data, key = 'default') {
            var _a;
            if (isServer) {
                return;
            }
            this.replaceState(Object.assign(Object.assign({}, this.page), { rememberedState: Object.assign(Object.assign({}, (_a = this.page) === null || _a === void 0 ? void 0 : _a.rememberedState), { [key]: data }) }));
        }
        restore(key = 'default') {
            var _a, _b;
            if (isServer) {
                return;
            }
            return (_b = (_a = window.history.state) === null || _a === void 0 ? void 0 : _a.rememberedState) === null || _b === void 0 ? void 0 : _b[key];
        }
        on(type, callback) {
            const listener = ((event) => {
                const response = callback(event);
                if (event.cancelable && !event.defaultPrevented && response === false) {
                    event.preventDefault();
                }
            });
            document.addEventListener(`inertia:${type}`, listener);
            return () => document.removeEventListener(`inertia:${type}`, listener);
        }
    }
    exports.Router = Router;
});
define("progress", ["require", "exports", "nprogress"], function (require, exports, nprogress_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    nprogress_1 = __importDefault(nprogress_1);
    let timeout = null;
    function addEventListeners(delay) {
        document.addEventListener('inertia:start', start.bind(null, delay));
        document.addEventListener('inertia:progress', progress);
        document.addEventListener('inertia:finish', finish);
    }
    function start(delay) {
        timeout = setTimeout(() => nprogress_1.default.start(), delay);
    }
    function progress(event) {
        var _a;
        if (nprogress_1.default.isStarted() && ((_a = event.detail.progress) === null || _a === void 0 ? void 0 : _a.percentage)) {
            nprogress_1.default.set(Math.max(nprogress_1.default.status, (event.detail.progress.percentage / 100) * 0.9));
        }
    }
    function finish(event) {
        clearTimeout(timeout);
        if (!nprogress_1.default.isStarted()) {
            return;
        }
        else if (event.detail.visit.completed) {
            nprogress_1.default.done();
        }
        else if (event.detail.visit.interrupted) {
            nprogress_1.default.set(0);
        }
        else if (event.detail.visit.cancelled) {
            nprogress_1.default.done();
            nprogress_1.default.remove();
        }
    }
    function injectCSS(color) {
        const element = document.createElement('style');
        element.setAttribute('type', 'text/css');
        element.textContent = `
    #nprogress {
      pointer-events: none;
    }

    #nprogress .bar {
      background: ${color};

      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;
    }

    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
      opacity: 1.0;

      -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
              transform: rotate(3deg) translate(0px, -4px);
    }

    #nprogress .spinner {
      display: block;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px;
    }

    #nprogress .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;

      border: solid 2px transparent;
      border-top-color: ${color};
      border-left-color: ${color};
      border-radius: 50%;

      -webkit-animation: nprogress-spinner 400ms linear infinite;
              animation: nprogress-spinner 400ms linear infinite;
    }

    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
      position: absolute;
    }

    @-webkit-keyframes nprogress-spinner {
      0%   { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes nprogress-spinner {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
        document.head.appendChild(element);
    }
    function setupProgress({ delay = 250, color = '#29d', includeCSS = true, showSpinner = false, } = {}) {
        addEventListeners(delay);
        nprogress_1.default.configure({ showSpinner });
        if (includeCSS) {
            injectCSS(color);
        }
    }
    exports.default = setupProgress;
});
define("shouldIntercept", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function shouldIntercept(event) {
        const isLink = event.currentTarget.tagName.toLowerCase() === 'a';
        return !((event.target && (event === null || event === void 0 ? void 0 : event.target).isContentEditable) ||
            event.defaultPrevented ||
            (isLink && event.which > 1) ||
            (isLink && event.altKey) ||
            (isLink && event.ctrlKey) ||
            (isLink && event.metaKey) ||
            (isLink && event.shiftKey));
    }
    exports.default = shouldIntercept;
});
define("form", ["require", "exports", "lodash", "vue", "router", "progress", "shouldIntercept", "types", "url"], function (require, exports, lodash_1, vue_1, router_1, progress_1, shouldIntercept_1, types_3, url_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.router = exports.urlWithoutHash = exports.mergeDataIntoQueryString = exports.hrefToUrl = exports.shouldIntercept = exports.setupProgress = void 0;
    Object.defineProperty(exports, "setupProgress", { enumerable: true, get: function () { return __importDefault(progress_1).default; } });
    Object.defineProperty(exports, "shouldIntercept", { enumerable: true, get: function () { return __importDefault(shouldIntercept_1).default; } });
    __exportStar(types_3, exports);
    Object.defineProperty(exports, "hrefToUrl", { enumerable: true, get: function () { return url_2.hrefToUrl; } });
    Object.defineProperty(exports, "mergeDataIntoQueryString", { enumerable: true, get: function () { return url_2.mergeDataIntoQueryString; } });
    Object.defineProperty(exports, "urlWithoutHash", { enumerable: true, get: function () { return url_2.urlWithoutHash; } });
    exports.router = new router_1.Router();
    function useForm(rememberKeyOrData, maybeData) {
        const rememberKey = typeof rememberKeyOrData === "string" ? rememberKeyOrData : null;
        const data = typeof rememberKeyOrData === "object"
            ? rememberKeyOrData
            : maybeData;
        const restored = rememberKey
            ? exports.router.restore(rememberKey)
            : null;
        let defaults = (0, lodash_1.cloneDeep)(data);
        let cancelToken;
        let recentlySuccessfulTimeoutId;
        let transform = (data) => data;
        let form = (0, vue_1.reactive)(Object.assign(Object.assign({}, (restored ? restored.data : data)), { isDirty: false, errors: restored ? restored.errors : {}, hasErrors: false, processing: false, progress: null, wasSuccessful: false, recentlySuccessful: false, data() {
                return Object.keys(data).reduce((carry, key) => {
                    carry[key] = this[key];
                    return carry;
                }, {});
            },
            transform(callback) {
                transform = callback;
                return this;
            },
            defaults(fieldOrFields, maybeValue) {
                if (typeof fieldOrFields === "undefined") {
                    defaults = this.data();
                }
                else {
                    defaults = Object.assign({}, (0, lodash_1.cloneDeep)(defaults), typeof fieldOrFields === "string"
                        ? { [fieldOrFields]: maybeValue }
                        : fieldOrFields);
                }
                return this;
            },
            reset(...fields) {
                let clonedDefaults = (0, lodash_1.cloneDeep)(defaults);
                if (fields.length === 0) {
                    Object.assign(this, clonedDefaults);
                }
                else {
                    Object.assign(this, Object.keys(clonedDefaults)
                        .filter((key) => fields.includes(key))
                        .reduce((carry, key) => {
                        carry[key] = clonedDefaults[key];
                        return carry;
                    }, {}));
                }
                return this;
            },
            setError(fieldOrFields, maybeValue) {
                Object.assign(this.errors, typeof fieldOrFields === "string"
                    ? { [fieldOrFields]: maybeValue }
                    : fieldOrFields);
                this.hasErrors = Object.keys(this.errors).length > 0;
                return this;
            },
            clearErrors(...fields) {
                this.errors = Object.keys(this.errors).reduce((carry, field) => (Object.assign(Object.assign({}, carry), (fields.length > 0 && !fields.includes(field)
                    ? { [field]: this.errors[field] }
                    : {}))), {});
                this.hasErrors = Object.keys(this.errors).length > 0;
                return this;
            },
            submit(method, url, options = {}) {
                const data = transform(this.data());
                const _options = Object.assign(Object.assign({}, options), { onCancelToken: (token) => {
                        cancelToken = token;
                        if (options.onCancelToken) {
                            return options.onCancelToken(token);
                        }
                    }, onBefore: (visit) => {
                        this.wasSuccessful = false;
                        this.recentlySuccessful = false;
                        clearTimeout(recentlySuccessfulTimeoutId);
                        if (options.onBefore) {
                            return options.onBefore(visit);
                        }
                    }, onStart: (visit) => {
                        this.processing = true;
                        if (options.onStart) {
                            return options.onStart(visit);
                        }
                    }, onProgress: (event) => {
                        this.progress = event;
                        if (options.onProgress) {
                            return options.onProgress(event);
                        }
                    }, onSuccess: (page) => __awaiter(this, void 0, void 0, function* () {
                        this.processing = false;
                        this.progress = null;
                        this.clearErrors();
                        this.wasSuccessful = true;
                        this.recentlySuccessful = true;
                        recentlySuccessfulTimeoutId = setTimeout(() => (this.recentlySuccessful = false), 2000);
                        const onSuccess = options.onSuccess
                            ? yield options.onSuccess(page)
                            : null;
                        defaults = (0, lodash_1.cloneDeep)(this.data());
                        this.isDirty = false;
                        return onSuccess;
                    }), onError: (errors) => {
                        this.processing = false;
                        this.progress = null;
                        this.clearErrors().setError(errors);
                        if (options.onError) {
                            return options.onError(errors);
                        }
                    }, onCancel: () => {
                        this.processing = false;
                        this.progress = null;
                        if (options.onCancel) {
                            return options.onCancel();
                        }
                    }, onFinish: (visit) => {
                        this.processing = false;
                        this.progress = null;
                        cancelToken = null;
                        if (options.onFinish) {
                            return options.onFinish(visit);
                        }
                    } });
                if (method === "delete") {
                    exports.router.delete(url, Object.assign(Object.assign({}, _options), { data }));
                }
                else {
                    exports.router[method](url, data, _options);
                }
            },
            get(url, options) {
                this.submit("get", url, options);
            },
            post(url, options) {
                this.submit("post", url, options);
            },
            put(url, options) {
                this.submit("put", url, options);
            },
            patch(url, options) {
                this.submit("patch", url, options);
            },
            delete(url, options) {
                this.submit("delete", url, options);
            },
            cancel() {
                if (cancelToken) {
                    cancelToken.cancel();
                }
            }, __rememberable: rememberKey === null, __remember() {
                return { data: this.data(), errors: this.errors };
            },
            __restore(restored) {
                Object.assign(this, restored.data);
                this.setError(restored.errors);
            } }));
        (0, vue_1.watch)(form, (newValue) => {
            form.isDirty = !(0, lodash_1.isEqual)(form.data(), defaults);
            if (rememberKey) {
                exports.router.remember((0, lodash_1.cloneDeep)(newValue.__remember()), rememberKey);
            }
        }, { immediate: true, deep: true });
        return form;
    }
    exports.default = useForm;
});
define("server", ["require", "exports", "http", "process"], function (require, exports, http_1, process) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    process = __importStar(process);
    const readableToString = (readable) => new Promise((resolve, reject) => {
        let data = '';
        readable.on('data', (chunk) => (data += chunk));
        readable.on('end', () => resolve(data));
        readable.on('error', (err) => reject(err));
    });
    exports.default = (render, port) => {
        const _port = port || 13714;
        const routes = {
            '/health': () => __awaiter(void 0, void 0, void 0, function* () { return ({ status: 'OK', timestamp: Date.now() }); }),
            '/shutdown': () => process.exit(),
            '/render': (request) => __awaiter(void 0, void 0, void 0, function* () { return render(JSON.parse(yield readableToString(request))); }),
            '/404': () => __awaiter(void 0, void 0, void 0, function* () { return ({ status: 'NOT_FOUND', timestamp: Date.now() }); }),
        };
        (0, http_1.createServer)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
            const dispatchRoute = routes[request.url] || routes['/404'];
            try {
                response.writeHead(200, { 'Content-Type': 'application/json', Server: 'Inertia.js SSR' });
                response.write(JSON.stringify(yield dispatchRoute(request)));
            }
            catch (e) {
                console.error(e);
            }
            response.end();
        })).listen(_port, () => console.log('Inertia SSR server started.'));
        console.log(`Starting SSR server on port ${_port}...`);
    };
});
//# sourceMappingURL=form.js.map