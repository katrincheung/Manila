import React, {useEffect, useState} from 'react';
import styles from './Seat.module.css';

function Seat({ enable, index, sit, fee, occupier }) {

    return(
        <div>
            {
                (enable===index)?
                    <button className={styles.btn} onClick={sit}>{(occupier!=='')?occupier:fee}</button>
                    :<div className={styles.disable}>{(occupier!=='')?occupier:fee}</div>
            }
        </div>
    );
}

export default Seat;