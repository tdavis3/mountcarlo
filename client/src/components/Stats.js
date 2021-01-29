import React, {useEffect} from 'react';
import {ethers} from "ethers";
import './Stats.css';


const Stats = ({contractState}) => {

    useEffect(() => {
    }, [contractState]);

    return (
        <div className="Stats">
            <h2 className="view-title">Most Recent Data</h2>
            <p>This game is currently {contractState.gameOver ? "INACTIVE" : "ACTIVE"}</p>
            <p>Prize Pool: {ethers.utils.formatEther(contractState.balance)} ETH</p>
            <p>Delay: {contractState.delay} seconds</p>
            <p>Seconds since last bid: {contractState.timeElapsed}</p>
            <p>Current Highest Bid: {ethers.utils.formatEther(contractState.latestBid.bid)} ETH
                @{contractState.latestBid.timestamp.toLocaleTimeString()}</p>
            <p> Current Bidder: {" "}
                <a target="noreferrer noopener"
                   style={{color: "white", textDecoration: "none"}}
                   href={"https://rinkeby.etherscan.io/address/" + contractState.latestBid.bidder}
                >
                    {contractState.latestBid.bidder}
                </a>
            </p>
            <hr className="initialized-info"/>
            <p>Game Deployed
                on: {contractState.inception.toLocaleDateString()} @{contractState.inception.toLocaleTimeString()}</p>
            <p>Game Address: {" "}
                <a target="noreferrer noopener"
                   style={{color: "white", textDecoration: "none"}}
                   href={"https://rinkeby.etherscan.io/address/" + contractState.contractAddress}
                >
                    {contractState.contractAddress}
                </a>
            </p>
        </div>
    );
}

export default Stats;
