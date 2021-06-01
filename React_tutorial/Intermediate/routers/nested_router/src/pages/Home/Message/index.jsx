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
      <>
        <ul>
          {
            messageArr.map((msg) => {
              const id = msg.id, title = msg.title;
              return (
                <li key={id}>
                  {/* pass params to Route component */}
                  {/* <Link to={`/home/message/detail/${msg.id}/${msg.title}`}>{msg.title}</Link> */}

                  {/* pass search to Route component */}
                  {/* <Link to={`/home/message/detail/?id=${msg.id}&title=${msg.title}`}>{msg.title}</Link> */}

                  {/* pass state to Route component */}
                  <Link
                    replace={true}
                    to={{
                      pathname: '/home/message/detail',
                      state: { id, title }
                    }}
                  >
                    {title}
                  </Link>
                </li>
              );
            })
          }
        </ul>
        <hr />
        {/* Receive params in Route */}
        {/* <Route path="/home/message/detail/:id/:title" component={Detail} /> */}

        {/* Receive search or state in Route (do nothing!) */}
        <Route path="/home/message/detail" component={Detail} />
      </>
    )
  }
}
