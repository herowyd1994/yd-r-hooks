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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var react_1 = require("react");
var rules_1 = require("./rules");
var utils_1 = require("@yd/utils");
exports.default = (function (initStore) {
    var _a = (0, index_1.useStore)(initStore), $dispatch = _a.$dispatch, $reset = _a.$reset, store = __rest(_a, ["$dispatch", "$reset"]);
    var data = (0, react_1.useMemo)(function () {
        return Object.entries(store).reduce(function (obj, _a) {
            var _b;
            var key = _a[0], _c = _a[1], value = _c.value, _d = _c.label, label = _d === void 0 ? '' : _d, _e = _c.placeholder, placeholder = _e === void 0 ? "\u8BF7\u8F93\u5165".concat(label) : _e;
            return (__assign(__assign({}, obj), (_b = {}, _b[key] = {
                key: key,
                value: value,
                label: label,
                placeholder: placeholder,
                setValue: function (value) {
                    var _a;
                    return dispatch((_a = {}, _a[key] = value, _a));
                },
                reset: function () { return reset(key); },
                validate: function () { return validate(key); },
                getErrMsg: function () { return getErrMsg(key); }
            }, _b)));
        }, {});
    }, [store]);
    var dispatch = function (action) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    action = typeof action === 'function' ? action(getValues()) : action;
                    Object.entries(action).forEach(function (_a) {
                        var key = _a[0], value = _a[1];
                        return Reflect.has(store, key) && Reflect.set(store[key], 'value', value);
                    });
                    return [4, $dispatch(store)];
                case 1:
                    _a.sent();
                    return [2, getValues()];
            }
        });
    }); };
    var reset = function () {
        var args_1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_1[_i] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (keys) {
            if (keys === void 0) { keys = '*'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, $reset(keys)];
                    case 1:
                        _a.sent();
                        return [2, getValues()];
                }
            });
        });
    };
    var getValues = (0, index_1.useLatest)(function () {
        return Object.entries(store).reduce(function (obj, _a) {
            var _b;
            var key = _a[0], value = _a[1].value;
            return (__assign(__assign({}, obj), (_b = {}, _b[key] = value, _b)));
        }, {});
    });
    var validate = function (keys) {
        if (keys === void 0) { keys = '*'; }
        return new Promise(function (resolve, reject) {
            keys = (keys === '*' ? Object.keys(store)
                : typeof keys === 'string' ? [keys]
                    : keys);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var errMsg = getErrMsg(key);
                if (errMsg) {
                    var value = store[key].value;
                    return reject({ key: key, value: value, errMsg: errMsg });
                }
            }
            resolve(getValues());
        });
    };
    var getErrMsg = function (key) {
        var item = Reflect.get(store, key);
        var label = item.label, value = item.value, require = item.require, regExp = item.regExp, errMsg = item.errMsg, validate = item.validate;
        if (!require && (0, utils_1.isNone)(value)) {
            return;
        }
        if ((0, utils_1.isNone)(value)) {
            return "".concat(label !== null && label !== void 0 ? label : key, "\u4E0D\u80FD\u4E3A\u7A7A");
        }
        for (var _i = 0, _a = Object.entries(rules_1.fnRules); _i < _a.length; _i++) {
            var _b = _a[_i], ruleKey = _b[0], _c = _b[1], validate_1 = _c.validate, errMsg_1 = _c.errMsg;
            if (Reflect.has(item, ruleKey) &&
                !validate_1(value, Reflect.get(item, ruleKey))) {
                return "".concat(label !== null && label !== void 0 ? label : key).concat(errMsg_1);
            }
        }
        if (typeof regExp === 'string' && Reflect.has(rules_1.rules, regExp)) {
            var _d = Reflect.get(rules_1.rules, regExp), reg = _d.regExp, errMsg_2 = _d.errMsg;
            if (!reg.test(value)) {
                return errMsg_2;
            }
        }
        if ((regExp instanceof RegExp && !regExp.test(value)) ||
            (typeof validate === 'function' && !validate(getValues()))) {
            return errMsg !== null && errMsg !== void 0 ? errMsg : "".concat(label !== null && label !== void 0 ? label : key, "\u4E0D\u7B26\u5408\u6821\u9A8C\u89C4\u5219");
        }
    };
    return __assign(__assign({}, data), { dispatch: dispatch, reset: reset, validate: validate, getValues: getValues, getErrMsg: getErrMsg });
});
