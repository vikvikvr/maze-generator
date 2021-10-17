import { ActionType, createReducer } from 'typesafe-actions';
import { DEFAULT_STATE } from './state';
import { StoreState } from 'types';
import * as actions from './actions';
import * as thunks from './thunks';
import * as handlers from './handlers';

type ActionTypes = ActionType<typeof actions & typeof thunks>;

export const reducer = createReducer<StoreState, ActionTypes>(DEFAULT_STATE)
  .handleAction(thunks.fetchImage.request, handlers.startLoading)
  .handleAction(thunks.fetchImage.failure, handlers.stopLoading)
  .handleAction(thunks.fetchImage.success, handlers.setImage);
