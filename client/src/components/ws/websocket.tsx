import { useEffect, useState } from 'react';
import useCurrentLoggedUser from '../../hooks/setCurrentLoggedUser';
import { FormCheck, Row } from 'react-bootstrap';
import './websocket.css';
import ErrorComponent from '../error/ErrorComponent';
import configData from '../../config.json';

interface ElementProps {
  type: JSX.Element;
};

interface CurrentUserProps {
  id?: number;
  role?: string;
  userName?: string;
};

interface MessageParsedValueProps {
  action: string;
  type: string;
  allowedList: [];
  generator: {
    userGeneratorId: number;
    userGeneratorName: string;
    userGeneratorRole: string;
  }
  main: {
    createdAt: string;
    id: number;
    initiatedByUserId: number;
    taskName: string;
    taskProgress: string;
    taskType: string;
    taskId: number;
    firstName: string
  }
};

let storedNames: string[] = [];

const ws = new WebSocket(configData.WEBSOCKET_URL);

const WebsocketData = () => {

  const [messageList, setMessageList] = useState<MessageParsedValueProps[]>([]);
  const [messageListElement, setMessageListElement] = useState<ElementProps>();
  const [hasError, setHasError] = useState(false);

  const user: CurrentUserProps = useCurrentLoggedUser()!;
  const currentUser = user!;

  const handleChange = (props: string) => {

    // set timestamp and and find element by id
    const value: string = props;

    const element = document.getElementById(`task_${value}`) as HTMLElement;

    if (element && element !== null) {

      // hide element, re-set local storage with new dismissed message
      element.className = 'websocket-hide';
      storedNames.push(value);
      localStorage.setItem('dismissed', JSON.stringify(storedNames));

    }
  }

  // set local storage
  const transferArray = localStorage.getItem('dismissed');
  storedNames = transferArray !== null ? JSON.parse(transferArray) : [];

  useEffect(() => {

    ws.onopen = () => {
      console.log('WebSocket Client Connected');
      ws.send(JSON.stringify({
        type: 'userEvent',
        time: new Date()
      }));
    };

    ws.onmessage = (evt: MessageEvent) => {
      const messageReceived: { type: string, serverMessage: [] } = JSON.parse(evt.data);


      if (messageReceived.type === 'fromServer' && (messageReceived.serverMessage).length > 0) {
        const mappingArray: MessageParsedValueProps[] = [];
        messageReceived.serverMessage.forEach((message: string) => {
          const messageParsedValue: MessageParsedValueProps = JSON.parse(message);
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

      try {
        const hasUserId = currentUser.id as never;
        const hasUserName = currentUser.userName!;

        const MessagesList = () => (

          <Row className="sidebar-row">
            {messageList.length > 0 ?
              <ul>{messageList.map((message: MessageParsedValueProps) =>
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

      } catch (error) {
        console.log(error);
        // console.log(window.location.pathname);

        if (error instanceof Error) {
          if (window.location.pathname !== '/login' && error.message.includes('Cannot read properties of undefined (reading \'id\')')) {

            setTimeout(()=>{ 
              if(!user){
    
                window.location.reload();
              }
        }, 5000);


            // setTimeout(()=>{ 
            //   window.location.reload();
            // }, 5000);
          }
        }
      }

    }

    ws.onerror = () => {
      <ErrorComponent />
    }

    ws.onclose = () => {
      localStorage.clear();
      console.log('connection closed');
    }
  }, [messageList, currentUser]);

  if (!hasError) {

    return (
      <>
        {messageListElement}
      </>
    );
  } else {

    // return <ErrorComponent />
    return <h5>Mitko</h5>
  }
}

export default WebsocketData;
