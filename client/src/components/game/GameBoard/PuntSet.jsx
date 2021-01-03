import React from 'react';
import styles from "./PuntSet.module.css";
import Punt from "./Punt";


function PuntSet({ puntChoice, puntOccupier, location, ...restProps }) {

    const prize = {'brown':24, 'blue':30, 'yellow':18, 'green':36}

    return(
        <div className={styles.punt}>
            {(puntChoice.brown) ?
                <Punt color={'brown'} fee={[2,3,4]} prize={prize.brown} occupier={puntOccupier.brown} location={location.brown} {...restProps}/>
                : <div></div>}
            {(puntChoice.blue) ?
                <Punt color={'blue'} fee={[3,4,5]} prize={prize.blue} occupier={puntOccupier.blue} location={location.blue} {...restProps}/>
                : <div></div>}
            {(puntChoice.yellow) ?
                <Punt color={'yellow'} fee={[1,2,3]} prize={prize.yellow} occupier={puntOccupier.yellow} location={location.yellow} {...restProps}/>
                : <div></div>}
            {(puntChoice.green) ?
                <Punt color={'green'} fee={[3,4,5,5]} prize={prize.green} occupier={puntOccupier.green} location={location.green} {...restProps}/>
                : <div></div>}
        </div>
    );

}

export default PuntSet;