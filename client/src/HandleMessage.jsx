import React, {useEffect, useState} from 'react';
import Page from "./components/HandleSocket/Page";


const HandleMessage = ({ messageQueue }) => {

    const [ direct, setDirect ] = useState('LoginPage');
    const [ isHost, setIsHost ] = useState(false);
    const [ nameList, setNameList ] = useState([]);
    const [ currentAuctionPrice, setCurrentAuctionPrice ] = useState(0);
    const [ auctionTurn, setAuctionTurn ] = useState(false);

    useEffect(() => {
        console.log(`whole message = ${messageQueue}`);
        const command = messageQueue[0];
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
                break;
            case 'CURRENT_PRICE':
                setCurrentAuctionPrice(messageQueue[1]);
                break;
            case 'YOUR_AUCTION':
                setAuctionTurn(true);
                break;
            case 'AUCTION_TURN_DONE':
                setAuctionTurn(false);
                break;
            default:
                console.log(`${messageQueue}`);
                break;}
    },[messageQueue, setIsHost, setNameList, setDirect, setCurrentAuctionPrice, setAuctionTurn],);

    return (
        <div>
            <Page
                direct={direct}
                isHost={isHost}
                nameList={nameList}
                currentAuctionPrice={currentAuctionPrice}
                auctionTurn={auctionTurn}
            />
        </div>
    );


}

export default HandleMessage;