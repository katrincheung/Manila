import React from 'react';
import './Auction.css'
import AuctionButton from './auction/AuctionButton'
import BidButton from "./auction/BidButton";
import {socket} from "../../App";

function Auction({ code, currentPrice, auctionPrice, addFive, addOne, minusFive, minusOne }) {

    const bid = () => socket.send(`BID ${auctionPrice}`);
    const pass = () => socket.send(`PASS`);


    return(
        <div className='auction'>
            <h5>Current Price</h5>
            <h5>{currentPrice}</h5>
            <h5>Bid Price</h5>
            <h5>{auctionPrice}</h5>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <AuctionButton type='button' onClick={addFive}>+5</AuctionButton>
                <AuctionButton type='button' onClick={addOne}>+1</AuctionButton>
                <AuctionButton type='button' onClick={minusOne}>-1</AuctionButton>
                <AuctionButton type='button' onClick={minusFive}>-5</AuctionButton>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BidButton type='button' onClick={bid}>BID</BidButton>
                <BidButton type='button' onClick={pass}>PASS</BidButton>
            </div>
        </div>
    )
}

export default Auction;