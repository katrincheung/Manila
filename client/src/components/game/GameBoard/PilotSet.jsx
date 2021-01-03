import React from 'react';
import { socket } from "../../../App";
import Seat from "./Seat";


function PilotSet({ occupier, pay, checkTurn }) {

    const sit = (choice, fee) => {
        pay(fee)
        socket.send(`DEPLOY PILOT ${choice}`);
    }


    return(
        <div>
            <h4>Pilot</h4>
            <Seat isEnable={occupier.large===''} sit={() => checkTurn(() => sit('large', 5))} fee={5} occupier={occupier.large}/>
            <Seat isEnable={occupier.small===''} sit={() => checkTurn(() => sit('small', 2))} fee={2} occupier={occupier.small}/>
        </div>
    );
}

export default PilotSet;