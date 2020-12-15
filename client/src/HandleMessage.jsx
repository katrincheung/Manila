import React, { useEffect, useState } from 'react';
import Page from "./components/HandleSocket/Page";
import HandleGameMessage from "./HandleGameMessage";


const HandleMessage = ({ message }) => {


    const [ direct, setDirect ] = useState('LoginPage');
    const [ isHost, setIsHost ] = useState(false);
    const [ myName, setMyName ] = useState('');
    const [ nameList, setNameList ] = useState([]);
    const [ inGame, setInGame ] = useState(false);
    const [ players, setPlayers ] = useState('');

    function updatePlayer(){
        const temp = {}
        nameList.forEach(name => {
            if (name !== myName)
                temp[name] = {'money': 30, 'share': 2}
        })
        setPlayers(temp)
    }
    useEffect(()=>{
        if(players !== ''){
            console.log(players)
            setInGame(true)
        }
    },[players])

    useEffect(() => {
        if(!inGame){
            const command = message[0];
            switch (command) {
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
                    updatePlayer();
                    break;
                default:
                    console.log(`${message}`);
                    break;
            }
        }
    }, [message, inGame, setIsHost, setNameList, setDirect]);

    return (
        <div>
            {
                (!inGame) ?
                    <Page
                        myName={myName}
                        direct={direct}
                        isHost={isHost}
                        nameList={nameList}
                    /> :
                    <HandleGameMessage message={message} playerList={players} myName={myName}/>
            }
        </div>
    );

}


export default HandleMessage;