import React from 'react';
import { socket } from "../../../App";
import Seat from "./Seat";


function PirateSet({ occupier, pay, checkTurn }) {

    const sit = (choice) => {
        pay(5)
        socket.send(`DEPLOY PIRATE ${choice}`);
    }


    return(
        <div>
            <h4>Pirate</h4>
            <Seat isEnable={occupier.first===''} sit={() => checkTurn(() => sit('first'))} fee={5} occupier={occupier.first}/>
            <Seat isEnable={occupier.first!=='' && occupier.second===''} sit={() => checkTurn(() => sit('second'))} fee={5} occupier={occupier.second}/>
        </div>
    );
}

export default PirateSet;