import handleLoginRequest, { handleGameStartRequest } from "./LoginFunction.js";
import Player from "./Player.js";

let rooms = {};

export default function handleSockets(ws, messageQueue) {
    if (messageQueue.length != 0){
        let command = messageQueue[0];
        switch(command){
            case 'NAME_INPUT':
                let name = messageQueue[1];
                let code = messageQueue[2];
                console.log(`name = ${name} code = ${code}`);
                const player = new Player(name, ws);
                rooms = handleLoginRequest(code, rooms, player);
                break;
            case 'GAME_START':
                handleGameStartRequest(rooms[messageQueue[1]]);
                break;
            default:
                console.log(`unknownInput = ${messageQueue}`);
                break;
        }
    }
}

export function handleDisconnection() {
    let index = -1;
    let code = '';
    for (let roomCode in rooms) {
        rooms[roomCode].forEach( (player, i) => {
            if(player.ws.readyState == 3){
                index = i;
                code = roomCode;
            }
        })
    }
    if(index != -1){
        rooms[code].splice(index, 1);
        if(index == 0){
            rooms[code].forEach( player => player.ws.send('HOST_DISCONNECTED'));
            delete rooms[code];
        }else{
            let nameList = [];
            rooms[code].forEach(player => nameList.push(player.name));
            rooms[code].forEach( player => player.ws.send(['PLAYER_LIST',nameList.join(' ')].join(' ')) );
        }
    }
}