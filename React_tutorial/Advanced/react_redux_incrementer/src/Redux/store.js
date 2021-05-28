/**
 * This file is specifically used to export a store object.
 * The whole application has only 1 store object.
 */
import { createStore, applyMiddleware, combineReducers } from 'redux';
// introduce a reducer for Count
import countReducer from './reducers/count';
// introduce a reducer for Person
import personReducer from './reducers/person';
// introduce redux-thunk for supporting functional actions
import thunk from 'redux-thunk';
// introduce redux devtools for visualization
import { composeWithDevTools } from 'redux-devtools-extension';

const allReducers = combineReducers({
  sum: countReducer,
  persons: personReducer
})

// applyMiddleware must be the 2nd param
export default createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));