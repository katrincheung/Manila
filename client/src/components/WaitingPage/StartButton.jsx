import {socket} from '../../App';
import React from 'react';
import styles from './StartButton.module.css'


function StartButton({ isHost }){
    return(
        isHost?<button
            type="button"
            className={styles.btn}
            onClick={() => socket.send(`GAME_START`)}>Start
        </button>:<div></div>
    )
}

export default StartButton;
