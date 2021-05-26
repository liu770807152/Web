/**
 * This function is used for creating action objects.
 * @returns action objects
 */
// introduce constants of types
import { INCREMENT, DECREMENT } from "./constant";

// synchronous actions are those returning objects
function createIncrementAction(data) {
  return {
    type: INCREMENT,
    data,
  };
}

const createDecrementAction = (data) => ({
  type: DECREMENT,
  data,
});

// asynchronous actions are those returning functions
const createIncrementAsyncAction = (data, time) => {
  // store will pass in the store by default!!!
  return (dispatch) => {
    setTimeout(() => {
      dispatch(createIncrementAction(data));
    }, time);
  };
};

export {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
};
