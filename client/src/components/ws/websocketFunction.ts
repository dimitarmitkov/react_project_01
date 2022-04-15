const ws = new WebSocket('ws://127.0.0.1:3000/ws');


const WebsocketFunction = () => {

  ws.onopen = () => {
    console.log('WebSocket Client Connected');
    // alert("[open] Connection established");
  // alert("Sending to server");
  // ws.send("Dimitar");
  };

  // ws.onmessage = (message: any) => {
  //   console.log(message);
  // };

  ws.onmessage = (evt: any) => {
    const messageReceived = JSON.parse(evt.data);
    // setMessage(messageReceived)
    console.log(messageReceived);
    // alert(`[message] Data received from server: ${evt.data}`);
  }

  ws.onclose = () => {
    console.log('disconnected')
    // automatically try to reconnect on connection loss

  }

  ws.onerror = () =>{
    console.log('error');
    
  }

  ws.onclose = (evt) => {
    if (evt.wasClean) {
      // alert(`[close] Connection closed cleanly, code=${evt.code} reason=${evt.reason}`);
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      // alert('[close] Connection died');
    }
  };

}

export default WebsocketFunction;
