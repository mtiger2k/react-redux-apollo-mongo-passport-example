import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const store = createStore(
    combineReducers({
        rootReducer,
        reduxAsyncConnect
    }),
    initialState,
    applyMiddleware(thunkMiddleware, createLogger())
  )

  return store
}

