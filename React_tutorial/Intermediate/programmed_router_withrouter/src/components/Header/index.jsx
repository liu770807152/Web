import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

class Header extends Component {

  goForward = () => {
    this.props.history.goForward();
  }

  goBack = () => {
    this.props.history.goBack();
  }

  go = () => {
    // goBackward twice
    this.props.history.go(-2);
  }

  render() {
    return (
      <div className="page-header">
        <h2>React Router Demo</h2>
        <button onClick={this.goForward}>Forward</button>&nbsp;
        <button onClick={this.goBack}>Backward</button>&nbsp;
        <button onClick={this.go}>GoBackTwice</button>
      </div>
    );
  }
}

export default withRouter(Header);