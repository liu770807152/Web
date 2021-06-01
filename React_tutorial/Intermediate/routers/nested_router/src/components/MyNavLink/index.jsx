import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class MyNavLink extends Component {
  render() {
    return (
      // <NavLink
      //   activeClassName="clicked"
      //   className="list-group-item"
      //   // to={this.props.to}
      //   {...this.props}
      // >
      //   {this.props.children}
      // </NavLink>

      <NavLink
        activeClassName="clicked"
        className="list-group-item"
        // to={this.props.to}
        // children={this.props.children}
        {...this.props}
      />
    );
  }
}
