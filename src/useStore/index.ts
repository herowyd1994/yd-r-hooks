/** @format */

import { useReducer, useRef, Reducer } from 'react';
import { Action, NextTick } from './types';
import { useUpdate } from '../index';
import { deepClone } from '@yd/utils';

export default <S extends Record<string, any>, K extends keyof S = keyof S>(
    initStore: S | (() => S)
) => {
    const iStore = typeof initStore === 'function' ? initStore() : initStore;
    const [store, setStore] = useReducer<Reducer<S, Action<S>>>((store, action) => {
        if (typeof action === 'function' || (action && typeof action === 'object')) {
            const nStore = { ...store };
            const nAction = typeof action === 'function' ? action(store) : action;
            Object.entries(nAction).forEach(
                ([key, value]) => Reflect.has(nStore, key) && Reflect.set(nStore, key, value)
            );
            return nStore;
        }
        return store;
    }, deepClone(iStore));
    const nextTick = useRef<NextTick<S>>();
    const dispatch = (action: Action<S>) =>
        new Promise<S>(resolve => {
            nextTick.current = resolve;
            setStore(action);
        });
    const reset = (keys: K | K[] | '*' = '*') => {
        const cStore = deepClone(iStore);
        keys = (
            keys === '*' ? Object.keys(cStore)
            : typeof keys === 'string' ? [keys]
            : keys) as K[];
        return dispatch(
            keys.reduce((obj, key) => ({ ...obj, [key]: cStore[key] }), {} as Partial<S>)
        );
    };
    useUpdate(() => nextTick.current?.(store), [store]);
    return {
        ...store,
        dispatch,
        reset
    };
};
