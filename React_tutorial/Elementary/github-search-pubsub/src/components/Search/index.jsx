import React, { Component } from "react";
import './index.css';
import axios from 'axios';

export default class Search extends Component {

  search = () => {
    // continuous destructuring assignment + rename variable
    const { keywordElement: { value: name } } = this;
    // update state before sending the request
    this.props.updateAppState({ isFirst: false, isLoading: true });
    // send the request
    axios.get(`/api/search/users?q=${name}`).then(res => {
      this.props.updateAppState({ isLoading: false, users: res.data.items });
    }, err => {
      this.props.updateAppState({ isLoading: false, err: err.message });
    });
  }

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input ref={c => this.keywordElement = c} type="text" placeholder="enter the name you search" />&nbsp;
          <button onClick={this.search}>Search</button>
        </div>
      </section>
    );
  }
}
