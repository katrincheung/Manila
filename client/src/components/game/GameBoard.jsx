import React, {useEffect, useState} from 'react';
import styles from './GameBoard.module.css';
import {socket} from "../../App";
import PuntSet from "./GameBoard/PuntSet";
import PortSet from "./GameBoard/PortSet";
import ShipyardSet from "./GameBoard/ShipyardSet";
import PirateSet from "./GameBoard/PirateSet";
import InsuranceSet from "./GameBoard/InsuranceSet";
import PilotSet from "./GameBoard/PilotSet";


function GameBoard({ isMyTurn, setIsMyTurn, pay, handleMessage }) {

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
                    case 'PIRATE':
                        deploy(message[3], pirateOccupier, setPirateOccupier, message[2])
                        break;
                    case 'PILOT':
                        deploy(message[3], pilotOccupier, setPilotOccupier, message[2])
                        break;
                    case 'INSURANCE':
                        deploy(message[3], insuranceOccupier, setInsuranceOccupier, message[2])
                        break;
                    default:
                        console.log('DEPLOY but no location')
                }
                break;
            case 'LOCATION':
                setLocation({'brown':location.brown+parseInt(message[1],10), 'blue':location.blue+parseInt(message[2],10), 'yellow':location.yellow+parseInt(message[3],10), 'green':location.green+parseInt(message[4],10)});
                break;
            default:
                handleMessage(message);
                break;
        }
    },[gameMessage])

    const [ puntChoice, setPuntChoice ] = useState({'brown':true, 'blue':true, 'yellow':true, 'green':true});
    const [ puntOccupier, setPuntOccupier  ] = useState({'brown':['','',''], 'blue':['','',''], 'yellow':['','',''], 'green':['','','','']});
    const [ location, setLocation ] = useState({'brown':0, 'blue':0, 'yellow':0, 'green':0});
    useEffect(()=>{
        console.log(location);
        if(!puntChoice.brown && location.brown!==0)
            setLocation({...location, brown: 0})
        if(!puntChoice.blue && location.blue!==0)
            setLocation({...location, blue: 0})
        if(!puntChoice.yellow && location.yellow!==0)
            setLocation({...location, yellow: 0})
        if(!puntChoice.green && location.green!==0)
            setLocation({...location, green: 0})
    },[puntChoice, location, setLocation])
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

    const [ portOccupier, setPortOccupier ] = useState({'A':'', 'B':'', 'C':''});
    const [ shipyardOccupier, setShipyardOccupier ] = useState({'A':'', 'B':'', 'C':''})
    const [ pilotOccupier,setPilotOccupier ] = useState({'large':'','small':''})
    const [ pirateOccupier,setPirateOccupier ] = useState({'first':'','second':''})
    const [ insuranceOccupier, setInsuranceOccupier ] = useState({'insurance':''});
    const deploy = (player, occupier, setOccupier, choice) => setOccupier({...occupier, [choice]:player});


    return(
        <div className={styles.board}>
            <PuntSet puntChoice={puntChoice} puntOccupier={puntOccupier} location={location} pay={pay} checkTurn={checkTurn}/>
            <PortSet occupier={portOccupier} pay={pay} checkTurn={checkTurn}/>
            <ShipyardSet occupier={shipyardOccupier} pay={pay} checkTurn={checkTurn}/>
            <PirateSet occupier={pirateOccupier} pay={pay} checkTurn={checkTurn}/>
            <PilotSet occupier={pilotOccupier} pay={pay} checkTurn={checkTurn}/>
            <InsuranceSet occupier={insuranceOccupier} pay={pay} checkTurn={checkTurn}/>
        </div>
    );
}

export default GameBoard;