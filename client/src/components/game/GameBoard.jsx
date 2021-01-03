import React, {useEffect, useState} from 'react';
import styles from './GameBoard.module.css';
import {socket} from "../../App";
import PuntSet from "./GameBoard/PuntSet";
import PortSet from "./GameBoard/PortSet";
import ShipyardSet from "./GameBoard/ShipyardSet";
import PirateSet from "./GameBoard/PirateSet";
import InsuranceSet from "./GameBoard/InsuranceSet";
import PilotSet from "./GameBoard/PilotSet";


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
            case 'DEPLOY':
                switch(message[1]){
                    case 'PORT':
                        deploy(message[3], portOccupier, setPortOccupier, message[2])
                        break;
                    case 'SHIPYARD':
                        deploy(message[3], shipyardOccupier, setShipyardOccupier, message[2])
                        break;
                    case 'PILOT':
                        deploy(message[3], pilotOccupier, setPilotOccupier, message[2])
                        break;
                    default:
                        console.log('DEPLOY but no location')
                }
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
    }

    const [ portOccupier, setPortOccupier ] = useState({'A':'', 'B':'', 'C':''});//punts successfully depart, 4->6, 3->8, 2->15
    const [ shipyardOccupier, setShipyardOccupier ] = useState({'A':'', 'B':'', 'C':''})
    const [ pilotOccupier,setPilotOccupier ] = useState({'large':'','small':''})
    const [ pirateOccupier,setPirateOccupier ] = useState({'first':'','second':''})
    const [ insuranceOccupier, setInsuranceOccupier ] = useState({'insurance':''});
    const deploy = (player, occupier, setOccupier, choice) => {
        console.log('deploying')
        console.log(portOccupier);
        setOccupier({...occupier, [choice]:player});
    }


    return(
        <div className={styles.board}>
            <PuntSet puntChoice={puntChoice} puntOccupier={puntOccupier} pay={pay} checkTurn={checkTurn}/>
            <PortSet occupier={portOccupier} pay={pay} checkTurn={checkTurn}/>
            <ShipyardSet occupier={shipyardOccupier} pay={pay} checkTurn={checkTurn}/>
            <PirateSet occupier={pirateOccupier} pay={pay} checkTurn={checkTurn}/>
            <PilotSet occupier={pilotOccupier} pay={pay} checkTurn={checkTurn}/>
            <InsuranceSet occupier={insuranceOccupier} pay={pay} checkTurn={checkTurn}/>
        </div>
    );
}

export default GameBoard;