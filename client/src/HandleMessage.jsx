import React, { useEffect, useState } from 'react';
import Page from "./components/HandleSocket/Page";


const HandleMessage = ({ message }) => {

    const [ direct, setDirect ] = useState('LoginPage');
    const [ isHost, setIsHost ] = useState(false);
    const [ myName, setMyName ] = useState('');
    const [ nameList, setNameList ] = useState([]);

    const [ players, setPlayers ] = useState({});
    useEffect(()=>{
        const temp={}
        nameList.forEach(name => temp[name] = [30,2])
        setPlayers(temp)
    },[nameList, setPlayers])
    const [ initShare, setInitShare ] = useState({'brown':0, 'blue':0, 'yellow':0, 'green':0})
    const [ remainShare, setRemainShare ] = useState({'brown':0, 'blue':0, 'yellow':0, 'green':0})

    const [ currentAuctionPrice, setCurrentAuctionPrice ] = useState(0);
    const [ auctionTurn, setAuctionTurn ] = useState(false);
    const [ auctionWin, setAuctionWin ] = useState(false);
    const [ voyageTurn, setVoyageTurn ] = useState(false);
    const [ phase, setPhase ] = useState('LOGIN');

    useEffect(() => {
        console.log(`whole message = ${message}`);
        const command = message[0];
        switch (phase){
            case 'LOGIN':
                switch(command){
                    case 'HOST_PLAYER':
                        setIsHost(true);
                        setMyName(message[1])
                        break;
                    case 'GUEST_PLAYER':
                        setMyName(message[1])
                        break;
                    case 'PLAYER_LIST':
                        setNameList(message.slice(1));
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
                    case 'START_SHARE':
                        setInitShare({'brown':parseInt(message[1],10), 'blue':parseInt(message[2],10), 'yellow':parseInt(message[3],10), 'green':parseInt(message[4],10)})
                        break;
                    case 'REMAIN_SHARE':
                        setRemainShare({'brown':parseInt(message[1],10)+2, 'blue':parseInt(message[2],10)+2, 'yellow':parseInt(message[3],10)+2, 'green':parseInt(message[4],10)+2})
                        break;
                    default:
                        console.log('login phase')
                        console.log(`${message}`);
                        break;
                }
                break;
            case 'AUCTION':
                switch(command){
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
                        // buy share
                        // choose punt
                        // game voyage start
                        break;
                    default:
                        console.log('auction phase')
                        console.log(`${message}`);
                        break;
                }
                break;
            case 'VOYAGE':
                break;
            default:
                console.log('outer most default');

        }

    },[message, setIsHost, setNameList, setDirect, setCurrentAuctionPrice, setAuctionTurn],);

    return (
        <div>
            <Page
                myName={myName}
                direct={direct}
                isHost={isHost}
                nameList={nameList}
                players={players}
                initShare={initShare}
                remainShare={remainShare}
                currentAuctionPrice={currentAuctionPrice}
                auctionTurn={auctionTurn}
                auctionWin={auctionWin}
            />
        </div>
    );


}

export default HandleMessage;