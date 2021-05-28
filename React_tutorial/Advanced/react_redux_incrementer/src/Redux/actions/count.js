/**
 * This function is used for creating action objects.
 * @returns action objects
 */
// introduce constants of types
import { INCREMENT, DECREMENT } from "../constant";

// synchronous actions are those returning objects
function incrementAction(data) {
  return {
    type: INCREMENT,
    data,
  };
}

const decrementAction = (data) => ({
  type: DECREMENT,
  data,
});

// asynchronous actions are those returning functions
const incrementAsyncAction = (data, time) => {
  // store will pass in the store by default!!!
  return (dispatch) => {
    setTimeout(() => {
      dispatch(incrementAction(data));
    }, time);
  };
};

export {
  incrementAction,
  decrementAction,
  incrementAsyncAction,
};
