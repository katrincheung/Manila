import handleLoginRequest, { handleGameStartRequest } from "./LoginFunction.js";
import Player from "./Player.js";
import {bid, passAuction, updatePlayerShare, updateShareNumber, buyShare, choosePunt} from "./AuctionFunction.js";
import { sitPunt, deploy } from "./GameFunction.js";
import { startAuction, startGamePhase} from "./ControlFunction.js";
import Game from "./Game.js";


let waitingRooms = {};
let games = {};
let inGame = false;
/*
playingRooms = {
    roomCode : {
        players = {
            playerId = {
                player:{ ws, name, next, pass }
                }
        }
    }
}
 */

export default function handleSockets(ws, msg) {
    let command = msg[0];
    if(!inGame){
        switch(command){
            case 'LOGIN':
                ws.NAME = msg[1];
                ws.CODE = msg[2];
                const player = new Player(ws.NAME, ws);
                waitingRooms = handleLoginRequest(ws.CODE, waitingRooms, player);
                break;
            case 'GAME_START':
                games[ws.CODE] = new Game(ws.CODE);
                handleGameStartRequest(games[ws.CODE], waitingRooms[ws.CODE]);
                inGame = true;
                startAuction(games[ws.CODE])
                ws.send('YOUR_TURN');
                break;
            default:
                console.log(`unknownInput = ${msg}`);
                break;
        }
    }
    else{
        switch (command){
            case 'BID':
                bid(msg[1], games[ws.CODE], ws);
                break;
            case 'PASS':
                passAuction(games[ws.CODE], ws)
                break;
            case 'PAY':
                games[ws.CODE].players[ws.UID].pay(parseInt(msg[1],10), games[ws.CODE])
                break;
            case 'UPDATE_PLAYER_SHARE':
                updatePlayerShare(ws, msg[1], games[ws.CODE])
                break;
            case 'UPDATE_SHARE_NUMBER':
                updateShareNumber(ws, msg[1], games[ws.CODE])
                startGamePhase(games[ws.CODE], ws.CODE)
                break;
            case 'CHOOSE_PUNT':
                choosePunt(games[ws.CODE], msg[1], msg[2], msg[3], msg[4], msg[5], msg[6])
                break;
            case 'BUY_SHARE':
                buyShare(ws, msg[1], games[ws.CODE])
                break;
            case 'SIT_PUNT':
                sitPunt(ws, msg[1], games[ws.CODE])
                break;
            case 'DEPLOY':
                deploy(ws, msg[1], msg[2], games[ws.CODE])
                break;
            default:
                console.log(`unknownInput = ${msg}`);
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