import { actions, thunks } from 'store';
import { StoreState } from './state';

type Thunks = typeof thunks;

export type ThunkHandler<
  A extends keyof Thunks,
  T extends 'failure' | 'success' | 'request',
> = (state: StoreState, action: ReturnType<typeof thunks[A][T]>) => StoreState;

export type ActionHandler<A extends keyof typeof actions> = (
  state: StoreState,
  action: ReturnType<typeof actions[A]>,
) => StoreState;
