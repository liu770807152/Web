import React, { Component } from "react";
import { Link, Route } from 'react-router-dom';
import Detail from './Detail';

export default class Message extends Component {
  state = {
    messageArr: [
      {
        id: '01', title: 'message1'
      },
      {
        id: '02', title: 'message2'
      },
      {
        id: '03', title: 'message3'
      },
    ]
  }

  render() {
    const { messageArr } = this.state;
    return (
      <div>
        <ul>
          {
            messageArr.map((msg) => {
              return (
                <li key={msg.id}>
                  {/* pass params to Route component */}
                  <Link to={`/home/message/detail/${msg.id}/${msg.title}`}>{msg.title}</Link>
                </li>
              )
            })
          }
        </ul>
        <hr />
        {/* Receive params in Route */}
        <Route path="/home/message/detail/:id/:title" component={Detail} />
      </div>
    )
  }
}
