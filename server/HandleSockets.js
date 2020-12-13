import handleLoginRequest, { handleGameStartRequest } from "./LoginFunction.js";
import Player from "./Player.js";
import { bid, passAuction } from "./AuctionFunction.js";
import { gameSetUp } from "./GameFunction.js";


let waitingRooms = {};
let playingRooms = {};
let inGame = false;

export default function handleSockets(ws, messageQueue) {
    let command = messageQueue[0];
    let code = '';
    let name = '';
    if(!inGame){
        switch(command){
            case 'NAME_INPUT':
                name = messageQueue[1];
                code = messageQueue[2];
                console.log(`name = ${name} code = ${code}`);
                const player = new Player(name, ws);
                waitingRooms = handleLoginRequest(code, waitingRooms, player);
                break;
            case 'GAME_START':
                playingRooms[ws.CODE] = handleGameStartRequest(waitingRooms[ws.CODE]);
                inGame = true;
                gameSetUp(playingRooms[ws.CODE])
                console.log('gameSetUp done');
                ws.send('YOUR_AUCTION');
                break;
            default:
                console.log(`unknownInput = ${messageQueue}`);
                break;
        }
    }
    else{
        switch (command){
            case 'BID':
                bid(messageQueue[1], playingRooms[ws.CODE], ws);
                break;
            case 'PASS':
                passAuction(playingRooms[ws.CODE], ws)
                break;
            case 'UPDATE':
                //update normal status;
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