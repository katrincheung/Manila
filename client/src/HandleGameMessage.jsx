import React, { useEffect, useState } from 'react';
import Page from "./components/HandleSocket/Page";
import GamePage from "./GamePage";


const HandleGameMessage = ({ message, playerList, myName }) => {


    const [ players, setPlayers ] = useState(playerList);
    const [ initShare, setInitShare ] = useState({})
    const [ remainShare, setRemainShare ] = useState({})

    const [ currentAuctionPrice, setCurrentAuctionPrice ] = useState(0);
    const [ auctionTurn, setAuctionTurn ] = useState(false);
    const [ auctionWin, setAuctionWin ] = useState(false);

    useEffect(() => {
        console.log(`whole message = ${message}`);
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
                case 'YOUR_AUCTION':
                    setAuctionTurn(true);
                    break;
                case 'AUCTION_TURN_DONE':
                    setAuctionTurn(false);
                    break;
                case 'AUCTION_WIN':
                    setAuctionWin(true);
                    break;
                case 'UPDATE_MONEY':
                    setPlayers({...players, [message[1]]:{...players[message[1]],['money']:parseInt(message[2],10)}})
                    break;
                case 'UPDATE_SHARE':
                    setPlayers({...players, [message[1]]:{...players[message[1]],['share']:parseInt(message[2],10)}})
                    break;
                default:
                    console.log(`${message}`);
                    break;


        }

    },[message, setCurrentAuctionPrice, setAuctionTurn],);

    return (
        <div>
            {
                (Object.entries(remainShare).length !== 0)?
                    <GamePage
                        myName={myName}
                        players={players}
                        initShare={initShare}
                        remainShare={remainShare}
                        currentAuctionPrice={currentAuctionPrice}
                        auctionTurn={auctionTurn}
                        auctionWin={auctionWin}
                    />:<h4>waiting server initialise</h4>
            }

        </div>
    );


}

export default HandleGameMessage;