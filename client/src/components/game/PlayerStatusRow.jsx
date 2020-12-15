import React from 'react';
import PlayerStatusCard from "./PlayerStatusCard";
import styles from './PlayerStatusRow.module.css';
import MyStatusCard from "./MyStatusCard";
import ShareTable from "./ShareTable";
import AuctionShareTable from "./auction/AuctionShareTable";


function PlayerStatusRow({ sharePrices,shareNumbers,myName, money, shareList, players }) {

    return(
        <div className={styles.row}>
            <ShareTable sharePrices={sharePrices} shareNumbers={shareNumbers}/>
            <MyStatusCard name={myName} money={money} shareList={shareList} />
            {
                Object.entries(players).map(([name,value],key) => <div key={key}>{(name !== myName)?<PlayerStatusCard name={name} money={value[0]} shareNumber={value[1]}/>:<div></div>}</div> )
            }

        </div>
    );
}

export default PlayerStatusRow;
