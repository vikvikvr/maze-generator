import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
