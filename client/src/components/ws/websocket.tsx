

import { useEffect, useState } from 'react';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import { FormCheck } from 'react-bootstrap';
import './websocket.css';

interface IncomingMessage {
  action: string;
  allowedList: [];
  main: {}
};

interface ElementProvider {
  type: JSX.Element;
}

const ws = new WebSocket('ws://127.0.0.1:8000/ws');

const WebsocketData = () => {

  const [messageList, setMessageList] = useState<IncomingMessage[]>([]);
  const [user, setUser] = useState(Object);
  const [messageListElement, setMessageListElement] = useState<ElementProvider>();

  CurrentLoggedUser(setUser);

  // set local storage
  let transferArray = localStorage.getItem("dismissed");
  let storedNames: any[] = transferArray !== null ? JSON.parse(transferArray) : [];

  const handleChange = (props: string) => {

    // set timestamp and and find element by id
    let value: number = Date.parse(props);
    let element = document.getElementById(`task_${props}`);

    if (element && element !== null) {

      // hide element, re-set local storage with new dismissed message
      element.className = 'websocket-hide';
      storedNames.push(value);
      localStorage.setItem("dismissed", JSON.stringify(storedNames));

    }
  }

  useEffect(() => {

    ws.onopen = () => {
      console.log('WebSocket Client Connected');
      ws.send(JSON.stringify({
        type: 'userEvent',
        time: new Date()
      }));
    };

    ws.onmessage = (evt: any) => {
      const messageReceived = JSON.parse(evt.data);

      if (messageReceived.type === 'fromServer' && (messageReceived.serverMessage).length > 0) {
        let mappingArray: any[] = [];
        messageReceived.serverMessage.forEach((l: any) => {
          let messageParsedValue: any = JSON.parse(l);
          if (messageParsedValue.type !== 'userEvent') {
            mappingArray.push(messageParsedValue);
          }
        })
        setMessageList(mappingArray);
      }

      let userId = user.id as never;

      const MessagesList = () => (
        <div>
          {messageList.length > 0 ?
            <ul>{messageList.map((message: any) => (message.allowedList).includes(userId) && !storedNames.includes(Date.parse(message.main.initiatedAt)) ? <div key={message.main.taskName + message.main.initiatedAt} id={`task_${message.main.initiatedAt}`} className='websocket-show'><hr /> <li  >
              <div><span id="task-span">{message.main.taskType}</span> '{message.main.taskName}' was changed by <span id="user-span">{message.main.firstName} {message.main.lastName}</span>, new status: <span id="message-span">{message.action}</span>
                <FormCheck type='checkbox' id={`default-${message.main.taskId}`} label={`dismiss`} onChange={() => handleChange(message.main.initiatedAt)} />
              </div>
            </li>
              <hr />
            </div>
              : null
            )}</ul>
            : <div>no messages</div>
          }
        </div>
      );
      setMessageListElement(MessagesList);
    }

    ws.onerror = () => {
      console.log('error');
    }
    
    ws.onclose = (evt) => {
      if (evt.wasClean) {
        localStorage.clear();
      } else {
       
      }
    };

  }, [messageList]);

  return (
    <>
      {messageListElement}
    </>
  );
}

export default WebsocketData;