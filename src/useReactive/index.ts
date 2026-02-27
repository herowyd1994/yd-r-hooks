/** @format */

import { useMemo, useState } from 'react';
import { deepClone, getType } from '@yd/utils';

const map = new WeakMap();

export default <V extends Record<string, any>, K extends keyof V = keyof V>(
    initValue: V | (() => V)
) => {
    const iValue = typeof initValue === 'function' ? initValue() : deepClone(initValue);
    const [, update] = useState({});
    const observer = (target: V) => {
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
        }) as V;
        map.set(target, proxy);
        return proxy;
    };
    const $refs = useMemo<V>(() => observer(iValue), []);
    const $forceUpdate = () => update({});
    const $action = (action: Partial<V>) =>
        Object.entries(action).forEach(
            ([key, value]) => Reflect.has(iValue, key) && ($refs[key as K] = value)
        );
    const $reset = (keys: K | K[] | '*' = '*') => {
        keys = (
            keys === '*' ? Object.keys(iValue)
            : typeof keys === 'string' ? [keys]
            : keys) as K[];
        keys.forEach(key => ($refs[key] = iValue[key]));
    };
    const isObject = (target: any) => {
        const type = getType(target);
        return type === 'array' || type === 'object';
    };
    return {
        ...$refs,
        $refs,
        $forceUpdate,
        $action,
        $reset
    };
};
