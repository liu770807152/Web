/**
 * This function is used for creating action objects.
 * @returns action objects
 */
// introduce constants of types
import { INCREMENT, DECREMENT } from './constant';;

function createIncrementAction(data) {
  return {
    type: INCREMENT,
    data
  }
}

const createDecrementAction = data => (
  {
    type: DECREMENT,
    data
  }
)

export {
  createIncrementAction,
  createDecrementAction
}