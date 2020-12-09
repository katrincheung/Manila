import React, { useState } from 'react';
import ShareTable from "./components/game/ShareTable";
import Auction from "./components/game/Auction";
import Header from "./components/common/Header";

function GamePage({ currentAuctionPrice }) {

    const [ sharePrices, setSharePrices ] = useState({'brown':0, 'blue':0, 'yellow':0, 'green':0});
    const [ shareNumbers, setShareNumbers ] = useState({'brown':5, 'blue':5, 'yellow':5, 'green':5});
    const priceUp = ( color ) => {
        switch (sharePrices[color]){
            case 5:
                setSharePrices({...sharePrices, [color]:10});
                break;
            case 10:
                setSharePrices({...sharePrices, [color]:20});
                break;
            case 20:
                setSharePrices({...sharePrices, [color]:30});
                break;
            default:
                setSharePrices({...sharePrices, [color]:5});
                break;
        }
    };
    const getShare = ( color ) => {
        if(shareNumbers[color] > 0)
            setShareNumbers({...shareNumbers, [color]:shareNumbers[color]-1});
    };

    const [ auction, setAuction ] = useState(currentAuctionPrice);
    const addFive = () => setAuction(auction+5);
    const addOne = () => setAuction(auction+1);
    const minusFive = () => setAuction(auction-5);
    const minusOne = () => setAuction(auction-1);

    const [ money, setMoney ] = useState(30);
    const [ shareList, setShareList ] = useState({'brown':0, 'blue':0, 'yellow':0, 'green':0});
    const [ port, setPort ] = useState({'A':'', 'B':'', 'C':''});//punts successfully depart, 4->6, 3->8, 2->15
    const [ shipyard, setShipyard ] = useState({'A':'', 'B':'', 'C':''});//punts fail to depart, 4->6, 3->8, 2->15
    const [ pirateSpace, setPirateSpace ] = useState([]);//pay 5 each
    const [ largePilot, setLargePilot ] = useState('');//pay 5
    const [ smallPilot, setSmallPilot ] = useState('');//pay 2
    const [ insurance, setInsurance ] = useState('');//get 10 immediately, pay for punts at shipyard


    return(
        <div>
            <Header>Game Page</Header>
            <h5>Current Status</h5>
            <h5>Money: {money}</h5>
            <h5>shares: {shareList.brown} {shareList.blue} {shareList.yellow} {shareList.green} </h5>
            <Auction
                currentPrice={currentAuctionPrice}
                auctionPrice={auction}
                addFive={addFive}
                addOne={addOne}
                minusFive={minusFive}
                minusOne={minusOne}
            />

            <ShareTable sharePrices={sharePrices} shareNumbers={shareNumbers} priceUp={priceUp} getShare={getShare}/>


        </div>
    );
}

export default GamePage;