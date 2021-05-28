/**
 * This file is for collecting all reducers
 */
import { combineReducers } from 'redux';
// introduce a reducer for Count
import sum from './count';
// introduce a reducer for Person
import persons from './person';

export default combineReducers({
  sum,
  persons
});

