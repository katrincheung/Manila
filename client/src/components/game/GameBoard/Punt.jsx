import React, {useEffect, useState} from 'react';
import Seat from "./Seat";

function Punt({ myName, pay, color, price, fee }) {

    const [ occupies, setOccupies ] = useState(Array(fee.length).fill(''));
    const [ enables, setEnables ] = useState([true, ...Array(fee.length).fill(false)]);
    const [ location, setLocation ] = useState(0)

    function sit(index) {
        let temp = occupies;
        temp[index] = myName;
        setOccupies(temp);
        pay(fee[index])
        temp = enables;
        temp[index] = false;
        if(index!==fee.length){
            temp[index+1] = true;
        }
        setEnables(temp);
    }

    return (
        <div>
            <h4>Punt</h4>
            <h4>{color}</h4>
            <h4>{location}</h4>
            {
                fee.map((value,key)=><Seat key={key} enable={enables[key]} sit={sit} index={key} fee={value} occupy={occupies[key]}/>)
            }
        </div>
    );
}

export default Punt;