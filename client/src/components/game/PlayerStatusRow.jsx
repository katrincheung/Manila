import React from 'react';
import PlayerStatusCard from "./PlayerStatusCard";
import styles from './PlayerStatusRow.module.css';
import MyStatusCard from "./MyStatusCard";


function PlayerStatusRow({ myName, money, shareList, players }) {

    return(
        <div className={styles.row}>

            <MyStatusCard name={myName} money={money} shareList={shareList} />
            {
                Object.entries(players).map(([name,value],key) => <div key={key}>{(name !== myName)?<PlayerStatusCard name={name} money={value[0]} shareNumber={value[1]}/>:<div></div>}</div> )
            }

        </div>
    );
}

export default PlayerStatusRow;
