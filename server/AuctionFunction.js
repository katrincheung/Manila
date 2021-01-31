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

export function updatePlayerShare(game, player_) {
    for(const [uid, player] of Object.entries(game.players)){
        if(player.name !== player_.name){
            player.ws.send(`UPDATE_PLAYER_SHARE ${player_.name} ${player_.getShareNum()}`)
        }
    }
}

/*
use in buy phase
should remove
 */
export function updateShareNumber(ws, color, game) {
    switch (color){
        case 'brown':
            game.remainShares[0] -= 1;
            game.players[ws.UID].shares[0] += 1;
            break;
        case 'blue':
            game.remainShares[1] -= 1;
            game.players[ws.UID].shares[1] += 1;
            break;
        case 'yellow':
            game.remainShares[2] -= 1;
            game.players[ws.UID].shares[2] += 1;
            break;
        default:
            game.remainShares[3] -= 1;
            game.players[ws.UID].shares[3] += 1;
            break;
    }
    for(let id in game.players){
        game.players[id].ws.send(`UPDATE_SHARE_NUMBER ${color}`);
    }

    startGamePhase(game);
}

export function buyShare(ws, color, game) {
    let player = game.players[ws.UID];
    game.decreaseRemainShares(color);
    player.shares[color] += 1;
    updatePlayerShare(game, player);
    (game.sharePrices[color] === 0) ? player.pay(5, game) : player.pay(game.sharePrices[color], game);
    game.updateSharePrice(color);
    startGamePhase(game)
}