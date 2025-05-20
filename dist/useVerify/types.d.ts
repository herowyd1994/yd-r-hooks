export type Store = Record<string, StoreOpts>;
export interface StoreOpts extends Partial<Record<keyof FnRules, number>> {
    label?: string;
    value: any;
    placeholder?: string;
    regExp?: RegExp | keyof Rules;
    require?: boolean;
    errMsg?: string;
    validate?(values: Values<Store>): boolean;
}
export type Data<S, K extends keyof S = keyof S> = Record<K, Required<Pick<StoreOpts, 'label' | 'value' | 'placeholder'>> & {
    key: K;
    setValue(value: any): Promise<Values<S>>;
    reset(): Promise<Values<S>>;
    validate(): Promise<Values<S>>;
    getErrMsg(): string | void;
}>;
export type Action<S> = Partial<Values<S>> | ((values: Values<S>) => Partial<Values<S>>);
export type Values<S> = {
    [K in keyof S]: StoreOpts['value'];
};
export type Rules = Record<'nickName' | 'idCard' | 'password' | 'qq' | 'mobile' | 'bankCard' | 'email' | 'wx' | 'url' | 'base64' | 'licensePlate' | 'passport' | 'amount', {
    regExp: RegExp;
    errMsg: string;
}>;
export type FnRules = Record<'length' | 'minLength' | 'maxLength' | 'min' | 'max', {
    validate(value: StoreOpts['value'], target: number): boolean;
    errMsg: string;
}>;
