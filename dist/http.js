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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecord = exports.remotePatch = exports.remotePut = exports.createRecord = exports.fetchRecord = exports.searchRecords = exports.searchRecord = exports.fetchAll = exports.remoteGet = exports.remotePost = void 0;
const axios_1 = __importDefault(require("axios"));
const http = axios_1.default.create({
    withCredentials: true,
    headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
    },
});
const buildQueryString = (query) => {
    return ("?" +
        Object.keys(query)
            .map((k) => `${k}=${query[k]}`)
            .join("&"));
};
const remotePost = (url, payload, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield http.post(url, payload, options);
        return data;
    }
    catch (error) {
        return error;
    }
});
exports.remotePost = remotePost;
const remoteGet = (url, query = {}, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield http.get(url + buildQueryString(query), options);
        return data;
    }
    catch (error) {
        return error;
    }
});
exports.remoteGet = remoteGet;
const fetchAll = (path, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield http.get(path, options);
        return data;
    }
    catch (error) {
        return error;
    }
});
exports.fetchAll = fetchAll;
const searchRecord = (searchTerm, path = "users", options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const res = yield (0, exports.remoteGet)(path, searchTerm, options);
        const { data } = res;
        return data ? (_a = data[0]) !== null && _a !== void 0 ? _a : 404 : (_b = res[0]) !== null && _b !== void 0 ? _b : 404;
    }
    catch (error) {
        return error;
    }
});
exports.searchRecord = searchRecord;
const searchRecords = (searchTerm, path = "users", options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield http.get(`${path}?search=${searchTerm}`, options);
        return data;
    }
    catch (error) {
        return error;
    }
});
exports.searchRecords = searchRecords;
const fetchRecord = (id, path = "users", options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield http.get(`${path}/${id}`, options);
        return data;
    }
    catch (error) {
        return error;
    }
});
exports.fetchRecord = fetchRecord;
const createRecord = (payload, path = "users", multipart = false, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (multipart) {
        http.defaults.headers.common["Content-Type"] = "multipart/form-data";
    }
    try {
        const { data } = yield http.post(path, payload, options);
        return data;
    }
    catch (error) {
        return error;
    }
});
exports.createRecord = createRecord;
const remotePut = (payload, path = "users", multipart = false, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    if (multipart) {
        http.defaults.headers.common["Content-Type"] = "multipart/form-data";
    }
    try {
        const { data } = yield http.put(`${path}/${(_c = payload.id) !== null && _c !== void 0 ? _c : ""}`, payload, options);
        return data;
    }
    catch (error) {
        return error;
    }
});
exports.remotePut = remotePut;
const remotePatch = (payload, path = "users", multipart = false, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    if (multipart) {
        http.defaults.headers.common["Content-Type"] = "multipart/form-data";
    }
    try {
        const { data } = yield http.patch(`${path}/${(_d = payload.id) !== null && _d !== void 0 ? _d : ""}`, payload, options);
        return data;
    }
    catch (error) {
        return error;
    }
});
exports.remotePatch = remotePatch;
const deleteRecord = (id, path = "users", options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield http.delete(`/${path}/${id}`, options);
        return data;
    }
    catch (error) {
        return error;
    }
});
exports.deleteRecord = deleteRecord;
//# sourceMappingURL=http.js.map