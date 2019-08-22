import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import { rootSaga } from './actions/saga';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(sagaMiddleware, thunk)
);

sagaMiddleware.run(rootSaga);

export default store;
