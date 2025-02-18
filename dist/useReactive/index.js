import { useMemo, useState } from 'react';
import { deepClone, getType } from '@yd/utils';
const map = new WeakMap();
export default (initValue) => {
    const iValue = typeof initValue === 'function' ? initValue() : deepClone(initValue);
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
                $forceUpdate();
                return true;
            },
            deleteProperty(target, p) {
                Reflect.deleteProperty(target, p);
                $forceUpdate();
                return true;
            }
        });
        map.set(target, proxy);
        return proxy;
    };
    const $forceUpdate = () => update({});
    const $reset = (keys = '*') => {
        keys = (keys === '*' ? Object.keys(iValue)
            : typeof keys === 'string' ? [keys]
                : keys);
        keys.forEach(key => ($refs[key] = iValue[key]));
    };
    const isObject = (target) => {
        const type = getType(target);
        return type === 'array' || type === 'object';
    };
    const $refs = useMemo(() => observer(iValue), []);
    return {
        ...$refs,
        $refs,
        $forceUpdate,
        $reset
    };
};
