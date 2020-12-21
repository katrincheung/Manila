import React, {useEffect, useState} from 'react';
import Punt from "./GameBoard/Punt";
import styles from './GameBoard.module.css';
import {socket} from "../../App";


function GameBoard({ myName, pay }) {

    const [ gameMessage, setGameMessage] = useState('');
    socket.onmessage = e => setGameMessage(e.data);
    useEffect(()=>{
        console.log(gameMessage)
        const message = gameMessage.split(' ');
        switch (message[0]){
            case 'SIT_PUNT':
                sitPunt(message[2], message[1], 0)
                break;
            default:
                console.log('')
                break;
        }
    },[gameMessage])

    const [ puntChoice, setPuntChoice ] = useState({'brown':true, 'blue':true, 'yellow':true, 'green':true})
    const [ puntOccupier, setPuntOccupier  ] = useState({'brown':['','',''], 'blue':['','',''], 'yellow':['','',''], 'green':['','','','']})
    const puntPrizes = {'brown':24, 'blue':30, 'yellow':18, 'green':36}
    const sitPunt = (player, color) => {
        const temp = puntOccupier[color];
        console.log(`original temp is ${temp}`)
        for (let i = 0; i < temp.length; i++){
            if (temp[i] === ''){
                temp[i] = player
                console.log(`no ppl in ${i}`)
                break;
            }
        }
        setPuntOccupier({...puntOccupier, [color]:temp});
        if(player === myName){
            socket.send(`SIT_PUNT ${color}`)
        }
    }

    /*
    p1 choose punt to sit
    punt set p1 on seat
    set enable to next value
    pay money
    p1 send message
    p2 set occupy
    p2 set enable
     */


    return(
        <div className={styles.punt}>
            {(puntChoice.brown)?<Punt myName={myName} color={'brown'} fee={[2,3,4]} occupier={puntOccupier.brown} sitPunt={sitPunt} pay={pay} />:<div></div>}
            {/*{(puntChoice.brown)?<Punt color={'blue'} myName={myName} fee={[3,4,5]} occupier={puntOccupier.blue} sitPunt={sitPunt} pay={pay} />:<div></div>}*/}
            {/*{(puntChoice.yellow)?<Punt color={'yellow'} myName={myName} fee={[1,2,3]} occupier={puntOccupier.yellow} sitPunt={sitPunt} pay={pay} />:<div></div>}*/}
            {/*{(puntChoice.brown)?<Punt color={'green'} myName={myName} fee={[3,4,5,5]} occupier={puntOccupier.green} sitPunt={sitPunt} pay={pay} />:<div></div>}*/}
        </div>
    );
}

export default GameBoard;