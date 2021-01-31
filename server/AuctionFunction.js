import {getNextPlayer, setNextPlayerTurn, startBuyPhase, startGamePhase} from "./ControlFunction.js";



export function bid(price, game, ws){
    game.send(`CURRENT_PRICE ${price}`)
    setNextPlayerTurn(game, ws)
}

export function passAuction(game, ws){
    game.players[ws.UID].pass = true;
    const nextPlayer = getNextPlayer(game.players, ws);
    nextPlayer.ws.send(`YOUR_TURN`);
    if (getNextPlayer(game.players, nextPlayer.ws) === nextPlayer){
        nextPlayer.master = true;
        startBuyPhase(game)
    }
}

export function updatePlayerShare(ws, shareNum, game) {
    for(const [uid, player] of Object.entries(game.players)){
        if(player.name !== ws.NAME){
            player.ws.send(`UPDATE_PLAYER_SHARE ${ws.NAME} ${shareNum}`)
        }
    }
}

export function updateShareNumber(ws, color, game) {
    switch (color){
        case 'brown':
            game.remain_shares[0] -= 1;
            game.players[ws.UID].shares[0] += 1;
            break;
        case 'blue':
            game.remain_shares[1] -= 1;
            game.players[ws.UID].shares[1] += 1;
            break;
        case 'yellow':
            game.remain_shares[2] -= 1;
            game.players[ws.UID].shares[2] += 1;
            break;
        default:
            game.remain_shares[3] -= 1;
            game.players[ws.UID].shares[3] += 1;
            break;
    }
    for(let id in game.players){
        game.players[id].ws.send(`UPDATE_SHARE_NUMBER ${color}`);
    }

    startGamePhase(game);
}