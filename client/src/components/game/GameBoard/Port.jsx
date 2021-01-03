import React, { useState } from 'react';
import Seat from "./Seat";

function Port({ sit, fee, occupier, prize }) {

    return(
        <div>
            <h4>{prize}</h4>
            <Seat isEnable={true} sit={sit} fee={fee} occupier={occupier}/>
        </div>
    );
}

export default Port;