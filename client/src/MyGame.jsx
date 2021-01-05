import React, {useEffect, useState} from 'react';
import AuctionShareTable from "./components/game/auction/AuctionShareTable";
import Auction from "./components/game/Auction";
import Header from "./components/common/Header";
import {socket} from "./App";
import PlayerStatusRow from "./components/game/PlayerStatusRow";
import GameBoard from "./components/game/GameBoard";

function MyGame({ myName, money, shares, initShare, remainShare, sharePrices, currentAuctionPrice, isMyTurn, setIsMyTurn, auctionPhase, buyPhase, gamePhase, handleMessage }) {

    const [ myShareList, setMyShareList ] = useState(initShare);
    useEffect(()=>socket.send(`UPDATE_PLAYER_SHARE ${myShareList.brown+myShareList.blue+myShareList.yellow+myShareList.green}`),[myShareList])

    const [ auction, setAuction ] = useState(currentAuctionPrice+1);
    useEffect(() => setAuction(currentAuctionPrice+1),[currentAuctionPrice])
    useEffect(() => {
        if(buyPhase && isMyTurn)
            socket.send(`UPDATE_MONEY ${money[myName]-currentAuctionPrice}`);
    },[buyPhase, currentAuctionPrice])
    const addValue = val => setAuction(auction+val);

    const buyShare = ( color ) => {
        if(remainShare[color] > 0) {
            socket.send(`UPDATE_SHARE_NUMBER ${color}`)
            setMyShareList({...myShareList, [color]: myShareList[color] + 1});
            (sharePrices[color] === 0) ?
                socket.send(`UPDATE_MONEY ${money[myName]-5}`)
                :socket.send(`UPDATE_MONEY ${money[myName]-sharePrices[color]}`);
            switch (sharePrices[color]) {
                case 5:
                    socket.send(`UPDATE_GLOBAL_SHARE_PRICE ${color} 10`)
                    break;
                case 10:
                    socket.send(`UPDATE_GLOBAL_SHARE_PRICE ${color} 20`)
                    break;
                case 20:
                    socket.send(`UPDATE_GLOBAL_SHARE_PRICE ${color} 30`)
                    break;
                default:
                    socket.send(`UPDATE_GLOBAL_SHARE_PRICE ${color} 5`)
                    break;
            }
        }
    };
    const pay = (fee) => socket.send(`UPDATE_MONEY ${money[myName] - fee}`);

    return(
        <div>
            <Header>Game Page</Header>
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
                        <AuctionShareTable sharePrices={sharePrices} shareNumbers={remainShare} priceUp={buyShare}/>
                        : <h4>Master's buying phase</h4>
                    }</div>
                    : <div></div>
            }
            {
                (gamePhase) ?
                    <GameBoard isMyTurn={isMyTurn} setIsMyTurn={setIsMyTurn} handleMessage={handleMessage} pay={pay}/>:<div></div>
            }

        </div>
    );
}

export default MyGame;