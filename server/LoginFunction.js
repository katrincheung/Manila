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


/*
change [player1, player2, player3] to {id1:player1, id2:player2, id3:player3}
add players.next pointing to next players
 */
export function handleGameStartRequest(game, playerList) {
    const playersMap = {};
    playerList.forEach((player,i) => {
        playersMap[player.ws.UID] = player;
        if(i !== playerList.length-1){
            player.next = playerList[i+1];}
        else{
            player.next = playerList[0];}
    });
    game.players = playersMap;
    game.send(`GAME_START`)
    gameSetUp(game)
}


/*
give shares when starting the game
only called in handleGameStartRequest
 */
function gameSetUp(game) {
    let remain = [3,3,3,3]
    for(let playerId in game.players){
        let i = 0;
        let share = [0,0,0,0];
        while (i < 2){
            let index = Math.floor(Math.random() * 4);
            if(remain[index] > 0){
                remain[index]-=1;
                share[index]+=1;
                i+=1;
            }
        }
        game.players[playerId].shares = {'brown':share[0],'blue':share[1],'yellow':share[2],'green':share[3]};
        game.players[playerId].ws.send(`START_SHARE ${share.join(' ')}`);
    }
    game.remainShares = {'brown':remain[0]+2,'blue':remain[1]+2,'yellow':remain[2]+2,'green':remain[3]+2};
    game.updateRemainShares()
}