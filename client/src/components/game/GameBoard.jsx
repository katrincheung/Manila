import React, {useCallback, useEffect, useState} from 'react';
import styles from './GameBoard.module.css';
import {socket} from "../../App";
import PuntSet from "./GameBoard/PuntSet";
import PortSet from "./GameBoard/PortSet";
import ShipyardSet from "./GameBoard/ShipyardSet";
import PirateSet from "./GameBoard/PirateSet";
import InsuranceSet from "./GameBoard/InsuranceSet";
import PilotSet from "./GameBoard/PilotSet";



function GameBoard({ isMyTurn, setIsMyTurn, pay, handleMessage, updateMoney }) {

    const [ gameMessage, setGameMessage] = useState('');
    const checkTurn = (func) => {
        if(isMyTurn) {
            func();
            setIsMyTurn(false);
        } else{
            alert("Not your turn");
        }
    }

    const [ round, setRound ] = useState(0);

    const puntPrize = {'brown':24, 'blue':36, 'yellow':18, 'green':36};
    const [ puntChoice, setPuntChoice ] = useState({'brown':true, 'blue':false, 'yellow':true, 'green':true});
    const [ puntOccupier, setPuntOccupier  ] = useState({'brown':[], 'blue':[], 'yellow':[], 'green':[]});
    const [ location, setLocation ] = useState({'brown':9, 'blue':0, 'yellow':0, 'green':0});
    const [ puntAtPort, setPuntAtPort ] = useState([]);
    const [ puntAtShipyard, setPuntAtShipyard ] = useState([]);

    // Set the unchoosed punt location back to 0 if needed
    useEffect(() => {
        for (let color in puntChoice){
            if (!puntChoice[color] && location[color]!==0) {
                setLocation({...location, [color]: 0});
            }
        }
    },[location, setLocation])


    const sitPunt = useCallback((player, color) => {
        setPuntOccupier(p => ({...p, [color]:[...p[color], player]}))
    },[])

    const [ portOccupier, setPortOccupier ] = useState({'A':'', 'B':'', 'C':''});
    const [ shipyardOccupier, setShipyardOccupier ] = useState({'A':'', 'B':'', 'C':''})

    // check if have occupier first
    // locally give money to occupier
    const portPrize = (prize, occupier) => {
        if(occupier!==''){
            updateMoney(occupier, prize)
        }
    }

    // release port, shipyard and insurance result after all punt finish
    const releasePortResult = () => {
        if(puntAtPort.length===0 && puntAtShipyard.length===3){
            console.log('case1')
            portPrize(6, shipyardOccupier.A);
            portPrize(8, shipyardOccupier.B);
            portPrize(15, shipyardOccupier.C);
            portPrize(-29, insuranceOccupier.insurance)
        }else if(puntAtPort.length===1 && puntAtShipyard.length===2){
            console.log('case2')
            portPrize(6, shipyardOccupier.A);
            portPrize(8, shipyardOccupier.B);
            portPrize(6, portOccupier.A);
            portPrize(-14, insuranceOccupier.insurance)
        }else if(puntAtPort.length===2 && puntAtShipyard.length===1){
            console.log('case3')
            portPrize(6, shipyardOccupier.A);
            portPrize(6, portOccupier.A);
            portPrize(8, portOccupier.B);
            portPrize(-6, insuranceOccupier.insurance)
        }else if(puntAtPort.length===3 && puntAtShipyard.length===1){
            console.log('case4')
            portPrize(6, portOccupier.A);
            portPrize(8, portOccupier.B);
            portPrize(15, portOccupier.C);
        }
    }
    useEffect(()=>{
        releasePortResult()
    },[puntAtPort, puntAtShipyard])

    const [ pilotOccupier,setPilotOccupier ] = useState({'large':'','small':''})
    // const [ isLargePilot, setIsLargePilot ] = useState(false);
    // const [ isSmallPilot, setIsSmallPilot ] = useState(false);
    // const pilotAction = () => {
    //
    // }
    const [ pirateOccupier,setPirateOccupier ] = useState({'first':'','second':''})
    const [ insuranceOccupier, setInsuranceOccupier ] = useState({'insurance':''});

    // set occupier, used by all position except punt
    const deploy = (player, occupier, setOccupier, choice) => setOccupier({...occupier, [choice]:player});

    // check is round 3 done
    useEffect(() => {
        console.log('round '+round)
        if(round===3){
            console.log('after 3 rounds');
        }
    },[round, setRound])

    // add punt to port whenever location >13
    // add punt to shipyard when round 3 if location <13
    const updatePortShipyard = useCallback(() => {
        let portList = [];
        let shipyardList = [];
        console.log('port and shipyard update function called')
        for(let color in puntChoice){
            if (puntChoice[color]){
                if (location[color]>13){
                    portList.push(color)
                    setPuntChoice(p => ({...p, [color]:false}));
                    let moneyToAdd = puntPrize[color]/puntOccupier[color].length;
                    puntOccupier[color].forEach(player => updateMoney(player, moneyToAdd));
                }
                else if (round === 3){
                    shipyardList.push(color);
                }
            }
        }
        setPuntAtPort(p => [...p, ...portList]);
        setPuntAtShipyard(shipyardList);
    }, [round, location, puntChoice])
    useEffect(() => updatePortShipyard(), [round]);


    socket.onmessage = e => setGameMessage(e.data);
    useEffect(()=>{
        if(gameMessage !== ''){
            console.log( 'GameBoard receive = '+ gameMessage)
            const message = gameMessage.split(' ');
            switch (message[0]){
                case 'SIT_PUNT':
                    sitPunt(message[2], message[1])
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
                    setRound(round + 1);
                    break;
                default:
                    handleMessage(message);
                    break;
        }
        }
    },[gameMessage, handleMessage, sitPunt])


    return(
        <div className={styles.board}>
            port: {puntAtPort}
            shipyard: {puntAtShipyard}
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