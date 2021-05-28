import React, { Component } from "react";
// import UI component
// import CountUI from "../../Components/Count";
// import connect to connect UI and redux
import { connect } from "react-redux";
import {
  incrementAction,
  decrementAction,
  incrementAsyncAction,
} from "../../Redux/actions/count";

// define UI
class CountUI extends Component {
  // state = {
  //   count: 0
  // };

  /* move this piece of codes to index.js */
  // componentDidMount() {
  //   // monitor the changes of state in Redux, 
  //   // and manually re-render the component if state is changed
  //   store.subscribe(() => {
  //     this.setState({});
  //   })
  // }

  increment = () => {
    const { value } = this.selectNumber;
    this.props.increment(value * 1);
  };

  decrement = () => {
    const { value } = this.selectNumber;
    this.props.decrement(value * 1);
  };

  incrementIfOdd = () => {
    const { value } = this.selectNumber;
    const sum = this.props.sum;
    sum % 2 && this.props.increment(value * 1);
  };

  asyncIncrement = () => {
    const { value } = this.selectNumber;
    this.props.increment_async(value * 1, 500);
  };

  render() {
    return (
      <div>
        <h1>Current sum is: {this.props.sum}</h1>
        <h2>The number of people below is: {this.props.persons.length-1}</h2>
        <select ref={(c) => (this.selectNumber = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
        <button onClick={this.asyncIncrement}>async increment</button>&nbsp;
      </div>
    );
  }
}

/**
 * mapStateToProps passes the states in Redux to UI, no need to use store.getState()
 * @param {*} states in Redux
 * @returns states in Redux as { key: value }
 */
const mapStateToProps = (state) => ({ 
  sum: state.sum,
  persons: state.persons,
 });

/**
 * mapDispatchToProps passes the functions to operate states in Redux, no need to use store.dispatch()
 * @param {*} dispatch() in Redux
 * @returns functions to operate states in Redux
 */
// const mapDispatchToProps = (dispatch) =>
//   // dispatch an action here
//   ({
//     increment: (value) => dispatch(createIncrementAction(value)),
//     decrement: (value) => dispatch(createDecrementAction(value)),
//     increment_async: (value, time) =>
//       dispatch(createIncrementAsyncAction(value, time)),
//   });

// simpler mapDispatchToProps
const mapDispatchToProps = {
  // dispatch an action here
  increment: incrementAction,
  decrement: decrementAction,
  increment_async: incrementAsyncAction,
};

// create and export a container for Count
// father (container) must pass in 2 functions (with potential to simplify!)
// son (UI) must pass in 1 component
export default connect(mapStateToProps, mapDispatchToProps)(CountUI);
