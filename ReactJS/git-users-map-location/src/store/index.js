import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';

import sagas from './sagas';

import reducers from './ducks';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(sagas);

export default store;
