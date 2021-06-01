import React, { Component } from "react";
import "./index.css";

export default class Parent extends Component {
  render() {
    return (
      <div className="parent">
        <h3>I am Parent</h3>
        {/* prop name "render" is conventional,
            use jsx to pass a component as child */}
        {/* The author of B makes B a child of A, and passes data of A to B */}
        <A render={(received) => <B name={received} />} />
      </div>
    );
  }
}

class A extends Component {
  state = { name: "Tom" };
  render() {
    console.log(this.props);
    const { name } = this.state;
    return (
      <div className="a">
        <h3>I am son A, tell Parent my son's name is Tom</h3>
        {/* place a child component here without defining it,
            meaning the author of A does not need to know details of B */}
        {this.props.render(name)}
      </div>
    );
  }
}

class B extends Component {
  render() {
    console.log("B--render");
    return (
      <div className="b">
        <h3>I am grandson B, Parent tells me that A gives me a name: {this.props.name}</h3>
      </div>
    );
  }
}
