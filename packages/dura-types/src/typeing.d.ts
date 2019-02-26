import { Dispatch, Store as _Store, AnyAction, Middleware, applyMiddleware, compose, createStore } from "redux";

export type ExcludeTypeAction = {
  [name: string]: any;
};

export type EffectApi = {
  dispatch: any;
  delay: (ms: number) => Promise<{}>;
  select: (fn: (state) => any) => any;
};

export type Reducer<S, A extends ExcludeTypeAction> = (state: S, action: A) => S;

export type Effect = (effectApi: EffectApi, action: ExcludeTypeAction) => Promise<void>;

export type ReducerMap<S> = {
  [name: string]: Reducer<S, ExcludeTypeAction>;
};

export type EffectMap = {
  [name: string]: Effect;
};

export type Model<S> = {
  state: S;
  reducers: ReducerMap<S>;
  effects: EffectMap;
};

export type RootModel = {
  [name: string]: Model<any>;
};

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type Store<RM extends RootModel = any> = _Store<ExtractRootState<RM>>;

export type ExtractRootState<M extends RootModel> = { [key in keyof M]: M[key]["state"] };

export type ReviewEffects<E extends EffectMap> = { [key in keyof E]: Pack<Parameters<E[key]>[1]> };

export type ExtractActions<M extends RootModel> = ExtractReducerActions<M> & ExtractEffectActions<M>;

export type ExtractEffectActions<M extends RootModel> = {
  [key in keyof M]: "effects" extends keyof M[key] ? ReviewEffects<M[key]["effects"]> : never
};

export type ReviewReducders<R extends ReducerMap<S>, S> = { [key in keyof R]: Pack<Parameters<R[key]>[1]> };

export type ExtractReducerActions<M extends RootModel> = {
  [key in keyof M]: ReviewReducders<M[key]["reducers"], M[key]["state"]>
};

export type Config = {
  initialModel: RootModel;
  initialState?: any;
  middlewares?: Array<Middleware>;
  compose?: typeof compose;
  createStore?: typeof createStore;
};

type Pack<T extends ExcludeTypeAction> = "payload" | "meta" extends keyof T
  ? (payload: T["payload"], meta: T["meta"]) => AnyAction
  : "payload" extends keyof T
  ? (payload: T["payload"]) => AnyAction
  : "meta" extends keyof T
  ? (payload: null, meta: T["meta"]) => AnyAction
  : [];
