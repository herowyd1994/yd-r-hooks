import { useEffect, useRef } from 'react';
export const useAsyncEffect = (mount, unMount, deps) => {
    const context = useRef();
    if (Array.isArray(unMount)) {
        deps = unMount;
    }
    useEffect(() => {
        mount?.(context);
        return () => {
            typeof unMount === 'function' && unMount(context);
        };
    }, deps);
};
export const useMount = (handler) => useAsyncEffect(handler, []);
export const useUnmount = (handler) => useAsyncEffect(void 0, handler, []);
export const useUpdate = (handler, deps, skip = 1) => {
    const count = useRef(0);
    useAsyncEffect(() => (count.current < skip ? count.current++ : handler()), deps);
};
