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
var utils_1 = require("@yd/utils");
var map = new WeakMap();
exports.default = (function (initValue) {
    var iValue = typeof initValue === 'function' ? initValue() : (0, utils_1.deepClone)(initValue);
    var _a = (0, react_1.useState)({}), update = _a[1];
    var observer = function (target) {
        if (map.has(target)) {
            return map.get(target);
        }
        var proxy = new Proxy(target, {
            get: function (target, p, receiver) {
                var res = Reflect.get(target, p, receiver);
                return isObject(res) ? observer(res) : res;
            },
            set: function (target, p, newValue, receiver) {
                newValue = isObject(newValue) ? observer(newValue) : newValue;
                Reflect.set(target, p, newValue, receiver);
                $forceUpdate();
                return true;
            },
            deleteProperty: function (target, p) {
                Reflect.deleteProperty(target, p);
                $forceUpdate();
                return true;
            }
        });
        map.set(target, proxy);
        return proxy;
    };
    var $forceUpdate = function () { return update({}); };
    var $reset = function (keys) {
        if (keys === void 0) { keys = '*'; }
        keys = (keys === '*' ? Object.keys(iValue)
            : typeof keys === 'string' ? [keys]
                : keys);
        keys.forEach(function (key) { return ($refs[key] = iValue[key]); });
    };
    var isObject = function (target) {
        var type = (0, utils_1.getType)(target);
        return type === 'array' || type === 'object';
    };
    var $refs = (0, react_1.useMemo)(function () { return observer(iValue); }, []);
    return __assign(__assign({}, $refs), { $refs: $refs, $forceUpdate: $forceUpdate, $reset: $reset });
});
