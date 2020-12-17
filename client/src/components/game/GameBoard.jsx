import React from 'react';
import Punt from "./GameBoard/Punt";


function GameBoard({ myName, pay }) {
    return(
        <div>
            <Punt myName={myName} pay={pay} color={'brown'} price={24} fee={[2,3,4]}/>
        </div>
    );
}

export default GameBoard;