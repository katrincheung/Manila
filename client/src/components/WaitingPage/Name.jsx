import React from 'react';
import styles from './Name.module.css';

function Name({ nameList }) {
    return(
        <div>
            {
                nameList.map((name,key) => <p className={styles.name} key={key}>{name}</p>)
            }
        </div>
    )
}

export default Name;