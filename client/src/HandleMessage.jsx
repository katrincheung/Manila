import React, {useEffect, useState} from 'react';
import WaitingPage from "./WaitingPage";
import LoginPage from "./LoginPage";
import GamePage from "./GamePage";

const HandleMessage = ({ messageQueue }) => {

    const [ direct, setDirect ] = useState('GamePage');
    const [ isHost, setIsHost ] = useState(false);
    const [ nameList, setNameList ] = useState([]);
    const [ roomCode, setRoomCode ] = useState('');

    const Page = ({ to }) => {
        switch(to) {
            case 'LoginPage':
                return <LoginPage/>
            case 'WaitingPage':
                return <WaitingPage isHost={isHost} nameList={nameList} code={roomCode}/>
            case 'GamePage':
                return <GamePage/>
            default:
                return <h2>default</h2>
        }
    }

    useEffect(() => {
        console.log(`whole message = ${messageQueue}`);
        const command = messageQueue[0];
        switch(command){
            case 'HOST_PLAYER':
                setIsHost(true);
                setRoomCode(messageQueue[1]);
                break;
            case 'GUEST_PLAYER':
                setRoomCode(messageQueue[1]);
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
            default:
                console.log(`${messageQueue}`);
                break;}
        },[messageQueue, setIsHost, setNameList, setDirect, setRoomCode],);

    return (
        <div>
            <Page to={direct}/>
        </div>
    );


    }

export default HandleMessage;