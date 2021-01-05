import React from 'react';
import PlayerStatusCard from "./StatusBar/PlayerStatusCard";
import styles from './PlayerStatusRow.module.css';
import MyStatusCard from "./StatusBar/MyStatusCard";
import ShareTable from "./StatusBar/ShareTable";


function PlayerStatusRow({ sharePrices,shareNumbers,myName, money, shareList, shares }) {

    return(
        <div className={styles.row}>
            <ShareTable sharePrices={sharePrices} shareNumbers={shareNumbers}/>
            <MyStatusCard name={myName} money={money[myName]} shareList={shareList} />
            {
                Object.entries(shares).map(([name,value],key) => <PlayerStatusCard key={key} name={name} money={money[name]} shareNumber={value}/> )
            }

        </div>
    );
}

export default PlayerStatusRow;
