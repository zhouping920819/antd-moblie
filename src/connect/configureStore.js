/**
 * store
 *
 * landenli
 */

import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router/immutable'
import { Iterable } from 'immutable'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createRootReducer from './reducers'

// history
export const history = createBrowserHistory()

// immutable数据需要改写logger的stateTransformer
const logger = createLogger({
  stateTransformer: state => {
    if (Iterable.isIterable(state)) return state.toJS()
    else return state
  }
})

export default function configureStore(preloadedState) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const middleware = [routerMiddleware(history), thunk, logger]
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancer(applyMiddleware(...middleware))
  )

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(history))
    })
  }

  return store
}
