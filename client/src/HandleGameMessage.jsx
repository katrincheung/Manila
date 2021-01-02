import React, { useEffect, useState } from 'react';
import MyGame from "./MyGame";


const HandleGameMessage = ({ message, playerList, myName }) => {

    const [ players, setPlayers ] = useState(playerList);
    const [ initShare, setInitShare ] = useState({})
    const [ remainShare, setRemainShare ] = useState({})
    const [ sharePrices, setSharePrices ] = useState({'brown':0, 'blue':0, 'yellow':0, 'green':0});

    const [ currentAuctionPrice, setCurrentAuctionPrice ] = useState(0);
    const [ isMyTurn, setIsMyTurn ] = useState(false);

    const [ auctionPhase, setAuctionPhase ] = useState(false);
    const [ buyPhase, setBuyPhase ] = useState(false);
    const [ gamePhase, setGamePhase ] = useState(false);

    const handleMessage = (message) => {
        const command = message[0];
        switch(command){
            case 'START_SHARE':
                setInitShare({'brown':parseInt(message[1],10), 'blue':parseInt(message[2],10), 'yellow':parseInt(message[3],10), 'green':parseInt(message[4],10)})
                break;
            case 'REMAIN_SHARE':
                setRemainShare({'brown':parseInt(message[1],10)+2, 'blue':parseInt(message[2],10)+2, 'yellow':parseInt(message[3],10)+2, 'green':parseInt(message[4],10)+2})
                break;
            case 'CURRENT_PRICE':
                setCurrentAuctionPrice(parseInt(message[1],10));
                break;
            case 'YOUR_TURN':
                console.log('receive set is my turn')
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
                setPlayers({...players, [message[1]]:{...players[message[1]],['money']:parseInt(message[2],10)}});
                break;
            case 'UPDATE_PLAYER_SHARE':
                setPlayers({...players, [message[1]]:{...players[message[1]],['share']:parseInt(message[2],10)}});
                break;
            case 'UPDATE_SHARE_NUMBER':
                setRemainShare({...remainShare, [message[1]]:remainShare[message[1]]-1});
                break;
            case 'UPDATE_SHARE_PRICE':
                setSharePrices({...sharePrices, [message[1]]:parseInt(message[2],10)});
                break;
            case 'GAME_PHASE':
                setBuyPhase(false);
                setGamePhase(true);
                break;
            default:
                console.log(`default ${message}`);
                break;
        }
    }
    useEffect(() => {
        console.log(`whole message = ${message}`);
        handleMessage(message);
        // const command = message[0];
        //     switch(command){
        //         case 'START_SHARE':
        //             setInitShare({'brown':parseInt(message[1],10), 'blue':parseInt(message[2],10), 'yellow':parseInt(message[3],10), 'green':parseInt(message[4],10)})
        //             break;
        //         case 'REMAIN_SHARE':
        //             setRemainShare({'brown':parseInt(message[1],10)+2, 'blue':parseInt(message[2],10)+2, 'yellow':parseInt(message[3],10)+2, 'green':parseInt(message[4],10)+2})
        //             break;
        //         case 'CURRENT_PRICE':
        //             setCurrentAuctionPrice(parseInt(message[1],10));
        //             break;
        //         case 'YOUR_TURN':
        //             console.log('receive set is my turn')
        //             setIsMyTurn(true);
        //             break;
        //         case 'AUCTION_PHASE':
        //             setAuctionPhase(true);
        //             break;
        //         case 'BUY_PHASE':
        //             setAuctionPhase(false);
        //             setBuyPhase(true);
        //             break;
        //         case 'UPDATE_MONEY':
        //             setPlayers({...players, [message[1]]:{...players[message[1]],['money']:parseInt(message[2],10)}});
        //             break;
        //         case 'UPDATE_PLAYER_SHARE':
        //             setPlayers({...players, [message[1]]:{...players[message[1]],['share']:parseInt(message[2],10)}});
        //             break;
        //         case 'UPDATE_SHARE_NUMBER':
        //             setRemainShare({...remainShare, [message[1]]:remainShare[message[1]]-1});
        //             break;
        //         case 'UPDATE_SHARE_PRICE':
        //             setSharePrices({...sharePrices, [message[1]]:parseInt(message[2],10)});
        //             break;
        //         case 'GAME_PHASE':
        //             setBuyPhase(false);
        //             setGamePhase(true);
        //             break;
        //         default:
        //             console.log(`${message}`);
        //             break;
        // }

    },[message, setCurrentAuctionPrice, setIsMyTurn],);

    return (
        <div>
            {
                (Object.entries(remainShare).length !== 0)?
                    <MyGame
                        myName={myName}
                        players={players}
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