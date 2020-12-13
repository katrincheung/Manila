function getNextPlayer(room, ws){
    if(!room[ws.UID].next.pass){
        return room[ws.UID].next;
    }
    return getNextPlayer(room, room[ws.UID].next.ws)
}

export function bid(price, room, ws){
    ws.send(`AUCTION_TURN_DONE`);
    for(let id in room){
        room[id].ws.send(`CURRENT_PRICE ${price}`);
    }
    getNextPlayer(room, ws).ws.send(`YOUR_AUCTION`);
}

export function passAuction(room, ws){
    room[ws.UID].pass = true;
    ws.send(`AUCTION_TURN_DONE`);
    const nextPlayer = getNextPlayer(room, ws);
    if (getNextPlayer(room, nextPlayer.ws) === nextPlayer){
        nextPlayer.ws.send(`AUCTION_WIN`);
    }else {
        nextPlayer.ws.send(`YOUR_AUCTION`);
    }

}