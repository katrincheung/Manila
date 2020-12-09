import handleLoginRequest, { handleGameStartRequest } from "./LoginFunction.js";
import Player from "./Player.js";

let waitingRooms = {};
let playingRooms = {};
let inGame = true;

export default function handleSockets(ws, messageQueue) {
    let command = messageQueue[0];
    if(!inGame){
        switch(command){
            case 'NAME_INPUT':
                let name = messageQueue[1];
                let code = messageQueue[2];
                console.log(`name = ${name} code = ${code}`);
                const player = new Player(name, ws);
                waitingRooms = handleLoginRequest(code, waitingRooms, player);
                break;
            case 'GAME_START':
                //code = waitingRooms[messageQueue[1]]
                playingRooms[waitingRooms[messageQueue[1]]] = handleGameStartRequest(waitingRooms[messageQueue[1]]);
                break;
            default:
                console.log(`unknownInput = ${messageQueue}`);
                break;
        }
    }
    else{
        switch (command){
            case 'BID':

                break;
            case 'PASS':
                break;
        }
    }
}

export function handleDisconnection() {
    let index = -1;
    let code = '';
    for (let roomCode in waitingRooms) {
        waitingRooms[roomCode].forEach( (player, i) => {
            if(player.ws.readyState == 3){
                index = i;
                code = roomCode;
            }
        })
    }
    if(index != -1){
        waitingRooms[code].splice(index, 1);
        if(index == 0){
            waitingRooms[code].forEach( player => player.ws.send('HOST_DISCONNECTED'));
            delete waitingRooms[code];
        }else{
            let nameList = [];
            waitingRooms[code].forEach(player => nameList.push(player.name));
            waitingRooms[code].forEach( player => player.ws.send(['PLAYER_LIST',nameList.join(' ')].join(' ')) );
        }
    }
}