import { useStore, useLatest } from '../index';
import { useMemo } from 'react';
import { rules, fnRules } from './rules';
import { isNone } from '@yd/utils';
export default (initStore) => {
    const { $dispatch, $reset, ...store } = useStore(initStore);
    const data = useMemo(() => Object.entries(store).reduce((obj, [key, { value, label = '', placeholder = `请输入${label}` }]) => ({
        ...obj,
        [key]: {
            key,
            value,
            label,
            placeholder,
            setValue: value => dispatch({ [key]: value }),
            reset: () => reset(key),
            validate: () => validate(key),
            getErrMsg: () => getErrMsg(key)
        }
    }), {}), [store]);
    const dispatch = async (action) => {
        action = typeof action === 'function' ? action(getValues()) : action;
        Object.entries(action).forEach(([key, value]) => Reflect.has(store, key) && Reflect.set(store[key], 'value', value));
        await $dispatch(store);
        return getValues();
    };
    const reset = async (keys = '*') => {
        await $reset(keys);
        return getValues();
    };
    const getValues = useLatest(() => Object.entries(store).reduce((obj, [key, { value }]) => ({ ...obj, [key]: value }), {}));
    const validate = (keys = '*') => new Promise((resolve, reject) => {
        keys = (keys === '*' ? Object.keys(store)
            : typeof keys === 'string' ? [keys]
                : keys);
        for (const key of keys) {
            const errMsg = getErrMsg(key);
            if (errMsg) {
                const { value } = store[key];
                return reject({ key, value, errMsg });
            }
        }
        resolve(getValues());
    });
    const getErrMsg = (key) => {
        const item = Reflect.get(store, key);
        const { label, value, require, regExp, errMsg, validate } = item;
        if (!require && isNone(value)) {
            return;
        }
        if (isNone(value)) {
            return `${label ?? key}不能为空`;
        }
        for (const [ruleKey, { validate, errMsg }] of Object.entries(fnRules)) {
            if (Reflect.has(item, ruleKey) &&
                !validate(value, Reflect.get(item, ruleKey))) {
                return `${label ?? key}${errMsg}`;
            }
        }
        if (typeof regExp === 'string' && Reflect.has(rules, regExp)) {
            const { regExp: reg, errMsg } = Reflect.get(rules, regExp);
            if (!reg.test(value)) {
                return errMsg;
            }
        }
        if ((regExp instanceof RegExp && !regExp.test(value)) ||
            (typeof validate === 'function' && !validate(getValues()))) {
            return errMsg ?? `${label ?? key}不符合校验规则`;
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
