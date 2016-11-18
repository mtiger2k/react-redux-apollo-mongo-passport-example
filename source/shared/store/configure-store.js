import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {browserHistory} from 'react-router';
import { reducer as reduxAsyncConnect } from 'redux-connect'
import {routerReducer as routing, routerMiddleware} from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

import rootReducer from '../reducers'
import auth from '../reducers/auth'
import DevTools from '../middleware/devtools';
import promiseMiddleware from '../middleware/promiseMiddleware';

const middleware = routerMiddleware(browserHistory)

const middlewares = process.env.NODE_ENV === 'development' ?
    [applyMiddleware(promiseMiddleware, middleware, createLogger()), /*DevTools.instrument()*/] :
    [applyMiddleware(promiseMiddleware, middleware)];


export default function configureStore(initialState, apolloClient) {

  const store = createStore(
    combineReducers({
        rootReducer,
        auth,
        reduxAsyncConnect,
        routing,
        form: formReducer,
        apollo: apolloClient.reducer(),
    }),
    initialState,
    compose(applyMiddleware(apolloClient.middleware()), ...middlewares)
  )

  return store
}

