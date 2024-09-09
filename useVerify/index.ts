/** @format */

import { useStore, useLatest } from '../index';
import { Action, Store, Data, Values, StoreOpts } from './types';
import { useMemo } from 'react';
import { rules, fnRules } from './rules';
import { isNone } from '@yd/utils';

export default <S extends Store, K extends keyof S = keyof S>(initStore: S | (() => S)) => {
    const { dispatch: d, reset: r, ...store } = useStore(initStore);
    const data = useMemo(
        () =>
            Object.entries(store).reduce(
                (obj, [key, { value, label = '', placeholder = `请输入${label}` }]) => ({
                    ...obj,
                    [key]: {
                        key,
                        value,
                        label,
                        placeholder,
                        setValue: value => dispatch({ [key]: value } as Action<S>),
                        reset: () => reset(key as K),
                        validate: () => validate(key as K),
                        getErrMsg: () => getErrMsg(key as K)
                    }
                }),
                {} as Data<S>
            ),
        [store]
    );
    const dispatch = async (action: Action<S>) => {
        action = typeof action === 'function' ? action(getValues()) : action;
        Object.entries(action).forEach(
            ([key, value]) => Reflect.has(store, key) && Reflect.set(store[key], 'value', value)
        );
        await d(store as unknown as S);
        return getValues();
    };
    const reset = async (keys: K | K[] | '*' = '*') => {
        await r(keys);
        return getValues();
    };
    const getValues = useLatest(() =>
        Object.entries(store).reduce((obj, [key, { value }]) => ({ ...obj, [key]: value }), {} as Values<S>)
    );
    const validate = (keys: K | K[] | '*' = '*') =>
        new Promise<Values<S>>((resolve, reject) => {
            keys = (
                keys === '*' ? Object.keys(store)
                : typeof keys === 'string' ? [keys]
                : keys) as K[];
            for (const key of keys) {
                const errMsg = getErrMsg(key);
                if (errMsg) {
                    const { value } = store[key as string];
                    return reject({ key, value, errMsg });
                }
            }
            resolve(getValues());
        });
    const getErrMsg = (key: K) => {
        const item = Reflect.get(store, key);
        const { label, value, require, regExp, errMsg, validate } = item;
        if (!require && isNone(value)) {
            return;
        }
        if (isNone(value)) {
            return `${label ?? (key as string)}不能为空`;
        }
        for (const [ruleKey, { validate, errMsg }] of Object.entries(fnRules)) {
            if (Reflect.has(item, ruleKey) && !validate(value, Reflect.get(item as StoreOpts, ruleKey))) {
                return `${label ?? (key as string)}${errMsg}`;
            }
        }
        if (typeof regExp === 'string' && Reflect.has(rules, regExp)) {
            const { regExp: reg, errMsg } = Reflect.get(rules, regExp);
            if (!reg.test(value)) {
                return errMsg;
            }
        }
        if (
            (regExp instanceof RegExp && !regExp.test(value)) ||
            (typeof validate === 'function' && !validate(getValues()))
        ) {
            return errMsg ?? `${label ?? (key as string)}不符合校验规则`;
        }
    };
    return {
        ...data,
        dispatch,
        reset,
        validate,
        getValues,
        getErrMsg
    };
};
