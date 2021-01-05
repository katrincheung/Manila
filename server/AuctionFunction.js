import {getNextPlayer, setNextPlayerTurn, startBuyPhase, startGamePhase} from "./ControlFunction.js";



export function bid(price, players, ws){
    for(let id in players){
        players[id].ws.send(`CURRENT_PRICE ${price}`);
    }
    setNextPlayerTurn(players, ws)
}

export function passAuction(players, ws){
    players[ws.UID].pass = true;
    const nextPlayer = getNextPlayer(players, ws);
    nextPlayer.ws.send(`YOUR_TURN`);
    if (getNextPlayer(players, nextPlayer.ws) === nextPlayer){
        nextPlayer.master = true;
        startBuyPhase(players)
    }
}

export function updatePlayerShare(ws, shareNum, players) {
    for(const [uid, player] of Object.entries(players)){
        if(player.name !== ws.NAME){
            player.ws.send(`UPDATE_PLAYER_SHARE ${ws.NAME} ${shareNum}`)
        }
    }
}

export function updateShareNumber(ws, color, players) {
    for(const [uid, player] of Object.entries(players)){
        player.ws.send(`UPDATE_SHARE_NUMBER ${color}`);
    }
    startGamePhase(players, ws.CODE);
}