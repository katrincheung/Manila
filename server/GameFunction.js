import {getNextPlayer} from "./ControlFunction.js";

export function sitPunt(ws, color, players){
    for(const [uid, player] of Object.entries(players)){
        player.ws.send(`SIT_PUNT ${color} ${ws.NAME}`);
    }
    const nextPlayer = getNextPlayer(players, ws);
    if(nextPlayer.master){
        updateLocation(players)
    }
    nextPlayer.ws.send('YOUR_TURN');
}

export function deploy(ws, location, choice, players){
    for(const [uid, player] of Object.entries(players)){
        player.ws.send(`DEPLOY ${location} ${choice} ${ws.NAME}`);
    }
    const nextPlayer = getNextPlayer(players, ws);
    if(nextPlayer.master){
        updateLocation(players)
    }
    nextPlayer.ws.send('YOUR_TURN');
}

function updateLocation(players){
    const brown = Math.ceil(Math.random() * 6);
    const blue = Math.ceil(Math.random() * 6);
    const yellow = Math.ceil(Math.random() * 6);
    const green = Math.ceil(Math.random() * 6);
    for(const [uid, player] of Object.entries(players)){
        player.ws.send(`LOCATION ${brown} ${blue} ${yellow} ${green}`);
    }
}