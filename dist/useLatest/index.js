"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
exports.default = (function (handler) {
    var fn = (0, react_1.useRef)(handler);
    fn.current = handler;
    return (0, react_1.useCallback)(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return fn.current.apply(fn, args);
    }, []);
});
