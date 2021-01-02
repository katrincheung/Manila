import {getNextPlayer} from "./ControlFunction.js";

export function sitPunt(ws, color, players){
    for(const [uid, player] of Object.entries(players)){
        if(player.name !== ws.NAME){
            player.ws.send(`SIT_PUNT ${color} ${ws.NAME}`);
        }
    }
    getNextPlayer(players, ws).ws.send('YOUR_TURN');
}