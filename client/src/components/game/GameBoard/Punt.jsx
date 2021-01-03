import React, {useEffect, useState} from 'react';
import Seat from "./Seat";
import {socket} from "../../../App";

function Punt({ color, pay, fee, occupier, checkTurn }) {

    const [ enable, setEnable ] = useState(0);

    const sit = (index) =>{
        pay(fee[index])
        socket.send(`SIT_PUNT ${color}`)
    }

    useEffect(()=>{
        if (occupier[enable] !== ''){
            setEnable(enable+1)
        }
    },[occupier[enable], setEnable])


    return (
        <div>
            <h4>Punt</h4>
            {
                fee.map((value,key)=><Seat key={key} isEnable={enable===key} fee={value} occupier={occupier[key]} sit={() => checkTurn(()=> sit(key))}/>)
            }
        </div>
    );
}

export default Punt;