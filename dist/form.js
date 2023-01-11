"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const http_1 = require("./http");
function useForm(data) {
    let defaults = {};
    let cancelToken = null;
    let recentlySuccessfulTimeoutId = null;
    let transform = (data) => data;
    const form = (0, vue_1.reactive)(Object.assign(Object.assign({}, data), { isDirty: false, errors: data.errors, hasErrors: false, processing: false, progress: null, wasSuccessful: false, recentlySuccessful: false, data() {
            return Object.keys(data).reduce((carry, key) => {
                carry[key] = this[key];
                return carry;
            }, {});
        },
        transform(callback) {
            transform = callback;
            return this;
        },
        defaults(key, value) {
            if (typeof key === "undefined") {
                defaults = this.data();
            }
            else {
                defaults = Object.assign({}, defaults, value ? { [key]: value } : key);
            }
            return this;
        },
        reset(...fields) {
            if (fields.length === 0) {
                Object.assign(this, defaults);
            }
            else {
                Object.assign(this, Object.keys(defaults)
                    .filter((key) => fields.includes(key))
                    .reduce((carry, key) => {
                    carry[key] = defaults[key];
                    return carry;
                }, {}));
            }
            return this;
        },
        setError(key, value) {
            Object.assign(this.errors, value ? { [key]: value } : key);
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
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                this.processing = true;
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
                        defaults = {};
                        this.isDirty = false;
                        return onSuccess;
                    }), onError: (errors) => {
                        this.processing = false;
                        this.progress = null;
                        this.clearErrors().setError(errors, errors);
                        if (options.onError) {
                            return options.onError(errors);
                        }
                    }, onCancel: () => {
                        this.processing = false;
                        this.progress = null;
                        if (options.onCancel) {
                            return options.onCancel();
                        }
                    }, onFinish: () => {
                        this.processing = false;
                        this.progress = null;
                        cancelToken = null;
                        if (options.onFinish) {
                            return options.onFinish();
                        }
                    } });
                let ret;
                try {
                    this.processing = true;
                    const multipart = data instanceof FormData && !!data.values();
                    switch (method) {
                        case "post":
                            ret = yield (0, http_1.remotePost)(url, data, options);
                            break;
                        case "patch":
                            ret = yield (0, http_1.remotePatch)(data, url, multipart, options);
                            break;
                        case "put":
                            ret = yield (0, http_1.remotePut)(data, url, multipart, options);
                            break;
                        case "delete":
                            ret = yield (0, http_1.deleteRecord)(data, url, options);
                            break;
                        default:
                            ret = yield (0, http_1.remoteGet)(url, _options);
                            break;
                    }
                    this.processing = false;
                }
                catch (error) {
                    ret.errors = [error];
                }
                if ((_b = (_a = ret === null || ret === void 0 ? void 0 : ret.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.errors) {
                    this.errors = ((_c = ret.response) === null || _c === void 0 ? void 0 : _c.data).errors;
                }
                this.processing = false;
                return ret;
            });
        },
        get(url, options) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.submit("get", url, options);
            });
        },
        post(url, options) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.submit("post", url, options);
            });
        },
        put(url, options) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.submit("put", url, options);
            });
        },
        patch(url, options) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.submit("patch", url, options);
            });
        },
        delete(url, options) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.submit("delete", url, options);
            });
        },
        cancel() {
            if (cancelToken) {
                cancelToken.cancel();
            }
        } }));
    (0, vue_1.watch)(form, (val) => {
        form.isDirty = !!val;
    }, { immediate: true, deep: true });
    return form;
}
exports.default = useForm;
//# sourceMappingURL=form.js.map