import {getNextPlayer} from "./ControlFunction.js";
import GameInfo from "./GameInfo.js";

const game = {};

export function initGame(code){
    game[code] = new GameInfo(code);
}

export function sitPunt(ws, color, players){
    for(const [uid, player] of Object.entries(players)){
        player.ws.send(`SIT_PUNT ${color} ${ws.NAME}`);
    }
    const nextPlayer = getNextPlayer(players, ws);
    if(nextPlayer.master){
        updateLocation(players, ws.CODE)
    }
    nextPlayer.ws.send('YOUR_TURN');
}

export function deploy(ws, location, choice, players){
    for(const [uid, player] of Object.entries(players)){
        player.ws.send(`DEPLOY ${location} ${choice} ${ws.NAME}`);
    }
    const nextPlayer = getNextPlayer(players, ws);
    if(nextPlayer.master){
        updateLocation(players, ws.CODE)
    }
    nextPlayer.ws.send('YOUR_TURN');
    if (location == 'PILOT'){
        if (choice == 'large')
            game[ws.CODE].largePilot = true;
        else{
            game[ws.CODE].smallPilot = true;
        }
    }
}

function updateLocation(players, code){
    const brown = Math.ceil(Math.random() * 6);
    const blue = Math.ceil(Math.random() * 6);
    const yellow = Math.ceil(Math.random() * 6);
    const green = Math.ceil(Math.random() * 6);
    if (game[code].round === 2){
        if (game[code].smallPilot == true){
            console.log('wait for small pilot action');
        }
        if (game[code].largePilot == true){
            console.log('wait for large pilot action');
        }
    }
    for(const [uid, player] of Object.entries(players)){
        player.ws.send(`LOCATION ${brown} ${blue} ${yellow} ${green}`);
    }
    game[code].round += 1;
    console.log('round', game[code].round, 'end');
}