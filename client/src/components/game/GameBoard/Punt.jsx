import React, {useEffect, useState} from 'react';
import Seat from "./Seat";

function Punt({ color, myName, pay, fee, occupier, sitPunt }) {

    const [ enable, setEnable ] = useState(0);
    const [ location, setLocation ] = useState(0)

    const sit = (index) =>{
        pay(fee[index])
        sitPunt(myName, color)
    }

    useEffect(()=>{
        console.log('in punt useEffect')
        if (occupier[enable] !== ''){
            setEnable(enable+1)
            console.log('enable +1');
        }else if (enable === 4){
            console.log('enable = 4')
        }
    },[occupier[enable], setEnable])

    return (
        <div>
            <h4>Punt</h4>
            <h4>{location}</h4>
            {
                fee.map((value,key)=><Seat key={key} enable={enable} index={key} fee={value} occupier={occupier[key]} sit={sit}/>)
            }
        </div>
    );
}

export default Punt;