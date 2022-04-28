import { useEffect, useState } from 'react';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import { FormCheck, Row } from 'react-bootstrap';
import './websocket.css';

interface IncomingMessage {
  action: string;
  allowedList: [];
  main: {}
};

interface ElementProvider {
  type: JSX.Element;
}

let storedNames: any[] = [];

const ws = new WebSocket('ws://127.0.0.1:8000/ws');

const WebsocketData = () => {

  const [messageList, setMessageList] = useState<IncomingMessage[]>([]);
  const [user, setUser] = useState(Object);
  const [messageListElement, setMessageListElement] = useState<ElementProvider>();
  
    CurrentLoggedUser(setUser);

  const handleChange = (props: string) => {

    // set timestamp and and find element by id
    let value: string = props;

    let element = document.getElementById(`task_${value}`) as HTMLElement;

    if (element && element !== null) {

      // hide element, re-set local storage with new dismissed message
      element.className = 'websocket-hide';
      storedNames.push(value);
      localStorage.setItem("dismissed", JSON.stringify(storedNames));

    }
  }

  // set local storage
  let transferArray = localStorage.getItem("dismissed");
  storedNames = transferArray !== null ? JSON.parse(transferArray) : [];

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

      const MessagesList = () => (
        <Row className='sidebar-row'>
          {messageList.length > 0 ?
            <ul>{messageList.map((message: any) =>
              ((message.allowedList).includes(user.id) && message.action !== 'added') && (!storedNames.includes(`${Date.parse(message.main.createdAt)}_${message.action}_${user.userName}`)) ?
                <div key={message.main.taskName + message.main.createdAt + message.action} id={`task_${Date.parse(message.main.createdAt)}_${message.action}_${user.userName}`} className='websocket-show'><hr /> <li>
                  <div><span id="task-span">{message.main.taskType}</span>&nbsp;
                  '{message.main.taskName}'&nbsp;was changed by&nbsp;
                  <span id="user-span">{message.generator.userGeneratorName ? message.generator.userGeneratorName : user.userName}</span>
                  ,&nbsp;new status:&nbsp;<span id="message-span">{message.action}</span>
                    <FormCheck type='checkbox' id={`default-${message.main.taskId}`} label={`dismiss`} onChange={() => handleChange(`${Date.parse(message.main.createdAt)}_${message.action}_${user.userName}`)} />
                  </div></li><hr /></div>
                :
                ((message.allowedList).includes(user.id) && message.action === 'added') && (!storedNames.includes(`${Date.parse(message.main.createdAt)}_${message.action}_${message.main.firstName}`)) ?
                  <div key={message.main.taskName + message.main.createdAt + message.action + message.main.firstName.replace(/\s/g, '')} 
                  id={`task_${Date.parse(message.main.createdAt)}_${message.action}_${message.main.firstName}`} className='websocket-show'><hr /> <li>
                    <div><span id="task-span">{message.main.taskType}</span>&nbsp;
                    '{message.main.taskName}'&nbsp;was changed, new user&nbsp;<span id="user-span">{message.main.firstName}</span>
                    , was&nbsp;<span id="message-span">{message.action}</span>
                      <FormCheck type='checkbox' id={`default-${message.main.taskId}`} label={`dismiss`} onChange={() => handleChange(`${Date.parse(message.main.createdAt)}_${message.action}_${message.main.firstName}`)} />
                    </div></li><hr /></div>
                  : null
            )}</ul>
            : <div>no messages</div>
          }
        </Row>
      );
      setMessageListElement(MessagesList);
    }

    ws.onerror = () => {
      console.log('error');
    }

    ws.onclose = () => {
      localStorage.clear();
      console.log('connection closed');
    }
  }, [messageList, user]);

  return (
    <>
      {messageListElement}
    </>
  );
}

export default WebsocketData;
