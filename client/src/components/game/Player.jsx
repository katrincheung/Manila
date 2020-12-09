import React, { useState } from 'react';

function Player() {

    const [ money, setMoney ] = useState(30);
    const [ share, setShare ] = useState(0);


    return (
        <div>
            <h5>Player: Money:{money}</h5>
        </div>
    );
}

export default Player;