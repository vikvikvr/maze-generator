import { ActionType, createReducer } from 'typesafe-actions';
import { DEFAULT_STATE } from './state';
import { StoreState } from 'types';
import * as actions from './actions';
import * as handlers from './handlers';

type ActionTypes = ActionType<typeof actions>;

export const reducer = createReducer<StoreState, ActionTypes>(DEFAULT_STATE)
  .handleAction(actions.startMaze, handlers.startMaze)
  .handleAction(actions.updateMaze, handlers.updateMaze)
  .handleAction(actions.completeMaze, handlers.completeMaze);
