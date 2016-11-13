import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {browserHistory} from 'react-router';
import {routerReducer as routing, routerMiddleware} from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

import rootReducer from '../reducers'
import DevTools from '../middleware/devtools';

const middleware = routerMiddleware(browserHistory)

const middlewares = process.env.NODE_ENV === 'development' ?
    [applyMiddleware(thunkMiddleware, middleware, createLogger()), DevTools.instrument()] :
    [applyMiddleware(thunkMiddleware, middleware)];


export default function configureStore(initialState, apolloClient) {

  const store = createStore(
    combineReducers({
        rootReducer,
        routing,
        form: formReducer,
        apollo: apolloClient.reducer(),
    }),
    initialState,
    compose(applyMiddleware(apolloClient.middleware()), ...middlewares)
  )

  return store
}

