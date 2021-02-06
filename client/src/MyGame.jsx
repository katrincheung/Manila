import React, {useEffect, useState} from 'react';
import AuctionShareTable from "./components/game/auction/AuctionShareTable";
import Auction from "./components/game/Auction";
import Header from "./components/common/Header";
import {socket} from "./App";
import PlayerStatusRow from "./components/game/PlayerStatusRow";
import GameBoard from "./components/game/GameBoard";
import ChoosePuntTable from "./components/game/auction/ChoosePuntTable";

function MyGame({ myName, money, shares, initShare, remainShare, sharePrices, currentAuctionPrice, isMyTurn, setIsMyTurn, auctionPhase, buyPhase, gamePhase, handleMessage, updateMoney }) {

    const [ myShareList, setMyShareList ] = useState(initShare);

    const [ auction, setAuction ] = useState(currentAuctionPrice+1);
    useEffect(() => setAuction(currentAuctionPrice+1),[currentAuctionPrice])
    useEffect(() => {
        if(buyPhase && isMyTurn)
            pay(currentAuctionPrice)
    },[buyPhase, currentAuctionPrice])
    const addValue = val => setAuction(auction+val);

    const [ choosePuntPhase, setChoosePuntPhase ] = useState(false);

    const buyShare = ( color ) => {
        if(remainShare[color] > 0) {
            socket.send(`BUY_SHARE ${color}`)
            setMyShareList({...myShareList, [color]: myShareList[color] + 1});
            setChoosePuntPhase(true);
        }
    };
    const pay = (fee) => socket.send(`PAY ${fee}`);


    return(
        <div>
            <PlayerStatusRow sharePrices={sharePrices} shareNumbers={remainShare} myName={myName} money={money} shareList={myShareList} shares={shares}/>
            {
                (auctionPhase) ?
                    <div>
                        {
                            (isMyTurn) ?
                                <Auction
                                    currentPrice={currentAuctionPrice}
                                    auctionPrice={auction}
                                    addValue={addValue}
                                    setIsMyTurn={setIsMyTurn}
                                />
                                : <h2>Current Price: {currentAuctionPrice}</h2>
                        }
                    </div>:
                    <div></div>
            }
            {
                (buyPhase) ?
                    <div>{
                        (isMyTurn) ?
                            <div>{
                                (choosePuntPhase) ?
                                    <ChoosePuntTable/>
                                    : <AuctionShareTable sharePrices={sharePrices} shareNumbers={remainShare} priceUp={buyShare}/>
                            }</div>
                        : <h4>Master's buying phase</h4>
                    }</div>
                    : <div></div>
            }
            {
                (gamePhase) ?
                    <GameBoard isMyTurn={isMyTurn} setIsMyTurn={setIsMyTurn} handleMessage={handleMessage} pay={pay} updateMoney={updateMoney}/>:<div></div>
            }

        </div>
    );
}

export default MyGame;