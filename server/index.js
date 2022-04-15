global.__basedir = __dirname;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const utils = require('./utils');
const { server: { port, cors: corsConfig } } = require('./config');
const api = require('./api');
const tapLog = require('./utils/tap-log');
const globalErrorHandler = require('./global-error-handler');
const { allowedNodeEnvironmentFlags } = require('process');
const passport = require('passport');
const session = require('express-session');
const myKey = require("./api/connection/myKey");
const jwt = require("jsonwebtoken");
const jsonwebtoken = require('express-jwt');
const wssPort = 8080;
const http = require('http');
const setupWebSocket = require('./websocket/setupWebSocket.js');




// websocket
// const webSocketsServerPort = 8000;
// const webSocketServer = require('websocket').server;
// const http = require('http');


const app = express();

app.use(cors({
    origin: corsConfig.urls,
    credentials: corsConfig.credentials,
    exposedHeaders: corsConfig.exposedHeaders
}));

app.use('/public', express.static('public'));

app.use(cookieParser());
app.use(bodyParser.json({ limit: '10000mb' }));

app.use(bodyParser.urlencoded({ limit: '10000mb', extended: true }));
app.use(express.static(path.resolve(__basedir, 'static')));

api.connect('/api/v1', app);

app.use('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'htmlStatic', 'index.html'));
});

app.use(globalErrorHandler);

function appListen() {
    return new Promise((resolve, reject) => {
        app.listen(port, function() { resolve(); })
    });
}

appListen().then(tapLog(`Server is listening on :${port}`))
    .catch(error => console.log(`Server Error: ${error.message}`));


// websocket
// const serverWebSocket = http.createServer();
// serverWebSocket.listen(webSocketsServerPort);

// const wsServer = new webSocketServer({
//     httpServer: serverWebSocket
// });

// wsServer.on('request', function(request) {
//     var userID = 'getUniqueID()';
//     // console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
//     // console.log(request);
//     // You can rewrite this part of the code to accept only the requests from allowed origin
//     const connection = request.accept(null, request.origin);
//     // clients[userID] = connection;
//     // console.log('connected: ' + 'userID' + ' in ' + Object.getOwnPropertyNames(clients));
//     console.log('connected: ' + 'userID' + ' in ');
//     // request.on('message', (data) => {
//     //     console.log('data', data);
//     // });

//     // request.on('send', (data) => {
//     //     console.log('data2', data);
//     // })

// });
// wsServer.on('message', function(message) {
//     console.log(message);
// })


// working variant START
// const webSocketsServerPort = 8000;
// const webSocketServer = require('websocket').server;
// // const http = require('http');
// // Spinning the http server and the websocket server.
// const server = http.createServer();
// server.listen(webSocketsServerPort);
// const wsServer = new webSocketServer({
//     httpServer: server
// });

// const clients = {};

// // This code generates unique userid for everyuser.
// const getUniqueID = () => {
//     const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
//     return s4() + s4() + '-' + s4();
// };

// wsServer.on('request', function(request) {
//     var userID = getUniqueID();
//     console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
//     // You can rewrite this part of the code to accept only the requests from allowed origin
//     const connection = request.accept(null, request.origin);
//     clients[userID] = connection;
//     console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

//     connection.on('message', function(message) {
//         if (message.type === 'utf8') {
//             console.log('received message', message.utf8Data);
//         }
//         console.log('key here');

//         for (const key in clients) {
//             clients[key].sendUTF(message.utf8Data);
//             // console.log('message to: ', clients[key]);
//             console.log(message.type);
//         }
//     })
// });

// working variant END


// const wssApp = express();
// const wssServer = http.createServer(wssApp);

// wssApp.use(express.json());

// setupWebSocket(wssServer);

// wssApp.listen(wssPort, () => {
//     console.log('Websocket server is listening on port: ', wssPort);
// })