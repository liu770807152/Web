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

  pushShow = (id, title) => {
    this.props.history.push(`/home/message/detail/${id}/${title}`);
  }

  // pushShow = (id, title) => {
  //   this.props.history.push(`/home/message/detail?id=${id}&title=${title}`);
  // }

  // pushShow = (id, title) => {
  //   this.props.history.push(`/home/message/detail`, { id, title });
  // }

  replaceShow = (id, title) => {
    this.props.history.replace(`/home/message/detail/${id}/${title}`);
  }

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
                  <Link to={`/home/message/detail/${id}/${title}`}>{title}</Link>
                  &nbsp;<button onClick={() => this.pushShow(id, title)}>use push mode</button>
                  &nbsp;<button onClick={() => this.replaceShow(id, title)}>use replace mode</button>

                  {/* pass search to Route component */}
                  {/* <Link to={`/home/message/detail/?id=${id}&title=${title}`}>{title}</Link> */}
                  {/* &nbsp;<button onClick={() => this.pushShow(id, title)}>use push mode</button>
                  &nbsp;<button onClick={() => this.replaceShow(id, title)}>use replace mode</button> */}

                  {/* pass state to Route component */}
                  {/* <Link
                    replace={true}
                    to={{
                      pathname: '/home/message/detail',
                      state: { id, title }
                    }}
                  >
                    {title}
                  </Link> */}
                  {/* &nbsp;<button onClick={() => this.pushShow(id, title)}>use push mode</button>
                  &nbsp;<button onClick={() => this.replaceShow(id, title)}>use replace mode</button> */}
                </li>
              );
            })
          }
        </ul>
        <hr />
        {/* Receive params in Route */}
        <Route path="/home/message/detail/:id/:title" component={Detail} />

        {/* Receive search or state in Route (do nothing!) */}
        {/* <Route path="/home/message/detail" component={Detail} /> */}
      </>
    )
  }
}
