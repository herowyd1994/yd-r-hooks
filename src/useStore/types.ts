/** @format */

export type Action<S> = Partial<S> | ((store: S) => Partial<S>);
export type NextTick<S> = (store: S) => void;
export type Callback<S> = (store: S) => any;
