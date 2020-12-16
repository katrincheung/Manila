import handleLoginRequest, { handleGameStartRequest } from "./LoginFunction.js";
import Player from "./Player.js";
import { bid, passAuction } from "./AuctionFunction.js";
import {gameSetUp, updateGlobalSharePrice, updateMoney, updatePlayerShare, updateShareNumber} from "./GameFunction.js";


let waitingRooms = {};
let playingRooms = {};
let inGame = false;

export default function handleSockets(ws, message) {
    let command = message[0];
    if(!inGame){
        switch(command){
            case 'LOGIN':
                ws.NAME = message[1];
                ws.CODE = message[2];
                const player = new Player(ws.NAME, ws);
                waitingRooms = handleLoginRequest(ws.CODE, waitingRooms, player);
                break;
            case 'GAME_START':
                playingRooms[ws.CODE] = handleGameStartRequest(waitingRooms[ws.CODE]);
                inGame = true;
                gameSetUp(playingRooms[ws.CODE])
                console.log('gameSetUp done');
                ws.send('YOUR_AUCTION');
                break;
            default:
                console.log(`unknownInput = ${message}`);
                break;
        }
    }
    else{
        switch (command){
            case 'BID':
                bid(message[1], playingRooms[ws.CODE], ws);
                break;
            case 'PASS':
                passAuction(playingRooms[ws.CODE], ws)
                break;
            case 'UPDATE_MONEY':
                updateMoney(ws, message[1], playingRooms[ws.CODE])
                break;
            case 'UPDATE_PLAYER_SHARE':
                updatePlayerShare(ws, message[1], playingRooms[ws.CODE])
                break;
            case 'UPDATE_SHARE_NUMBER':
                updateShareNumber(ws, message[1], playingRooms[ws.CODE])
                break;
            case 'UPDATE_GLOBAL_SHARE_PRICE':
                updateGlobalSharePrice(ws, message[1], message[2], message[3], message[4], playingRooms[ws.CODE])
                break;
            default:
                console.log(`unknownInput = ${message}`);
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