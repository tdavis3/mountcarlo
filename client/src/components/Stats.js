import React, {useEffect, useRef} from 'react';
import {ethers} from "ethers";
import './Stats.css';
import {connect} from "react-redux";
import {loadContractData} from "../redux/actions/contractData";


const Stats = ({metaData, contractData}) => {

    const pollDataInterval = useRef(0);

    useEffect(() => {
        // return () => _stopPollingData();
    }, [contractData.data]);

    // The next to methods are needed to start and stop polling data.
    // const _startPollingData = () => {
    //     pollDataInterval.current = setInterval(getMCData, 1000);
    //     // Run it once immediately - don't have to wait for it
    //     getMCData();
    // }
    //
    // const _stopPollingData = () => {
    //     clearInterval(pollDataInterval.current);
    //     pollDataInterval.current = 0;
    // }

    return (
        <div className="Stats">
            <h2 className="view-title">Most Recent Data</h2>
            <p>This game is currently {contractData.data.gameOver ? "INACTIVE" : "ACTIVE"}</p>
            <p>Prize Pool: {ethers.utils.formatEther(contractData.data.balance)} ETH</p>
            <p>Delay: {contractData.data.delay} seconds</p>
            <p>Seconds since last bid: {contractData.data.timeElapsed}</p>
            <p>Current Highest Bid: {ethers.utils.formatEther(contractData.data.latestBid.bid)} ETH
                @{contractData.data.latestBid.timestamp.toLocaleTimeString()}</p>
            <p> Current Bidder: {" "}
                <a target="noreferrer noopener"
                   style={{color: "white", textDecoration: "none"}}
                   href={"https://rinkeby.etherscan.io/address/" + contractData.data.latestBid.bidder}
                >
                    {contractData.data.latestBid.bidder}
                </a>
            </p>
            <hr className="initialized-info"/>
            <p>Game Deployed
                on: {contractData.data.inception.toLocaleDateString()} @{contractData.data.inception.toLocaleTimeString()}</p>
            <p>Game Address: {" "}
                <a target="noreferrer noopener"
                   style={{color: "white", textDecoration: "none"}}
                   href={"https://rinkeby.etherscan.io/address/" + metaData.contract.address}
                >
                    {metaData.contract.address}
                </a>
            </p>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        metaData: state.metaData,
        contractData: state.contractData
    }
}

export default connect(mapStateToProps, {loadContractData})(Stats);
