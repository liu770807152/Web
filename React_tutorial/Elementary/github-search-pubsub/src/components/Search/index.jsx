import React, { Component } from "react";
import PubSub from 'pubsub-js';
import './index.css';
import axios from 'axios';

export default class Search extends Component {

  search = async () => {
    // continuous destructuring assignment + rename variable
    const { keywordElement: { value: name } } = this;
    // update state before sending the request
    PubSub.publish('message', { isFirst: false, isLoading: true });
    // use Axios to send the request
    axios.get(`/api/search/users?q=${name}`).then(res => {
      PubSub.publish('message', { isLoading: false, users: res.data.items });
    }, err => {
      PubSub.publish('message', { isLoading: false, err: err.message });
    });

    // use Fetch to send the request
    /*fetch(`/api/search/users?q=${name}`).then(res => {
      console.log('Communication success!'); 
      if (res.ok) {
        return res.json(); // res.json() contains a Promise instance
      } else {
        throw new Error(`HTTP status code exception: ${res.status}`);
      }
    }, err => {
      console.error('Communication failure! ', err);
      return new Promise(); // return an initial Promise instance to stop the chain
    }).then(res => {
      PubSub.publish('message', { isLoading: false, users: res.items });
    }).catch(err => {
      console.error('Communication failure! ', err);
      PubSub.publish('message', { isLoading: false, err: err.message });
    });*/

    // use async & await
    /*try {
      const res = await fetch(`/api/search/users?q=${name}`);
      if (res.ok) {
        const data = res.json();
        PubSub.publish('message', { isLoading: false, users: data.items });
      } else {
        throw new Error(`HTTP status code exception: ${res.status}`);
      }
    } catch (err) {
      console.error('Communication failure! ', err);
      PubSub.publish('message', { isLoading: false, err: err.message });
    }*/
    
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
