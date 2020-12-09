import handleSockets from './HandleSockets.js';
import WebSocket from "ws";
import { handleDisconnection } from "./HandleSockets.js";


const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {

    ws.on('message', (message) => {
        let messageQueue = message.split(' ');
        console.log(messageQueue);
        handleSockets(ws, messageQueue);
    })

    ws.on('close', () => handleDisconnection());

    ws.send('Server connected')

})
