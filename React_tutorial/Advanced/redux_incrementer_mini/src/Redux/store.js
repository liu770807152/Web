/**
 * This file is specifically used to export a store object.
 * The whole application has only 1 store object.
 */

import { createStore } from 'redux';
import { countReducer } from './count_reducer';

export default createStore(countReducer);