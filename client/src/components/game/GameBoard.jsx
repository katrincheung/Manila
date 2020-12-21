import React, {useEffect, useState} from 'react';
import Punt from "./GameBoard/Punt";
import styles from './GameBoard.module.css';
import {socket} from "../../App";


function GameBoard({ myName, pay }) {

    const [ gameMessage, setGameMessage] = useState('');
    socket.onmessage = e => setGameMessage(e.data);
    useEffect(()=>{
        const message = gameMessage.split(' ');
        switch (message[0]){
            case 'SIT_PUNT':
                sitPunt(message[2], message[1], 0)
            default:
                console.log('not game board message')
        }
    },[gameMessage])

    const [ puntChoice, setPuntChoice ] = useState({'brown':true, 'blue':true, 'yellow':true, 'green':true})
    const [ puntOccupier, setPuntOccupier  ] = useState({'brown':['','',''], 'blue':['','',''], 'yellow':['','',''], 'green':['','','','']})
    const [ puntEnableIndex, setPuntEnableIndex ] = useState({'brown':0, 'blue':0, 'yellow':0, 'green':0})
    const puntPrizes = {'brown':24, 'blue':30, 'yellow':18, 'green':36}
    const sitPunt = (player, color, index) => {
        const temp = puntOccupier[color];
        temp[index] = player;
        setPuntOccupier({...puntOccupier, [color]:temp});
        if(player == myName){
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
            {(puntChoice.brown)?<Punt myName={myName} color={'brown'} fee={[2,3,4]} occupier={puntOccupier.brown} enable={puntEnableIndex.brown} sitPunt={sitPunt} pay={pay} />:<div></div>}
            {/*{(puntChoice.brown)?<Punt color={'blue'} myName={myName} fee={[3,4,5]} occupier={puntOccupier.blue} sitPunt={sitPunt} pay={pay} />:<div></div>}*/}
            {/*{(puntChoice.yellow)?<Punt color={'yellow'} myName={myName} fee={[1,2,3]} occupier={puntOccupier.yellow} sitPunt={sitPunt} pay={pay} />:<div></div>}*/}
            {/*{(puntChoice.brown)?<Punt color={'green'} myName={myName} fee={[3,4,5,5]} occupier={puntOccupier.green} sitPunt={sitPunt} pay={pay} />:<div></div>}*/}
        </div>
    );
}

export default GameBoard;