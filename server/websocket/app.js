const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const setupWebSocket = require('./setupWebSocket.js');
const wssPort = 8080;


const wssApp = express();
const server = http.createServer(wssApp);

wssApp.use(express.json());


// pass the same server to our websocket setup function
// the websocket server will the run on the same port
// accepting ws:// connections
setupWebSocket(server);

wssApp.listen(wssPort, () => {
    console.log('Websocket server is listening on port: ', wssPort);
})