import React, { useState } from 'react';

function Punt({ color, price, fee }) {

    const [ seat, setSeat ] = useState({'color':color, 'price':price, 'fee':fee, 'occupied':[], 'location':0 });

    function sit() {
        if(seat.occupied.length < 3){
            setSeat({...seat, 'occupied':[{...seat['occupied']},'newPlayer']})
        }
    }


    return (
        <div>
            <h4>{color} Punt: {seat.occupied}</h4>
        </div>
    );
}

export default Punt;