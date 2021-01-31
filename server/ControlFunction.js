

export function getNextPlayer(players, ws){
    if(!players[ws.UID].next.pass){
        return players[ws.UID].next;
    }
    return getNextPlayer(players, players[ws.UID].next.ws)
}

export function setNextPlayerTurn(game, ws){
    getNextPlayer(game.players, ws).ws.send('YOUR_TURN');
}

export function updateMoney(ws, money, game) {
    for(const [uid, player] of Object.entries(game.players)){
        player.ws.send(`UPDATE_MONEY ${ws.NAME} ${money}`)
    }
    game.players[ws.UID].money += parseInt(money, 10);
}

export function updateSharePrice(ws, color, price, players) {
    for(const [uid, player] of Object.entries(players)){
        player.ws.send(`UPDATE_SHARE_PRICE ${color} ${price}`)
    }
}

export function startAuction(game){
    game.send(`AUCTION_PHASE`)
}

export function startBuyPhase(game){
    game.send(`BUY_PHASE`)
}

export function startGamePhase(game){
    game.send(`GAME_PHASE`)
}
