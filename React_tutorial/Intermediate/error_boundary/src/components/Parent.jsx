import React, { Component } from "react";
import Child from "./Child";

export default class Parent extends Component {
  state = {
    // to indicate if component generates error
    hasError: "",
  };

  // if children of Parent occur error, getDerivedStateFromError() will be triggered, error will be passed in
  static getDerivedStateFromError(error) {
    console.log("@@@", error);
    return {
      hasError: error,
    };
  }

  componentDidCatch() {
    console.log("Here counts error and pass it to server for bug fixing");
  }

  render() {
    return (
      <div>
        <h2>I am Parent</h2>
        {this.state.hasError ? (
          <h2>Network unstable. Please try again.</h2>
        ) : (
          <Child />
        )}
      </div>
    );
  }
}
