import React, { useState } from 'react';
import Seat from "./Seat";

function Punt({ myName, pay, color, price, fee }) {

    const [ seat, setSeat ] = useState({'color':color, 'price':price, 'fee':fee, 'occupied':[] });
    const [ location, setLocation ] = useState(0)
    function sit() {
        if(seat.occupied.length < 3){
            setSeat({...seat, 'occupied':[{...seat['occupied']},'newPlayer']})
        }
    }


    return (
        <div>
            <h4>Punt</h4>
            <h4>{color}</h4>
            <h4>{location}</h4>
            {
                fee.map((value,key)=><Seat key={key} myName={myName} pay={pay} fee={value}/>)
            }
        </div>
    );
}

export default Punt;