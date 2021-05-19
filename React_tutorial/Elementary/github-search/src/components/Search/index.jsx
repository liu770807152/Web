import React, { Component } from "react";
import axios from 'axios';

export default class index extends Component {

  search = () => {
    // continuous destructuring assignment + rename variable
    const { keywordElement: { value: name } } = this;
    axios.get(`/api/search/users?q=${name}`).then(res => {
      console.log(res.data);
    }, err => {
      console.error(err);
    })
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
