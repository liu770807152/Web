/**
 * Reducers can initialize states and update states.
 * This file is for creating a reducer for Count.
 * 1. A reducer is basically a function.
 * 2. The reducer will receive 2 params: 1) previous state; 2) action object
 */
const initState = 0;

function countReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case 'increment':
      return preState + data;
    case 'decrement':
      return preState - data;
    default:
      return preState;
  }
}

export {
  countReducer
}