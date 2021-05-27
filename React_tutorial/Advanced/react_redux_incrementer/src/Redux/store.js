/**
 * This file is specifically used to export a store object.
 * The whole application has only 1 store object.
 */
// introduce createStore & applyMiddleware for creating the only store in Redux
import { createStore, applyMiddleware } from 'redux';
// introduce a reducer for the specific component (App in this demo)
import countReducer from './count_reducer';
// introduce redux-thunk for supporting functional actions
import thunk from 'redux-thunk';

// applyMiddleware must be the 2nd param
export default createStore(countReducer, applyMiddleware(thunk));