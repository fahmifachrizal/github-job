import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import jobReducer from './reducers/jobReducer'

const allReducers = combineReducers({
  jobReducer
})

const store = createStore(allReducers, applyMiddleware(thunk))

export default store