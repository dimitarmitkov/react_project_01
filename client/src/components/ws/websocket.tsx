import { useEffect, useState } from 'react';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import { FormCheck, Row } from 'react-bootstrap';
import './websocket.css';
import ErrorComponent from '../error/ErrorComponent';
import configData from '../../config.json';

interface IncomingMessage {
  action: string;
  allowedList: [];
  main: {}
};

interface PropsElement {
  type: JSX.Element;
}

interface PropsCurrentUser {
    id?: number;
    role?: string;
    userName?: string;
}

let storedNames: any[] = [];

const ws = new WebSocket(configData.WEBSOCKET_URL);

const WebsocketData = () => {

  const [messageList, setMessageList] = useState<IncomingMessage[]>([]);
  const [messageListElement, setMessageListElement] = useState<PropsElement>();
  const [hasError, setHasError] = useState(false);

  const user: PropsCurrentUser = CurrentLoggedUser()!;

  const handleChange = (props: string) => {

    // set timestamp and and find element by id
    let value: string = props;

    let element = document.getElementById(`task_${value}`) as HTMLElement;

    if (element && element !== null) {

      // hide element, re-set local storage with new dismissed message
      element.className = 'websocket-hide';
      storedNames.push(value);
      localStorage.setItem('dismissed', JSON.stringify(storedNames));

    }
  }

  // set local storage
  let transferArray = localStorage.getItem('dismissed');
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
        try {
          setMessageList(mappingArray);
        } catch (error) {
          setHasError(true);
        }
      }

      const hasUserId = user ? user.id : null;
      const hasUserName = user ? user.userName : null;

      const MessagesList = () => (

        <Row className="sidebar-row">
          {messageList.length > 0 ?
            <ul>{messageList.map((message: any) =>
              ((message.allowedList).includes(hasUserId) && message.action !== "added") && (!storedNames.includes(`${Date.parse(message.main.createdAt)}_${message.action}_${hasUserName}`)) ?
                <div key={message.main.taskName + message.main.createdAt + message.action} id={`task_${Date.parse(message.main.createdAt)}_${message.action}_${hasUserName}`} className="websocket-show">
                  <li>
                    <div>
                      <span id="task-span">{message.main.taskType}</span>
                      &nbsp;'{message.main.taskName}'&nbsp;was changed by&nbsp;
                      <span id="user-span">{message.generator.userGeneratorName ? message.generator.userGeneratorName : hasUserName}</span>
                      ,&nbsp;new status:&nbsp;
                      <span id="message-span">{message.action}</span>
                      <FormCheck type="checkbox" id={`default-${message.main.taskId}`} label={`dismiss`} onChange={() => handleChange(`${Date.parse(message.main.createdAt)}_${message.action}_${hasUserName}`)} />
                    </div>
                  </li>
                </div>
                :
                ((message.allowedList).includes(hasUserId) && message.action === "added") && (!storedNames.includes(`${Date.parse(message.main.createdAt)}_${message.action}_${message.main.firstName}`)) ?
                  <div key={message.main.taskName + message.main.createdAt + message.action + message.main.firstName.replace(/\s/g, "")}
                    id={`task_${Date.parse(message.main.createdAt)}_${message.action}_${message.main.firstName}`} className="websocket-show"> 
                    <li>
                      <div>
                        <span id="task-span">{message.main.taskType}</span>
                        &nbsp; '{message.main.taskName}'&nbsp;was changed, new user &nbsp;
                        <span id="user-span">{message.main.firstName}</span>
                        , was&nbsp;
                        <span id="message-span">{message.action}</span>
                        <FormCheck type="checkbox" id={`default-${message.main.taskId}`} label={`dismiss`} onChange={() => handleChange(`${Date.parse(message.main.createdAt)}_${message.action}_${message.main.firstName}`)} />
                      </div>
                    </li>
                  </div>
                  : null
            )}</ul>
            : <div>no messages</div>
          }
        </Row>
      );

      try {
        setMessageListElement(MessagesList);
      } catch (error) {
        setHasError(true);
      }
    }

    ws.onerror = () => {
      <ErrorComponent />
    }

    ws.onclose = () => {
      localStorage.clear();
      console.log('connection closed');
    }
  }, [messageList, user]);

  if (!hasError) {

    return (
      <>
        {messageListElement}
      </>
    );
  } else {

    return <ErrorComponent />
  }
}

export default WebsocketData;
