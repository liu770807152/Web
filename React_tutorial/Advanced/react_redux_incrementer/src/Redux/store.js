/**
 * This file is specifically used to export a store object.
 * The whole application has only 1 store object.
 */
import { createStore, applyMiddleware } from 'redux';
// introduce collected reducers
import allReducers from './reducers';
// introduce redux-thunk for supporting functional actions
import thunk from 'redux-thunk';
// introduce redux devtools for visualization
import { composeWithDevTools } from 'redux-devtools-extension';


// applyMiddleware must be the 2nd param
export default createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));