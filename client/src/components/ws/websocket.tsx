

import { useEffect, useState } from 'react';
// import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ChildComponent from './WsChildComponent';
import CurrentLoggedUser from '../functions/currentLoggedUser';
import WssResultElement from './wsElementOfArray';
import {FormCheck, Form} from 'react-bootstrap';
import { Checkbox } from 'primereact/checkbox';
import './websocket.css';

interface IncomingMessage {
  action: string;
  allowedList: [];
  main: {}
};

interface UserObject {
  id: number;
  role: string;
  userName: string;
}

interface ElementProvider {
  type: JSX.Element;
}

const ws = new WebSocket('ws://127.0.0.1:8000/ws');
// let messageList: any[] = [];
// let resultMessagesArray: JSX.Element[] = [];
// let someArray: JSX.Element[] = [];

let i: number = 0;



const WebsocketData = () => {

  const [messageList, setMessageList] = useState<IncomingMessage[]>([]);
  const [user, setUser] = useState(Object);
  const [messageListElement, setMessageListElement] = useState<ElementProvider>();

  CurrentLoggedUser(setUser);

  const handleChange = (props: any) =>{

    let element = document.getElementById(`task_${props}`);

    if( element && element !== null){
      
      element.className ='websocket-hide';

    }
  }

  useEffect(() => {


    ws.onopen = () => {
      console.log('WebSocket Client Connected');
      // alert("[open] Connection established");
      // alert("Sending to server");
      ws.send(JSON.stringify({
        type: 'userEvent',
        time: new Date()
      }));
    };

    // ws.onmessage = (message: any) => {
    //   console.log(message);
    // };

    console.log(user);


    ws.onmessage = (evt: any) => {
      const messageReceived = JSON.parse(evt.data);
      // const resultArray: never[] = Object.values(messageReceived);
      // setMessage(messageReceived)
      // setMessageList([...messageList, {action:messageReceived.action,date: messageReceived.main[`${messageReceived.action}At`]}]);
      // setMessageList([...messageList, messageReceived]);
      // messageList = ([...messageList, messageReceived]);

      // console.log(resultMessagesArray);
      // console.log(Object.values(messageReceived));
      console.log(messageReceived);
      console.log(messageReceived.action);
      // console.log(messageReceived.main);
      // console.log((messageReceived.main[`${messageReceived.action}At`]));
      if (messageReceived.type === 'fromServer' && (messageReceived.serverMessage).length > 0) {
        let mappingArray: any[] = [];
        messageReceived.serverMessage.forEach((l: any) => {
          let messageParsedValue: any = JSON.parse(l);
          if (messageParsedValue.type !== 'userEvent') {
            console.log(messageParsedValue);
            mappingArray.push(messageParsedValue);
          }
        })
        setMessageList(mappingArray);
        // console.log((messageReceived.serverMessage));
      }
      console.log(messageList);
      // alert(`[message] Data received from server: ${evt.data}`);

      let userId = user.id as never;


      const MessagesList = () => (
        <div>
          {messageList.length > 0 ?
            <ul>{messageList.map((message: any) => (message.allowedList).includes(userId) ? <div key={message.main.taskId+message.main.taskName} id={`task_${message.main.taskId}`} className='websocket-show'><hr/> <li  >
              {/* {(message.allowedList).includes(userId) ? */}
                <div>{message.main.taskType} {message.main.taskName} was changed by {message.main.firstName} {message.main.lastName} on {(new Date(message.main[`${message.action}At`])).toLocaleDateString()} to {message.action}
                <FormCheck type='checkbox' id={`default-${message.main.taskId}`} label={`dismiss`} onChange={()=>handleChange(message.main.taskId)}/>
                </div>
                {/* : <div>no messages 1</div> */}
              {/* } */}
            </li>
            <hr/>
            </div>
            : null
            )}</ul>
            : <div>no messages 2</div>
          }
        </div>
      );

      setMessageListElement(MessagesList);
    }

    ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss

    }

    ws.onerror = () => {
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

  }, [messageList]);


  let userId = user.id as never;


  // const WsComponent = (props: any) => {
  <>
    {/* {props.map((ml: any, mlKey: number) => (
        <div key={mlKey} >{ml}</div>
      ))} */}
  </>
  return (
    <>
      {/* <ChildComponent websocket={ws} /> */}
      {/* {messageList.length > 0 && messageList[0].allowedList.includes(userId) ?
        <div>changed: {messageList[0].action}</div>
        : <div>changed: no messages</div>

      } */}

      {messageListElement}
      {/* {
          <div>
          {messageList.length > 0 ?
            <ul>{messageList.map((message: any) => <li key={message.main.taskId+message.main.taskName}>
              {(message.allowedList).includes(userId) ?
                <div>{message.main.taskType} <span id="ts-span-task-name">{message.main.taskName}</span> was changed by {message.main.firstName} {message.main.lastName} on {(new Date(message.main[`${message.action}At`])).toLocaleDateString()} to <span id="ts-span-task-progress">{message.action}</span></div>
                : null
              }
            </li>)}</ul>
            : null
          }
        </div>
      } */}

      {/* {console.log('message list: ', messageList)} */}
      {/* <Test {...messageList} /> */}
      {/* <WssResultElement /> */}

      {/* <button onClick={() => messageSender()}>Send</button> */}
    </>

  );
  // }
}



export default WebsocketData;
