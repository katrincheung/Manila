import React, {useEffect, useState} from 'react';
// import styles from './GameBoard.module.css';
import {socket} from "../../App";
import PuntSet from "./GameBoard/PuntSet";


function GameBoard({ myName, isMyTurn, setIsMyTurn, pay, handleMessage }) {

    const [ gameMessage, setGameMessage] = useState('');
    const checkTurn = (func) => {
        if(isMyTurn) {
            func();
            setIsMyTurn(false);
        } else{
            alert("Not your turn");
        }
    }

    socket.onmessage = e => setGameMessage(e.data);
    useEffect(()=>{
        console.log( 'GameBoard receive = '+ gameMessage)
        const message = gameMessage.split(' ');
        switch (message[0]){
            case 'SIT_PUNT':
                sitPunt(message[2], message[1], 0)
                break;
            default:
                handleMessage(message);
                break;
        }
    },[gameMessage])

    const [ puntChoice, setPuntChoice ] = useState({'brown':true, 'blue':true, 'yellow':true, 'green':true})
    const [ puntOccupier, setPuntOccupier  ] = useState({'brown':['','',''], 'blue':['','',''], 'yellow':['','',''], 'green':['','','','']})
    const sitPunt = (player, color) => {
        const temp = puntOccupier[color];
        for (let i = 0; i < temp.length; i++){
            if (temp[i] === ''){
                temp[i] = player
                break;
            }
        }
        setPuntOccupier({...puntOccupier, [color]:temp});
        if(player === myName){
            socket.send(`SIT_PUNT ${color}`)
        }
    }

    const [ portOccupier, setPortOccupier ] = useState({'A':'', 'B':'', 'C':''});//punts successfully depart, 4->6, 3->8, 2->15
    // const [ shipyard, setShipyard ] = useState({'A':'', 'B':'', 'C':''});//punts fail to depart, 4->6, 3->8, 2->15
    // const [ pirateSpace, setPirateSpace ] = useState([]);//pay 5 each
    // const [ largePilot, setLargePilot ] = useState('');//pay 5
    // const [ smallPilot, setSmallPilot ] = useState('');//pay 2
    // const [ insurance, setInsurance ] = useState('');//get 10 immediately, pay for punts at shipyard

    return(
        <div>
            <PuntSet
                puntChoice={puntChoice}
                puntOccupier={puntOccupier}
                sitPunt={color => sitPunt(myName, color)}
                pay={pay}
                checkTurn={checkTurn}
            />
        </div>
    );
}

export default GameBoard;