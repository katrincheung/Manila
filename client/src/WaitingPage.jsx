import React from 'react';
import { socket } from "./App";
import './WaitingPage.css';


function WaitingPage({ isHost, nameList, code }) {
    console.log(`nameList = ${nameList}`);

    const StartButton = ({ isHost }) => {
        if(isHost) {
            return <button type="button" onClick={() => socket.send(`GAME_START ${code}`)}>Start</button>
        }else {
            return  <h2></h2>
        }
    }

    return (
        <div className="waiting-page">
            <h1>Waiting Page</h1>
            <h3>
            {
                nameList.map((name,key) => <li key={key}>{name}</li>)
            }
            </h3>
            <StartButton isHost={isHost}/>
        </div>
    );
}

export default WaitingPage;