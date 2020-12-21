import React, {useEffect, useState} from 'react';
import Seat from "./Seat";

function Punt({ color, myName, pay, fee, occupier, sitPunt }) {

    const [ enables, setEnables ] = useState(0);
    const [ location, setLocation ] = useState(0)

    const sit = (index) =>{
        pay(fee[index])
        sitPunt(myName, color, index)
        setEnables(enables+1)
    }

    return (
        <div>
            <h4>Punt</h4>
            <h4>{location}</h4>
            {/*{*/}
            {/*    fee.map((value,key)=><h4>{value} {enables[key].toString()}</h4>)*/}
            {/*}*/}
            {
                fee.map((value,key)=><Seat key={key} enable={enables} index={key} fee={value} occupier={occupier[key]} sit={sit}/>)
            }
        </div>
    );
}

export default Punt;