import { useMemo, useState } from 'react';
import { deepClone } from '@yd/utils';
const map = new WeakMap();
export default (initStore) => {
    const iStore = initStore instanceof Function ? initStore() : initStore;
    const [, update] = useState({});
    const observer = (target) => {
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
        });
        map.set(target, proxy);
        return proxy;
    };
    const forceUpdate = () => update({});
    const reset = (keys = '*') => {
        const cStore = deepClone(iStore);
        keys = (keys === '*' ? Object.keys(cStore)
            : typeof keys === 'string' ? [keys]
                : keys);
        keys.forEach(key => (refs[key] = cStore[key]));
    };
    const isObject = (target) => target &&
        typeof target === 'object' &&
        !(target instanceof RegExp) &&
        !(target instanceof Date);
    const refs = useMemo(() => observer(deepClone(iStore)), []);
    return {
        ...refs,
        refs,
        forceUpdate,
        reset
    };
};
