function update(players, ws, money, shareList, prices, remaining) {
    let name = players[ws.uid].name;
    for(let playerId in players){
        if(playerId !== ws.uid){
            players[playerId].ws.send(`UPDATE ${name} ${money} ${shareList} ${prices} ${remaining}`);
        }
    }
}