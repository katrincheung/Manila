import {getNextPlayer} from "./ControlFunction.js";


export function sitPunt(ws, color, game){
    game.send(`SIT_PUNT ${color} ${ws.NAME}`)
    const nextPlayer = getNextPlayer(game.players, ws);
    if(nextPlayer.master){
        updateLocation(game)
    }
    nextPlayer.ws.send('YOUR_TURN');
}

export function deploy(ws, location, choice, game){
    if (location == 'PILOT'){
        if (choice == 'large')
            game.largePilot = true;
        else{
            game.smallPilot = true;
        }
    }
    game.send(`DEPLOY ${location} ${choice} ${ws.NAME}`);
    const nextPlayer = getNextPlayer(game.players, ws);
    if(nextPlayer.master){
        updateLocation(game)
    }
    nextPlayer.ws.send('YOUR_TURN');

}

function updateLocation(game){
    const brown = Math.ceil(Math.random() * 6);
    const blue = Math.ceil(Math.random() * 6);
    const yellow = Math.ceil(Math.random() * 6);
    const green = Math.ceil(Math.random() * 6);
    if (game.round === 2){
        if (game.smallPilot == true){
            console.log('wait for small pilot action');
        }
        if (game.largePilot == true){
            console.log('wait for large pilot action');
        }
    }
    game.location = {'brown':brown, 'blue':blue, 'yellow':yellow, 'green':green};
    game.send(`LOCATION ${brown} ${blue} ${yellow} ${green}`);
    game.round += 1;
}