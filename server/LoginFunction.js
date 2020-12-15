export default function handleLoginRequest(code, rooms, player) {
    if(code in rooms){
        player.ws.send(`GUEST_PLAYER ${player.name}`);
        rooms[code].push(player);
        let nameList = [];
        rooms[code].forEach(player => nameList.push(player.name));
        rooms[code].forEach( player => player.ws.send(['PLAYER_LIST',nameList.join(' ')].join(' ')) );
    }else {
        player.ws.send(`HOST_PLAYER ${player.name}`);
        rooms[code] = [player];
        player.ws.send(`PLAYER_LIST ${player.name}`);
    }
    return (rooms);
}

export function handleGameStartRequest(room) {
    const playingRoom = {};
    room.forEach((player,i) => {
        playingRoom[player.ws.UID] = player;
        if(i !== room.length-1){
            player.next = room[i+1];}
        else{
            player.next = room[0];}
    });
    return playingRoom;
}