export default function handleLoginRequest(code, rooms, player) {
    console.log('handleLoginRequest');
    if(code in rooms){
        player.ws.send(`GUEST_PLAYER ${code}`);
        rooms[code].push(player);
        let nameList = [];
        rooms[code].forEach(player => nameList.push(player.name));
        rooms[code].forEach( player => player.ws.send(['PLAYER_LIST',nameList.join(' ')].join(' ')) );
    }else {
        player.ws.send(`HOST_PLAYER ${code}`);
        rooms[code] = [player];
        player.ws.send(`PLAYER_LIST ${player.name}`);
    }
    return (rooms);
}

export function handleGameStartRequest(room) {
    room.forEach( player => player.ws.send('GAME_START') );
}