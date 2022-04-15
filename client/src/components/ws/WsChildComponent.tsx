import { useEffect, useRef } from "react";

const ws = new WebSocket('ws://127.0.0.1:8000/ws');


// const ChildComponent = (websocket: any) => {
const ChildComponent = (props: any) => {

    // const {websocket} = props;
    // console.log(websocket);
    // const websocket = useRef(props);
    // console.log(websocket);
    // console.log(props);
    
    
    
    
    const messageSender = () =>{

            // websocket.current = new WebSocket('ws://127.0.0.1:3000/ws');
                ws.send(JSON.stringify({
                    type: 'message',
                    msg: 'first successful message'
                }))

    }
   
    // console.log(websocket);
        try {
            
            // websocket.send('message') //send data to the server
        } catch (error) {
            console.log(error) // catch error
        }
        return (
            <div>
                <button onClick={()=>messageSender()}>Send other</button>
            </div>
        );
}

export default ChildComponent;
