export function gameSetUp(players) {
    console.log('game_setup');
    let remain = [3,3,3,3]
    for(let playerId in players){
        console.log(playerId);
        let i = 0;
        let share = [0,0,0,0];
        while (i < 2){
            let index = Math.floor(Math.random() * 4);
            console.log(index);
            if(remain[index] > 0){
                remain[index]-=1;
                share[index]+=1;
                i+=1;
                console.log('finish')
            }
        }
        players[playerId].ws.send(`START_SHARE ${share.join(' ')}`);
    }
    for(let playerId in players){
        players[playerId].ws.send(`REMAIN_SHARE ${remain.join(' ')}`);
        players[playerId].ws.send(`GAME_START`);
    }
}

export function update(players, ws, money, shareList, prices, remaining) {
    let name = players[ws.uid].name;
    for(let playerId in players){
        if(playerId !== ws.uid){
            players[playerId].ws.send(`UPDATE ${name} ${money} ${shareList} ${prices} ${remaining}`);
        }
    }
}