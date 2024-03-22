/** @format */

import { useMemo, useState } from 'react';
import { deepClone } from '@yd/utils';

const map = new WeakMap();

export default <S extends Record<string, any>, K extends keyof S = keyof S>(
    initStore: S | (() => S)
) => {
    const iStore = typeof initStore === 'function' ? initStore() : initStore;
    const [, update] = useState({});
    const observer = (target: S) => {
        if (map.has(target)) {
            return map.get(target);
        }
        const proxy = new Proxy(target, {
            get(target, p, receiver) {
                const res = Reflect.get(target, p, receiver);
                return isObject(res) ? observer(res) : res;
            },
            set(target, p, newValue, receiver) {
                newValue = isObject(newValue) ? observer(newValue) : newValue;
                Reflect.set(target, p, newValue, receiver);
                forceUpdate();
                return true;
            },
            deleteProperty(target, p) {
                Reflect.deleteProperty(target, p);
                forceUpdate();
                return true;
            }
        }) as S;
        map.set(target, proxy);
        return proxy;
    };
    const forceUpdate = () => update({});
    const reset = (keys: K | K[] | '*' = '*') => {
        const cStore = deepClone(iStore);
        keys = (
            keys === '*' ? Object.keys(cStore) : typeof keys === 'string' ? [keys] : keys
        ) as K[];
        keys.forEach((key) => (store[key] = cStore[key]));
    };
    const isObject = (target: any) =>
        target &&
        typeof target === 'object' &&
        !(target instanceof RegExp) &&
        !(target instanceof Date);
    const store = useMemo<S>(() => observer(deepClone(iStore)), []);
    return {
        store,
        forceUpdate,
        reset
    };
};
