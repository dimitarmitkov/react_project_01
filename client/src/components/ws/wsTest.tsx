import { Component } from 'react';
import ChildComponent from './WsChildComponent';


class WsTestElement extends Component {

    // instance of websocket connection as a class property
    ws = new WebSocket('ws://localhost:3000/ws');


    onButtonClick = () => {

        this.ws.send(JSON.stringify({
            type: 'message',
            mgs: 'some message from wsTest'
        }));

    }

    // onButtonClickReceive = () => {

    //     this.ws.onmessage(JSON.parse(evt);

    // }

    componentDidMount() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected ws is working')
        }

        this.ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const message = JSON.parse(evt.data)
            this.setState({ dataFromServer: message })
            console.log(message)
        }

        this.ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss

        }

    }
    render() {
        //    return <ChildComponent websocket={this.ws} />
        return <button onClick={this.onButtonClick}>Send</button>
        // return <button onClick={this.onButtonClickReceive(evt)}>Receive</button>

    }

}

export default WsTestElement;