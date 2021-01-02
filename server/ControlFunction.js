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

export function getNextPlayer(players, ws){
    if(!players[ws.UID].next.pass){
        return players[ws.UID].next;
    }
    return getNextPlayer(players, players[ws.UID].next.ws)
}

export function setNextPlayerTurn(players, ws){
    getNextPlayer(players, ws).ws.send('YOUR_TURN');
}

export function updateMoney(ws, money, players) {
    for(const [uid, player] of Object.entries(players)){
        if(player.name !== ws.NAME){
            player.ws.send(`UPDATE_MONEY ${ws.NAME} ${money}`)
        }
    }
}

export function updateSharePrice(ws, color, price, players) {
    for(const [uid, player] of Object.entries(players)){
        player.ws.send(`UPDATE_SHARE_PRICE ${color} ${price}`)
    }
}

export function startAuction(players){
    for(let id in players){
        players[id].ws.send(`AUCTION_PHASE`);
    }
}

export function startBuyPhase(players){
    for(let id in players){
        players[id].ws.send(`BUY_PHASE`);
    }
}
