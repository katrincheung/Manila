import React, { useState } from 'react';
import Port from "./Port";
import { socket } from "../../../App";


//sit, fee, occupier, prize
function PortSet({ occupier, pay, checkTurn }) {

    const prize = [6,8,10];

    const sit = (choice, fee) => {
        pay(fee)
        socket.send(`DEPLOY PORT ${choice}`);
    }

    return(
        <div>
            <Port occupier={occupier.A} sit={()=>checkTurn(()=>sit('A',4))} prize={6} fee={4}/>
            <Port occupier={occupier.B} sit={()=>checkTurn(()=>sit('B',3))} prize={8} fee={3}/>
            <Port occupier={occupier.C} sit={()=>checkTurn(()=>sit('C',2))} prize={10} fee={2}/>
        </div>
    );
}

export default PortSet;