import { useEffect, useRef } from 'react';
export const useAsyncEffect = (mount, unMount, deps) => {
    const ctx = useRef();
    Array.isArray(unMount) && (deps = unMount);
    useEffect(() => {
        mount?.(ctx);
        return () => typeof unMount === 'function' && unMount(ctx);
    }, deps);
};
export const useMount = (handler) => useAsyncEffect(handler, []);
export const useUnmount = (handler) => useAsyncEffect(void 0, handler, []);
export const useUpdate = (handler, deps, skip = 1) => {
    const count = useRef(0);
    useAsyncEffect(() => (count.current < skip ? count.current++ : handler()), deps);
};
