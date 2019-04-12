/**
 * reducer
 *
 * landenli
 */

import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import counterReducer from '../pages/counter/redux/reducer'
import clockRecordReducer from '../pages/redux/reducer'


const rootReducer = history =>
  combineReducers({
    count: counterReducer,
    clockRecord: clockRecordReducer,
    router: connectRouter(history)
  })

export default rootReducer
