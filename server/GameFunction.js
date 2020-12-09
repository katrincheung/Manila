function getNext(room, ws){
    if(!room[ws].next.pass){
        return room[ws].next;
    }
    return getNext(room, room[ws].next.ws)
}

function bid(price, room, ws){
    room.ws.send(`CURRENT_PRICE ${price}`);
    getNext(room, ws).send(`YOUR_AUCTION`);
}