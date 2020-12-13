import React, {useEffect, useState} from 'react';
import ShareTable from "./components/game/ShareTable";
import Auction from "./components/game/Auction";
import Header from "./components/common/Header";
import {socket} from "./App";
import PlayerStatusCard from "./components/game/PlayerStatusCard";

function GamePage({ players, initShare, remainShare, currentAuctionPrice, auctionTurn, auctionWin }) {

    const [ money, setMoney ] = useState(30);
    const [ myShareList, setMyShareList ] = useState(initShare);

    const [ sharePrices, setSharePrices ] = useState({'brown':0, 'blue':0, 'yellow':0, 'green':0});
    const [ shareNumbers, setShareNumbers ] = useState(remainShare);
    const getShare = ( color ) => {
        if(shareNumbers[color] > 0) {
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
    const [ buyPhase, setBuyPhase ] = useState(auctionWin);
    useEffect(()=>{
        if(auctionWin){
            setBuyPhase(true);
        }else{
            setBuyPhase(false);
        }
    },[auctionWin, setBuyPhase]);
    useEffect(()=>socket.send(`UPDATE ${money}`
        +` [${myShareList.brown},${myShareList.blue},${myShareList.yellow},${myShareList.green}]`
        +` [${sharePrices.brown},${sharePrices.blue},${sharePrices.yellow},${sharePrices.green}]`
        +` [${shareNumbers.brown},${shareNumbers.blue},${shareNumbers.yellow},${shareNumbers.green}]`)
        ,[money, myShareList, sharePrices, shareNumbers])


    const [ puntPhase, setPuntPhase ] = useState(false);

    const [ auction, setAuction ] = useState(currentAuctionPrice+1);
    useEffect(() => setAuction(currentAuctionPrice+1),[currentAuctionPrice])
    useEffect(() => {
        if(auctionWin)
            setMoney(money-currentAuctionPrice)
    },[auctionWin,currentAuctionPrice,setMoney])
    const addFive = () => setAuction(auction+5);
    const addOne = () => setAuction(auction+1);
    const minusFive = () => setAuction(auction-5);
    const minusOne = () => setAuction(auction-1);

    const [ port, setPort ] = useState({'A':'', 'B':'', 'C':''});//punts successfully depart, 4->6, 3->8, 2->15
    const [ shipyard, setShipyard ] = useState({'A':'', 'B':'', 'C':''});//punts fail to depart, 4->6, 3->8, 2->15
    const [ pirateSpace, setPirateSpace ] = useState([]);//pay 5 each
    const [ largePilot, setLargePilot ] = useState('');//pay 5
    const [ smallPilot, setSmallPilot ] = useState('');//pay 2
    const [ insurance, setInsurance ] = useState('');//get 10 immediately, pay for punts at shipyard
    console.log(players)
    console.log(players.p1[0])

    return(
        <div>
            <Header>Game Page</Header>
            <h5>Current Status</h5>
            <h5>Money: {money}</h5>
            <h5>shares: {myShareList.brown} {myShareList.blue} {myShareList.yellow} {myShareList.green} </h5>
            <PlayerStatusCard name='self' money={money} shareNumber={0} />
            {
                (auctionTurn) ?
                    <Auction
                        currentPrice={currentAuctionPrice}
                        auctionPrice={auction}
                        addFive={addFive}
                        addOne={addOne}
                        minusFive={minusFive}
                        minusOne={minusOne}
                    />:<h2>Current Price: {currentAuctionPrice}</h2>
            }
            {
                (buyPhase) ?
                    <ShareTable sharePrices={sharePrices} shareNumbers={shareNumbers} priceUp={getShare}/>
                    : <div></div>
            }

        </div>
    );
}

export default GamePage;