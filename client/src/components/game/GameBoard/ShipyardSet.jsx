import React from 'react';
import Port from "./Port";
import { socket } from "../../../App";


function ShipyardSet({ occupier, pay, checkTurn }) {

    const sit = (choice, fee) => {
        pay(fee)
        socket.send(`DEPLOY SHIPYARD ${choice}`);
    }

    return(
        <div>
            <h4>Shipyard</h4>
            <Port occupier={occupier.A} sit={()=>checkTurn(()=>sit('A',4))} prize={6} fee={4}/>
            <Port occupier={occupier.B} sit={()=>checkTurn(()=>sit('B',3))} prize={8} fee={3}/>
            <Port occupier={occupier.C} sit={()=>checkTurn(()=>sit('C',2))} prize={15} fee={2}/>
        </div>
    );
}

export default ShipyardSet;