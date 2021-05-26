import React, { Component } from "react";
import store from '../../Redux/store';

export default class Count extends Component {
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
    store.dispatch({ type: 'increment', data: value * 1 });
  };

  decrement = () => {
    const { value } = this.selectNumber;
    store.dispatch({ type: 'decrement', data: value * 1 });
  };

  incrementIfOdd = () => {
    const { value } = this.selectNumber;
    const count = store.getState();
    count % 2 &&
    store.dispatch({ type: 'increment', data: value * 1 });
  };

  asyncIncrement = () => {
    const { value } = this.selectNumber;
    setTimeout(() => {
      store.dispatch({ type: 'increment', data: value * 1 });
    }, 500);
  };

  render() {
    return (
      <div>
        <h1>Current sum is: {store.getState()}</h1>
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
