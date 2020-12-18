import React from 'react';
import styles from './Seat.module.css';

function Seat({ enable, index, sit, fee, occupy }) {

    return(
        <div>
            {
                (enable)?
                    <button className={styles.btn} onClick={()=>sit(index)}>{(occupy!=='')?occupy:fee}</button>
                    :<div className={styles.disable}>{(occupy!=='')?occupy:fee}</div>
            }
        </div>
    );
}

export default Seat;