import React, { Component } from 'react';
// import { w3cwebsocket as W3CWebSocket } from '../../../node_modules/websocket/index.js';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

// 'client/node_modules/websocket/index.js';

const client = new W3CWebSocket('ws://127.0.0.1:8000');

class WebsocketData extends Component {
  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message: any) => {
      console.log(message);
    };
  }
  
  render() {
    return (
      <div>
        Practical Intro To WebSockets.
      </div>
    );
  }
}

export default WebsocketData;