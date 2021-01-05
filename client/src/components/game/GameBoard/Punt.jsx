import React from 'react';
import Seat from "./Seat";
import {socket} from "../../../App";

function Punt({ color, fee, prize, location, pay, occupiers, checkTurn }) {

    const sit = (index) =>{
        pay(fee[index])
        socket.send(`SIT_PUNT ${color}`)
    }

    const occupier = (key) => {
        return ((occupiers.length-1)===key)?occupiers[key]:''
    }

    return (
        <div>

            <h4>{color}{location}</h4>
            <h4>{prize}</h4>
            {
                fee.map((value,key)=><Seat key={key} isEnable={key===occupiers.length} fee={value} occupier={occupier(key)} sit={() => checkTurn(()=> sit(key))}/>)
            }
        </div>
    );
}

export default Punt;