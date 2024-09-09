/** @format */

import { useEffect, useRef, DependencyList } from 'react';
import { Mount, Handler } from './types';

export const useAsyncEffect = <V>(
    mount?: Mount<V>,
    unMount?: Mount<V> | DependencyList,
    deps?: DependencyList
) => {
    const context = useRef<V>();
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
export const useMount = (handler: Handler) => useAsyncEffect(handler, []);
export const useUnmount = (handler: Handler) => useAsyncEffect(void 0, handler, []);
export const useUpdate = (handler: Handler, deps: DependencyList, skip: number = 1) => {
    const count = useRef(0);
    useAsyncEffect(() => (count.current < skip ? count.current++ : handler()), deps);
};
