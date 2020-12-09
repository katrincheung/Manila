import React, { useState } from 'react';

function Player() {

    const [ money, setMoney ] = useState(30);
    const [ stockList, setStockList ] = useState([0,0,0,0]);


    return (
        <div>
            <h5>Player: Money:{money} Stocks:{stockList}</h5>
        </div>
    );
}

export default Player;