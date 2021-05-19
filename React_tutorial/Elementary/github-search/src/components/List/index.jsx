import React, { Component } from "react";
import './index.css';

export default class index extends Component {
  render() {
    const { users } = this.props;
    return (
      <div className="row">
        {
         users.map((user) => {
           return (
            <div key={user.id} className="card">
              <a href={user.html_url} target="_blank" rel="noreferrer">
                <img
                  src={user.avatar_url}
                  alt="avatar"
                  style={{ width: '100px' }}
                />
              </a>
              <p className="card-text">{user.login}</p>
            </div>
           );
         })
        }
      </div>
    );
  }
}
