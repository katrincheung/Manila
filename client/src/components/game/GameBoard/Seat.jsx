import React, {useState} from 'react';
import styles from './Seat.module.css';

function Seat({ index, sit, fee, occupy }) {

    return(
        <div>
            <button className={styles.btn} onClick={()=>sit(index)}>{(occupy!=='')?occupy:fee}</button>
        </div>
    );
}

export default Seat;