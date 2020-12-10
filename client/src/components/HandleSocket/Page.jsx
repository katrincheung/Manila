import LoginPage from "../../LoginPage";
import WaitingPage from "../../WaitingPage";
import React from "react";
import GamePage from "../../GamePage";


const Page = (props) => {
    switch(props.direct) {
        case 'LoginPage':
            return <LoginPage/>
        case 'WaitingPage':
            return <WaitingPage
                isHost={props.isHost}
                nameList={props.nameList}
            />
        case 'GamePage':
            return <GamePage
                currentAuctionPrice={props.currentAuctionPrice}
                auctionTurn={props.auctionTurn}
            />
        default:
            return <h2>default</h2>
    }
}

export default Page;