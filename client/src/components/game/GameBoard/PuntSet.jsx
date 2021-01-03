import React from 'react';
import styles from "./PuntSet.module.css";
import Punt from "./Punt";


function PuntSet({ puntChoice, puntOccupier, sitPunt, pay, checkTurn }) {

    const puntPrizes = {'brown':24, 'blue':30, 'yellow':18, 'green':36}

    return(
        <div className={styles.punt}>
            {(puntChoice.brown) ?
                <Punt color={'brown'} fee={[2,3,4]} occupier={puntOccupier.brown} sitPunt={sitPunt} pay={pay} checkTurn={checkTurn}/>
                : <div></div>}
            {(puntChoice.blue) ?
                <Punt color={'blue'} fee={[3,4,5]} occupier={puntOccupier.blue} sitPunt={sitPunt} pay={pay} checkTurn={checkTurn}/>
                : <div></div>}
            {(puntChoice.yellow) ?
                <Punt color={'yellow'} fee={[1,2,3]} occupier={puntOccupier.yellow} sitPunt={sitPunt} pay={pay} checkTurn={checkTurn}/>
                : <div></div>}
            {(puntChoice.green) ?
                <Punt color={'green'} fee={[3,4,5,5]} occupier={puntOccupier.green} sitPunt={sitPunt} pay={pay} checkTurn={checkTurn}/>
                : <div></div>}
        </div>
    );

}

export default PuntSet;