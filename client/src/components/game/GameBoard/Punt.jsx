import React, { useState } from 'react';
import Seat from "./Seat";

function Punt({ myName, pay, color, price, fee }) {

    const [ seat, setSeat ] = useState({'color':color, 'price':price, 'fee':fee, 'occupied':[], 'location':0 });

    function sit() {
        if(seat.occupied.length < 3){
            setSeat({...seat, 'occupied':[{...seat['occupied']},'newPlayer']})
        }
    }


    return (
        <div>
            <h4>{color} Punt: {seat.occupied}</h4>
            <Seat myName={myName} pay={pay} fee={fee[0]}/>
            <Seat myName={myName} pay={pay} fee={fee[1]}/>
            <Seat myName={myName} pay={pay} fee={fee[2]}/>
        </div>
    );
}

export default Punt;