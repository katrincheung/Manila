import React from 'react';
import './WaitingPage.css';
import Name from "./components/WaitingPage/Name";
import StartButton from "./components/WaitingPage/StartButton";
import Header from "./components/common/Header";


function WaitingPage({ isHost, nameList, code }) {
    return (
        <div className="waiting-page">
            <Header>Waiting Page</Header>
            <Name nameList={nameList}/>
            <StartButton isHost={isHost} code={code}/>
        </div>
    );
}

export default WaitingPage;