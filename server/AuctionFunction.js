function getNextPlayer(room, ws){
    if(!room[ws.UID].next.pass){
        return room[ws.UID].next;
    }
    return getNextPlayer(room, room[ws.UID].next.ws)
}

export function startAuction(room){
    for(let id in room){
        room[id].ws.send(`AUCTION_PHASE`);
    }
}

export function startBuyPhase(room){
    for(let id in room){
        room[id].ws.send(`BUY_PHASE`);
    }
}

export function bid(price, room, ws){
    for(let id in room){
        room[id].ws.send(`CURRENT_PRICE ${price}`);
    }
    getNextPlayer(room, ws).ws.send(`YOUR_TURN`);
}

export function passAuction(room, ws){
    room[ws.UID].pass = true;
    const nextPlayer = getNextPlayer(room, ws);
    nextPlayer.ws.send(`YOUR_TURN`);
    if (getNextPlayer(room, nextPlayer.ws) === nextPlayer){
        startBuyPhase(room)
    }
}