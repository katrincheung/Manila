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
                myName={props.myName}
                players={props.players}
                initShare={props.initShare}
                remainShare={props.remainShare}
                currentAuctionPrice={props.currentAuctionPrice}
                auctionTurn={props.auctionTurn}
                auctionWin={props.auctionWin}
            />
        default:
            return <h2>default</h2>
    }
}

export default Page;