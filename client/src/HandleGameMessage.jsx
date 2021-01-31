import React, {useCallback, useEffect, useState} from 'react';
import MyGame from "./MyGame";


const HandleGameMessage = ({ msg, playerList, myName }) => {

    const [ money, setMoney ] = useState(playerList.money);
    const updateMoney = useCallback((player, val) => {
        setMoney(prev => ({...prev, [player]:val}))
    }, [setMoney])
    const [ shares, setShares ] = useState(playerList.share);
    const [ initShare, setInitShare ] = useState({})
    const [ remainShare, setRemainShare ] = useState({})
    const [ sharePrices, setSharePrices ] = useState({'brown':0, 'blue':0, 'yellow':0, 'green':0});

    const [ currentAuctionPrice, setCurrentAuctionPrice ] = useState(0);
    const [ isMyTurn, setIsMyTurn ] = useState(false);

    const [ auctionPhase, setAuctionPhase ] = useState(false);
    const [ buyPhase, setBuyPhase ] = useState(false);
    const [ gamePhase, setGamePhase ] = useState(false);

    const handleMessage = useCallback(msg => {
        const command = msg[0];
        switch(command){
            case 'START_SHARE':
                setInitShare({'brown':parseInt(msg[1],10), 'blue':parseInt(msg[2],10), 'yellow':parseInt(msg[3],10), 'green':parseInt(msg[4],10)})
                break;
            case 'UPDATE_REMAIN_SHARES':
                setRemainShare({'brown':parseInt(msg[1],10), 'blue':parseInt(msg[2],10), 'yellow':parseInt(msg[3],10), 'green':parseInt(msg[4],10)})
                break;
            case 'CURRENT_PRICE':
                setCurrentAuctionPrice(parseInt(msg[1],10));
                break;
            case 'YOUR_TURN':
                setIsMyTurn(true);
                break;
            case 'AUCTION_PHASE':
                setAuctionPhase(true);
                break;
            case 'BUY_PHASE':
                setAuctionPhase(false);
                setBuyPhase(true);
                break;
            case 'UPDATE_MONEY':
                updateMoney(msg[1],parseInt(msg[2],10))
                break;
            case 'UPDATE_PLAYER_SHARE':
                setShares(prevShares => ({...prevShares, [msg[1]]:parseInt(msg[2],10)}));
                break;
            case 'UPDATE_SHARE_NUMBER':
                setRemainShare(prev => ({...prev, [msg[1]]:prev[msg[1]]-1}));
                break;
            case 'UPDATE_SHARE_PRICE':
                setSharePrices(prev => ({...prev, [msg[1]]:parseInt(msg[2],10)}));
                break;
            case 'GAME_PHASE':
                setBuyPhase(false);
                setGamePhase(true);
                break;
            default:
                console.log(`default ${msg}`);
                break;
        }}, [updateMoney])

    useEffect(() => {
        console.log(`whole message = ${msg}`);
        handleMessage(msg);
    },[msg, handleMessage, setCurrentAuctionPrice, setIsMyTurn]);

    return (
        <div>
            {
                (Object.entries(remainShare).length !== 0)?
                    <MyGame
                        myName={myName}
                        money={money}
                        updateMoney={updateMoney}
                        shares={shares}
                        initShare={initShare}
                        remainShare={remainShare}
                        sharePrices={sharePrices}
                        currentAuctionPrice={currentAuctionPrice}
                        isMyTurn={isMyTurn}
                        setIsMyTurn={setIsMyTurn}
                        auctionPhase={auctionPhase}
                        buyPhase={buyPhase}
                        gamePhase={gamePhase}
                        handleMessage={handleMessage}
                    />:<h4>waiting server initialise</h4>
            }

        </div>
    );


}

export default HandleGameMessage;