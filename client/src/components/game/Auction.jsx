import React from 'react';
import './Auction.css'
import AuctionButton from './auction/AuctionButton'
import BidButton from "./auction/BidButton";
import {socket} from "../../App";

function Auction({ code, currentPrice, auctionPrice, addValue }) {

    const bid = () => socket.send(`BID ${auctionPrice}`);
    const pass = () => socket.send(`PASS`);


    return(
        <div className='auction'>
            <h5>Current Price</h5>
            <h5>{currentPrice}</h5>
            <h5>Bid Price</h5>
            <h5>{auctionPrice}</h5>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <AuctionButton type='button' onClick={()=>addValue(5)}>+5</AuctionButton>
                <AuctionButton type='button' onClick={()=>addValue(1)}>+1</AuctionButton>
                <AuctionButton type='button' onClick={()=>addValue(-1)}>-1</AuctionButton>
                <AuctionButton type='button' onClick={()=>addValue(-5)}>-5</AuctionButton>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BidButton type='button' onClick={bid}>BID</BidButton>
                <BidButton type='button' onClick={pass}>PASS</BidButton>
            </div>
        </div>
    )
}

export default Auction;