"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var index_1 = require("../index");
var utils_1 = require("@yd/utils");
exports.default = (function (initStore) {
    var iStore = typeof initStore === 'function' ? initStore() : (0, utils_1.deepClone)(initStore);
    var _a = (0, react_1.useReducer)(function (store, action) {
        if (typeof action === 'function' || (action && typeof action === 'object')) {
            var nStore_1 = __assign({}, store);
            var nAction = typeof action === 'function' ? action(store) : action;
            Object.entries(nAction).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                return Reflect.has(nStore_1, key) && Reflect.set(nStore_1, key, value);
            });
            return nStore_1;
        }
        return store;
    }, iStore), store = _a[0], setStore = _a[1];
    var nextTick = (0, react_1.useRef)();
    var cbs = (0, react_1.useRef)();
    var $dispatch = function (action) {
        return new Promise(function (resolve) {
            nextTick.current = resolve;
            setStore(action);
        });
    };
    var $reset = function (keys) {
        if (keys === void 0) { keys = '*'; }
        keys = (keys === '*' ? Object.keys(iStore)
            : typeof keys === 'string' ? [keys]
                : keys);
        return $dispatch(keys.reduce(function (obj, key) {
            var _a;
            return (__assign(__assign({}, obj), (_a = {}, _a[key] = iStore[key], _a)));
        }, {}));
    };
    var $subscribe = function (callback) {
        cbs.current.push(callback);
        return function () { return (cbs.current = cbs.current.filter(function (cb) { return cb !== callback; })); };
    };
    (0, index_1.useUpdate)(function () {
        var _a;
        (_a = nextTick.current) === null || _a === void 0 ? void 0 : _a.call(nextTick, store);
        cbs.current.forEach(function (cb) { return cb(store); });
    }, [store]);
    return __assign(__assign({}, store), { $dispatch: $dispatch, $reset: $reset, $subscribe: $subscribe });
});
