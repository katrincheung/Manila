import React, {useEffect, useState} from 'react';
import AuctionShareTable from "./components/game/auction/AuctionShareTable";
import Auction from "./components/game/Auction";
import Header from "./components/common/Header";
import {socket} from "./App";
import PlayerStatusRow from "./components/game/PlayerStatusRow";
import MyStatusCard from "./components/game/MyStatusCard";

function GamePage({ myName, players, initShare, remainShare, globalSharePrices, currentAuctionPrice, auctionTurn, auctionWin }) {
    const [ money, setMoney ] = useState(30);
    useEffect(()=>socket.send(`UPDATE_MONEY ${money}`), [money])
    const [ myShareList, setMyShareList ] = useState(initShare);
    useEffect(()=>socket.send(`UPDATE_PLAYER_SHARE ${myShareList.brown+myShareList.blue+myShareList.yellow+myShareList.green}`),[myShareList])

    const [ sharePrices, setSharePrices ] = useState({'brown':0, 'blue':0, 'yellow':0, 'green':0});
    useEffect(()=>setSharePrices(globalSharePrices), [globalSharePrices])
    useEffect(()=>socket.send(`UPDATE_GLOBAL_SHARE_PRICE ${sharePrices.brown} ${sharePrices.blue} ${sharePrices.yellow} ${sharePrices.green}`),[sharePrices])
    const [ shareNumbers, setShareNumbers ] = useState(remainShare);
    useEffect(()=>setShareNumbers(remainShare),[remainShare])

    const [ buyPhase, setBuyPhase ] = useState(auctionWin);
    const buyShare = ( color ) => {
        if(shareNumbers[color] > 0) {
            socket.send(`UPDATE_SHARE_NUMBER ${color}`)
            setShareNumbers({...shareNumbers, [color]: shareNumbers[color] - 1});
            setMyShareList({...myShareList, [color]: myShareList[color] + 1});
            (sharePrices[color] == 0)? setMoney(money-5):setMoney(money-sharePrices[color]);
            switch (sharePrices[color]) {
                case 5:
                    setSharePrices({...sharePrices, [color]: 10});
                    break;
                case 10:
                    setSharePrices({...sharePrices, [color]: 20});
                    break;
                case 20:
                    setSharePrices({...sharePrices, [color]: 30});
                    break;
                default:
                    setSharePrices({...sharePrices, [color]: 5});
                    break;
            }
        }
        setBuyPhase(false);
    };
    useEffect(()=>{
        if(auctionWin){
            setBuyPhase(true);
        }else{
            setBuyPhase(false);
        }
    },[auctionWin, setBuyPhase]);

    const [ auction, setAuction ] = useState(currentAuctionPrice+1);
    useEffect(() => setAuction(currentAuctionPrice+1),[currentAuctionPrice])
    useEffect(() => {
        if(auctionWin)
            setMoney(money-currentAuctionPrice)
    },[auctionWin,currentAuctionPrice,setMoney])
    const addValue = (val) => setAuction(auction+val);

    // const [ port, setPort ] = useState({'A':'', 'B':'', 'C':''});//punts successfully depart, 4->6, 3->8, 2->15
    // const [ shipyard, setShipyard ] = useState({'A':'', 'B':'', 'C':''});//punts fail to depart, 4->6, 3->8, 2->15
    // const [ pirateSpace, setPirateSpace ] = useState([]);//pay 5 each
    // const [ largePilot, setLargePilot ] = useState('');//pay 5
    // const [ smallPilot, setSmallPilot ] = useState('');//pay 2
    // const [ insurance, setInsurance ] = useState('');//get 10 immediately, pay for punts at shipyard

    return(
        <div>
            <Header>Game Page</Header>
            <PlayerStatusRow sharePrices={sharePrices} shareNumbers={shareNumbers} myName={myName} money={money} shareList={myShareList} players={players}/>
            {
                (auctionTurn) ?
                    <Auction
                        currentPrice={currentAuctionPrice}
                        auctionPrice={auction}
                        addFive={addValue(5)}
                        addOne={addValue(1)}
                        minusFive={addValue(-5)}
                        minusOne={addValue(-1)}
                    />:<h2>Current Price: {currentAuctionPrice}</h2>
            }
            {
                (buyPhase) ?
                    <AuctionShareTable sharePrices={sharePrices} shareNumbers={shareNumbers} priceUp={buyShare}/>
                    : <div></div>
            }

        </div>
    );
}

export default GamePage;