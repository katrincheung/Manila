import React, {useEffect, useState} from 'react';
import AuctionShareTable from "./components/game/auction/AuctionShareTable";
import Auction from "./components/game/Auction";
import Header from "./components/common/Header";
import {socket} from "./App";
import PlayerStatusRow from "./components/game/PlayerStatusRow";
import GameBoard from "./components/game/GameBoard";

function GamePage({ myName, players, initShare, remainShare, sharePrices, currentAuctionPrice, auctionTurn, buyPhase, gamePhase }) {
    const [ money, setMoney ] = useState(30);
    useEffect(()=>socket.send(`UPDATE_MONEY ${money}`), [money])
    const [ myShareList, setMyShareList ] = useState(initShare);
    useEffect(()=>socket.send(`UPDATE_PLAYER_SHARE ${myShareList.brown+myShareList.blue+myShareList.yellow+myShareList.green}`),[myShareList])

    const [ auction, setAuction ] = useState(currentAuctionPrice+1);
    useEffect(() => setAuction(currentAuctionPrice+1),[currentAuctionPrice])
    useEffect(() => {
        if(buyPhase)
            setMoney(money-currentAuctionPrice)
    },[buyPhase, currentAuctionPrice, setMoney])
    const addValue = val => setAuction(auction+val);

    const buyShare = ( color ) => {
        if(remainShare[color] > 0) {
            socket.send(`UPDATE_SHARE_NUMBER ${color}`)
            setMyShareList({...myShareList, [color]: myShareList[color] + 1});
            (sharePrices[color] === 0)? setMoney(money-5):setMoney(money-sharePrices[color]);
            switch (sharePrices[color]) {
                case 5:
                    socket.send(`UPDATE_SHARE_PRICE ${color} 10`)
                    break;
                case 10:
                    socket.send(`UPDATE_SHARE_PRICE ${color} 20`)
                    break;
                case 20:
                    socket.send(`UPDATE_SHARE_PRICE ${color} 30`)
                    break;
                default:
                    socket.send(`UPDATE_SHARE_PRICE ${color} 5`)
                    break;
            }
        }
    };
    const pay = (fee) => setMoney(money - fee);
    // const [ port, setPort ] = useState({'A':'', 'B':'', 'C':''});//punts successfully depart, 4->6, 3->8, 2->15
    // const [ shipyard, setShipyard ] = useState({'A':'', 'B':'', 'C':''});//punts fail to depart, 4->6, 3->8, 2->15
    // const [ pirateSpace, setPirateSpace ] = useState([]);//pay 5 each
    // const [ largePilot, setLargePilot ] = useState('');//pay 5
    // const [ smallPilot, setSmallPilot ] = useState('');//pay 2
    // const [ insurance, setInsurance ] = useState('');//get 10 immediately, pay for punts at shipyard

    return(
        <div>
            <Header>Game Page</Header>
            <PlayerStatusRow sharePrices={sharePrices} shareNumbers={remainShare} myName={myName} money={money} shareList={myShareList} players={players}/>
            {
                (auctionTurn) ?
                    <Auction
                        currentPrice={currentAuctionPrice}
                        auctionPrice={auction}
                        addValue={addValue}
                    />:<h2>Current Price: {currentAuctionPrice}</h2>
            }
            {
                (buyPhase) ?
                    <AuctionShareTable sharePrices={sharePrices} shareNumbers={remainShare} priceUp={buyShare}/>
                    : <div></div>
            }
            {
                (gamePhase) ?
                    <GameBoard myName={myName} pay={pay}/>:<div></div>
            }

        </div>
    );
}

export default GamePage;