import React, { Component } from "react";

export default class CountUI extends Component {
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
  };

  decrement = () => {
    const { value } = this.selectNumber;
  };

  incrementIfOdd = () => {
    const { value } = this.selectNumber;
    const count = 0;
    // count % 2 && {}
  };

  asyncIncrement = () => {
    const { value } = this.selectNumber;
  };

  render() {
    return (
      <div>
        <h1>Current sum is: {}</h1>
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
