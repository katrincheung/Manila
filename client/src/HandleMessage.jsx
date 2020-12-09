import React, {useEffect, useState} from 'react';
import Page from "./components/HandleSocket/Page";


const HandleMessage = ({ messageQueue }) => {

    const [ direct, setDirect ] = useState('GamePage');
    const [ isHost, setIsHost ] = useState(false);
    const [ nameList, setNameList ] = useState([]);
    const [ roomCode, setRoomCode ] = useState('');

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
                setDirect('Game');
                break;
            default:
                console.log(`${messageQueue}`);
                break;}
    },[messageQueue, setIsHost, setNameList, setDirect, setRoomCode],);

    return (
        <div>
            <Page
                direct={direct}
                isHost={isHost}
                nameList={nameList}
                roomCode={roomCode}
            />
        </div>
    );


}

export default HandleMessage;