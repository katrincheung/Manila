import React from 'react';
import './WaitingPage.css';
import Name from "./components/WaitingPage/Name";
import StartButton from "./components/WaitingPage/StartButton";
import Header from "./components/common/Header";


function WaitingPage({ isHost, nameList }) {
    return (
        <div className="waiting-page">
            <Header>Waiting Page</Header>
            <Name nameList={nameList}/>
            <StartButton isHost={isHost}/>
        </div>
    );
}

export default WaitingPage;