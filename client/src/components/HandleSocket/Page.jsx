import LoginPage from "../../LoginPage";
import WaitingPage from "../../WaitingPage";
import React from "react";
import GamePage from "../../GamePage";


const Page = ({ direct, isHost, nameList, roomCode }) => {
    switch(direct) {
        case 'LoginPage':
            return <LoginPage/>
        case 'WaitingPage':
            return <WaitingPage isHost={isHost} nameList={nameList} code={roomCode}/>
        case 'GamePage':
            return <GamePage currentAuctionPrice={0}/>
        default:
            return <h2>default</h2>
    }
}

export default Page;