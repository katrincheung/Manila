import React, {useState} from 'react';
import Punt from "./GameBoard/Punt";
import styles from './GameBoard.module.css';


function GameBoard({ myName, pay }) {

    const [ puntChoice, setPuntChoice ] = useState({'brown':true, 'blue':true, 'yellow':true, 'green':true})

    return(
        <div className={styles.punt}>
            {(puntChoice.brown)?<Punt myName={myName} pay={pay} color={'brown'} price={24} fee={[2,3,4]}/>:<div></div>}
            {(puntChoice.blue)?<Punt myName={myName} pay={pay} color={'blue'} price={30} fee={[3,4,5]}/>:<div></div>}
            {(puntChoice.yellow)?<Punt myName={myName} pay={pay} color={'yellow'} price={18} fee={[1,2,3]}/>:<div></div>}
            {(puntChoice.green)?<Punt myName={myName} pay={pay} color={'green'} price={36} fee={[3,4,5,5]}/>:<div></div>}
        </div>
    );
}

export default GameBoard;