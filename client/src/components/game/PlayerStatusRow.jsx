import React from 'react';
import PlayerStatusCard from "./StatusBar/PlayerStatusCard";
import styles from './PlayerStatusRow.module.css';
import MyStatusCard from "./StatusBar/MyStatusCard";
import ShareTable from "./StatusBar/ShareTable";


function PlayerStatusRow({ sharePrices,shareNumbers,myName, money, shareList, players }) {

    return(
        <div className={styles.row}>
            <ShareTable sharePrices={sharePrices} shareNumbers={shareNumbers}/>
            <MyStatusCard name={myName} money={money} shareList={shareList} />
            {
                Object.entries(players).map(([name,value],key) => <PlayerStatusCard key={key} name={name} money={value.money} shareNumber={value.share}/> )
            }

        </div>
    );
}

export default PlayerStatusRow;
