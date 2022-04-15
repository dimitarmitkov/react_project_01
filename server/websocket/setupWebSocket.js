const WebSocket = require("ws");
const { individualPipeline, broadcastPipeline } = require('./pipeline.js');

// accepts an http server (covered later)
module.exports = function setupWebSocket(server) {
    // ws instance
    const wss = new WebSocket.Server({ noServer: true });

    broadcastPipeline(wss.clients);

    // handle upgrade of the request
    server.on("upgrade", function upgrade(request, socket, head) {
        try {
            // authentication and some other steps will come here
            // we can choose whether to upgrade or not

            wss.handleUpgrade(request, socket, head, function done(ws) {
                wss.emit("connection", ws, request);
            });
        } catch (err) {
            console.log("upgrade exception", err);
            socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
            socket.destroy();
            return;
        }
    });

    // what to do after a connection is established
    wss.on("connection", (ctx) => {
        // print number of active connections
        console.log("connected", wss.clients.size);

        // handle message events
        // receive a message and echo it back
        ctx.on("message", (message) => {
            console.log(`Received message => ${message}`);
            ctx.send(`you said ${message}`);
        });
        const interval = individualPipeline(ctx);
        // handle close event
        ctx.on("close", () => {
            console.log("closed", wss.clients.size);
            clearInterval(interval);
        });

        // sent a message that we're good to proceed
        ctx.send("connection established.");
    });
}