import { useReducer, useRef } from 'react';
import { useUpdate } from '../index';
import { deepClone } from '@yd/utils';
export default (initStore) => {
    const iStore = initStore instanceof Function ? initStore() : initStore;
    const [store, setStore] = useReducer((store, action) => {
        if (typeof action === 'object' || typeof action === 'function') {
            const nState = { ...store };
            const nAction = typeof action === 'function' ? action(store) : action;
            Object.entries(nAction).forEach(([key, value]) => Reflect.has(nState, key) && Reflect.set(nState, key, value));
            return nState;
        }
        return store;
    }, deepClone(iStore));
    const nextTick = useRef();
    const dispatch = (action) => new Promise(resolve => {
        nextTick.current = resolve;
        setStore(action);
    });
    const reset = (keys = '*') => {
        const cStore = deepClone(iStore);
        keys = (keys === '*' ? Object.keys(cStore)
            : typeof keys === 'string' ? [keys]
                : keys);
        return dispatch(keys.reduce((obj, key) => ({ ...obj, [key]: cStore[key] }), {}));
    };
    useUpdate(() => nextTick.current?.(store), [store]);
    return {
        ...store,
        dispatch,
        reset
    };
};
