import React, { useState, useEffect, useRef, createRef } from 'react';
import useWebSocketLite from './webSocketHook';
// import useWebSocket from 'ws';

// prettify
const sendTag = (message: any) => <div>&#11014;: {message}</div>;
const receiveTag = (message: any) => <div>&#11015;: {message}</div>;

function WssElement() {
//   const [messagesList, setMessagesList] = useState([
//     <div>Messages will be displayed here</div>
//   ]);
  const [messagesList, setMessagesList] = useState<JSX.Element[]>([]);
  
//   const txtRef = useRef();
  const txtRef = createRef();

  // use our hook
  const ws = useWebSocketLite({
    socketUrl: 'ws://localhost:8080/ws'
  });

  // receive messages
  useEffect(() => {
    if (ws.data) {
      const message  = Object.entries( ws.data);
      setMessagesList((messagesList) =>
        [...messagesList,receiveTag(message)]
      );
    }
  }, [ws.data]);

  // send messages
  const sendData = () => {
    const message = txtRef.current ? txtRef.current : 'message';
    if (message) {
      setMessagesList((messagesList) =>
        [...messagesList,sendTag(message)]
      );
    //   ws.send(message);
      ws.send();
    }
  };

  // a simple form
  return (
    <div>
       <div>Connection State: {ws.readyState ? 'Open' : 'Closed'}</div>

      <div>      
       <form>
          <label>Message (string or json)</label>
          <textarea name='message' rows={4} ref =  {txtRef as React.RefObject<HTMLTextAreaElement>} />
          <input type='button' onClick={sendData} value='Send' />
        </form>
      </div>

      <div style={{ maxHeight: 300, overflowY: 'scroll' }}>
        {messagesList.map((Tag, i) => (
          <div key={i}>{Tag}</div>
        ))}
      </div>

    </div>
  );
}

export default WssElement;
