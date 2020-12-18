import React, {useEffect, useState} from 'react';
import Seat from "./Seat";

function Punt({ myName, pay, color, price, fee }) {

    const [ occupies, setOccupies ] = useState(Array(fee.length).fill(''));
    const [ location, setLocation ] = useState(0)

    function sit(index) {
        const temp = occupies;
        temp[index] = myName;
        setOccupies(temp);
        pay(fee[index])
    }

    return (
        <div>
            <h4>Punt</h4>
            <h4>{color}</h4>
            <h4>{location}</h4>
            {
                fee.map((value,key)=><Seat sit={sit} key={key} index={key} pay={pay} fee={value} occupy={occupies[key]}/>)
            }
        </div>
    );
}

export default Punt;