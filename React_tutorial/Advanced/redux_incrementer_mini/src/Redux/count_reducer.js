/**
 * Reducers can initialize states and update states.
 * This file is for creating a reducer for Count.
 * 1. A reducer is basically a function.
 * 2. The reducer will receive 2 params: 1) previous state; 2) action object
 */
import { INCREMENT, DECREMENT } from './constant';

const initState = 0;

export default function countReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case INCREMENT:
      return preState + data;
    case DECREMENT:
      return preState - data;
    default:
      return preState;
  }
}
