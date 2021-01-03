import React from 'react';
import Seat from "./Seat";

function Port({ prize, occupier, ...restProps }) {

    return(
        <div>
            <h4>{prize}</h4>
            <Seat isEnable={occupier===''} occupier={occupier} {...restProps}/>
        </div>
    );
}

export default Port;