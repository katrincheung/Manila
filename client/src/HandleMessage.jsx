import React, {useEffect, useState} from 'react';
import Page from "./components/HandleSocket/Page";


const HandleMessage = ({ messageQueue }) => {

    const [ direct, setDirect ] = useState('LoginPage');
    const [ isHost, setIsHost ] = useState(false);
    const [ nameList, setNameList ] = useState([]);
    const [ currentAuctionPrice, setCurrentAuctionPrice ] = useState(0);
    const [ auctionTurn, setAuctionTurn ] = useState(false);
    const [ auctionWin, setAuctionWin ] = useState(false);
    const [ voyageTurn, setVoyageTurn ] = useState(false);
    const [ phase, setPhase ] = useState('LOGIN');

    useEffect(() => {
        console.log(`whole message = ${messageQueue}`);
        const command = messageQueue[0];
        switch (phase){
            case 'LOGIN':
                switch(command){
                    case 'HOST_PLAYER':
                        setIsHost(true);
                        break;
                    case 'GUEST_PLAYER':
                        console.log('guest');
                        break;
                    case 'PLAYER_LIST':
                        setNameList(messageQueue.slice(1));
                        setDirect('WaitingPage');
                        break;
                    case 'HOST_DISCONNECTED':
                        setDirect('LoginPage');
                        setNameList([]);
                        break;
                    case 'GAME_START':
                        setDirect('GamePage');
                        setPhase('AUCTION');
                        break;
                    default:
                        console.log('login phase')
                        console.log(`${messageQueue}`);
                        break;
                }
                break;
            case 'AUCTION':
                switch(command){
                    case 'CURRENT_PRICE':
                        setCurrentAuctionPrice(parseInt(messageQueue[1],10));
                        break;
                    case 'YOUR_AUCTION':
                        setAuctionTurn(true);
                        break;
                    case 'AUCTION_TURN_DONE':
                        setAuctionTurn(false);
                        break;
                    case 'AUCTION_WIN':
                        setAuctionWin(true);
                        // buy share
                        // choose punt
                        // game voyage start
                        break;
                    default:
                        console.log('auction phase')
                        console.log(`${messageQueue}`);
                        break;
                }
                break;
            case 'VOYAGE':
                break;
            default:
                console.log('outer most default');

        }

    },[messageQueue, setIsHost, setNameList, setDirect, setCurrentAuctionPrice, setAuctionTurn],);
    console.log('render');
    return (
        <div>
            <Page
                direct={direct}
                isHost={isHost}
                nameList={nameList}
                currentAuctionPrice={currentAuctionPrice}
                auctionTurn={auctionTurn}
                auctionWin={auctionWin}
            />
        </div>
    );


}

export default HandleMessage;