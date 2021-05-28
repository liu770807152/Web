import React, { Component } from 'react';
// import redux (specifically store)
// import store from './Redux/store';
import Person from './Containers/Person';
import Count from './Containers/Count';

export default class App extends Component {
  render() {
    return (
      <>
        {/* pass store to container
            can be done by Provider in index.js */}
        {/* <Count store={store}/> */}
        <Count />
        <hr />
        <Person />
      </>
    )
  }
}
