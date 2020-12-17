import React from 'react';
import Punt from "./GameBoard/Punt";

function GameBoard() {
    return(
        <div>
            <Punt color={'brown'} price={24} fee={[2,3,4]}/>
        </div>
    );
}

export default GameBoard;