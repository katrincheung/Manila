import React, {useState} from 'react';
import Port from "./Port";


//sit, fee, occupier, prize
function PortSet({ myName, pay, checkTurn }) {
    const fee = [4,3,2];
    const prizes = [6,8,10];
    const [ occupiers, setOccupiers ] = useState(['','','']);

    return(
        <div>
            {
                fee.map((value, key)=><Port/>)
            }
        </div>
    );
}

export default PortSet;