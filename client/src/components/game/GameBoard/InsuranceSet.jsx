import React from 'react';
import { socket } from "../../../App";
import Seat from "./Seat";


function InsuranceSet({ occupier, pay, checkTurn }) {

    const sit = () => {
        pay(-10)
        socket.send(`DEPLOY INSURANCE insurance`);
    }


    return(
        <div>
            <h4>Pilot</h4>
            <Seat isEnable={occupier.insurance===''} sit={() => checkTurn(() => sit())} fee={-10} occupier={occupier.insurance}/>
        </div>
    );
}

export default InsuranceSet;