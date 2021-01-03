import {getNextPlayer} from "./ControlFunction.js";

export function sitPunt(ws, color, players){
    for(const [uid, player] of Object.entries(players)){
        player.ws.send(`SIT_PUNT ${color} ${ws.NAME}`);
    }
    getNextPlayer(players, ws).ws.send('YOUR_TURN');
}

export function deploy(ws, location, choice, players){
    for(const [uid, player] of Object.entries(players)){
        player.ws.send(`DEPLOY ${location} ${choice} ${ws.NAME}`);
    }
    getNextPlayer(players, ws).ws.send('YOUR_TURN');
}