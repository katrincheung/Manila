import React, {useState} from 'react';
import styles from './Seat.module.css';

function Seat({ myName, pay, fee }) {

    const [ children, setChildren ] = useState(fee);
    const onClick = () => {
        setChildren(myName);
        pay(fee);
    }

    return(
        <div>
            <button className={styles.btn} onClick={onClick}>{children}</button>
        </div>
    );
}

export default Seat;