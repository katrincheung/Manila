export function gameSetUp(players) {
    console.log('game_setup');
    let remain = [3,3,3,3]
    for(let playerId in players){
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
        players[playerId].ws.send(`START_SHARE ${share.join(' ')}`);
    }
    for(let playerId in players){
        players[playerId].ws.send(`REMAIN_SHARE ${remain.join(' ')}`);
    }
}

export function updateMoney(ws, money, players) {
    for(const [uid, player] of Object.entries(players)){
        if(player.name !== ws.NAME){
            player.ws.send(`UPDATE_MONEY ${ws.NAME} ${money}`)
        }
    }
}

export function updatePlayerShare(ws, shareNum, players) {
    for(const [uid, player] of Object.entries(players)){
        if(player.name !== ws.NAME){
            player.ws.send(`UPDATE_PLAYER_SHARE ${ws.NAME} ${shareNum}`)
        }
    }
}

export function updateShareNumber(ws, color, players) {
    for(const [uid, player] of Object.entries(players)){
        player.ws.send('BUY_DONE');
        if(player.name !== ws.NAME){
            player.ws.send(`UPDATE_SHARE_NUMBER ${color}`);
        }
    }
}

export function updateGlobalSharePrice(ws, brown, blue, yellow, green, players) {
    for(const [uid, player] of Object.entries(players)){
        player.ws.send(`UPDATE_GLOBAL_SHARE_PRICE ${brown} ${blue} ${yellow} ${green}`)
    }
}