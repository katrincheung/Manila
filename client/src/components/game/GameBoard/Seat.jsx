import React from 'react';
import styles from './Seat.module.css';

function Seat({ isEnable, sit, fee, occupier }) {

    console.log(occupier)
    return(
        <div>
            {
                (isEnable)?
                    <button className={styles.btn} onClick={sit}>{(occupier==='')?fee:occupier}</button>
                    :<div className={styles.disable}>{(occupier==='')?fee:occupier}</div>
            }
        </div>
    );
}

export default Seat;