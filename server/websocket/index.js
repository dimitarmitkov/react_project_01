const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

// Spinning the http server and the websocket server.
const server = http.createServer();

server.listen(webSocketsServerPort, () => {
    console.log('Websocket server is listening on port: ', webSocketsServerPort);
});

const wsServer = new webSocketServer({
    httpServer: server
});

const clients = {};
let messages = [];

// This code generates unique userid for everyuser.
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wsServer.on('request', function(request) {
    var userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
    // You can rewrite this part of the code to accept only the requests from allowed origin
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    // console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // console.log('received message', message.utf8Data);
            messages = [...messages, message.utf8Data];
            console.log(messages);
            connection.send(JSON.stringify({
                type: 'fromServer',
                serverMessage: messages
            }));
        }
        // console.log('key here');

        for (const key in clients) {
            clients[key].sendUTF(message.utf8Data);
            // console.log('message to: ', clients[key]);
            // console.log(message.type);
        }
    })
});