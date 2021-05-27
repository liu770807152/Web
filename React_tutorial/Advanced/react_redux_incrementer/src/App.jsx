import React, { Component } from 'react';
// import redux (specifically store)
import store from './Redux/store';
import Count from './Containers/Count';

export default class App extends Component {
  render() {
    return (
      <>
        <Count store={store}/>
      </>
    )
  }
}
