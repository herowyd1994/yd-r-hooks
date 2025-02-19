import { useReducer, useRef } from 'react';
import { useUpdate } from '../index';
import { deepClone } from '@yd/utils';
export default (initStore) => {
    const iStore = typeof initStore === 'function' ? initStore() : deepClone(initStore);
    const [store, setStore] = useReducer((store, action) => {
        if (typeof action === 'function' || (action && typeof action === 'object')) {
            const nStore = { ...store };
            const nAction = typeof action === 'function' ? action(store) : action;
            Object.entries(nAction).forEach(([key, value]) => Reflect.has(nStore, key) && Reflect.set(nStore, key, value));
            return nStore;
        }
        return store;
    }, iStore);
    const nextTick = useRef();
    const cbs = useRef();
    const $dispatch = (action) => new Promise(resolve => {
        nextTick.current = resolve;
        setStore(action);
    });
    const $reset = (keys = '*') => {
        keys = (keys === '*' ? Object.keys(iStore)
            : typeof keys === 'string' ? [keys]
                : keys);
        return $dispatch(keys.reduce((obj, key) => ({ ...obj, [key]: iStore[key] }), {}));
    };
    const $subscribe = (callback) => {
        cbs.current.push(callback);
        return () => (cbs.current = cbs.current.filter(cb => cb !== callback));
    };
    useUpdate(() => {
        nextTick.current?.(store);
        cbs.current.forEach(cb => cb(store));
    }, [store]);
    return {
        ...store,
        $dispatch,
        $reset,
        $subscribe
    };
};
