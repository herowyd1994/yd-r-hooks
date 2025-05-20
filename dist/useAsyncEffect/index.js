"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUpdate = exports.useUnmount = exports.useMount = exports.useAsyncEffect = void 0;
var react_1 = require("react");
var useAsyncEffect = function (mount, unMount, deps) {
    var ctx = (0, react_1.useRef)();
    Array.isArray(unMount) && (deps = unMount);
    (0, react_1.useEffect)(function () {
        mount === null || mount === void 0 ? void 0 : mount(ctx);
        return function () { return typeof unMount === 'function' && unMount(ctx); };
    }, deps);
};
exports.useAsyncEffect = useAsyncEffect;
var useMount = function (handler) { return (0, exports.useAsyncEffect)(handler, []); };
exports.useMount = useMount;
var useUnmount = function (handler) { return (0, exports.useAsyncEffect)(void 0, handler, []); };
exports.useUnmount = useUnmount;
var useUpdate = function (handler, deps, skip) {
    if (skip === void 0) { skip = 1; }
    var count = (0, react_1.useRef)(0);
    (0, exports.useAsyncEffect)(function () { return (count.current < skip ? count.current++ : handler()); }, deps);
};
exports.useUpdate = useUpdate;
