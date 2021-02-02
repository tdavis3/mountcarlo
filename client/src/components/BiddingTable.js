import React, {useState, useEffect} from 'react';
import './BiddingTable.css';
import {Button} from 'rebass';
import {Input} from '@rebass/forms';
import Loading from "./Loading";
import {connect} from "react-redux";
import {ethers} from "ethers";
import {ERROR_CODE_TX_REJECTED_BY_USER} from "../utilities";


const BiddingTable = ({metaData, contractData}) => {

    useEffect(() => {
    }, [metaData, contractData.data]);

    const [inputBid, setInputBid] = useState(0);
    const [bidTxLoading, setBidTxLoading] = useState(false);

    const handleChange = e => {
        setInputBid(e.target.value);
    }

    /**
     * Sends bid to Mount Carlo contract
     * @param {String} bid
     */
    const sendBid = async () => {
        if (!(inputBid > 0.001)) {
            return;
        }
        const bid = inputBid.toString();
        try {
            setBidTxLoading(true);
            const bidTx = await metaData.contract.bid({value: ethers.utils.parseEther(bid)});  // Send the transaction
            const receipt = await bidTx.wait();  // Wait for the transaction to be mined
            if (receipt.status === 0) {
                // We can't know the exact error that make the transaction fail once it was
                // mined, so we throw this generic one.
                // TODO: Display an error message
                console.log("An error occurred when attempting to send a bid of: ", bid);
                // throw new Error("Bid transaction failed when sending a bid of: " + bid);
            }
            // At this point the tx was successful
            setBidTxLoading(false);
        } catch (error) {
            setBidTxLoading(false);
            // If the user rejected tx, then do nothing
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                return;
            }
            // TODO: Other errors should be logged and handled
        }
    }

    if (contractData.data.gameOver) {
        return (
            <div className="BiddingTable">
                <h2 className="view-title">Bidding Table</h2>
                <h4>This game is over, thus bidding is now closed.</h4>
                <h4>Stay tuned for our next game!</h4>
            </div>
        );
    }

    return (
        <div className="BiddingTable">
            <h2 className="view-title">Bidding Table</h2>
            <div className="bid-handler">
                <div className="bid-input">
                    <Input
                        id='bid'
                        name='bid'
                        type='number'
                        value={inputBid}
                        onChange={handleChange}
                    />
                    <div className="bid-input-units">
                        <p className="units">ETH</p>
                    </div>
                </div>
                <Button onClick={sendBid} disabled={contractData.data.gameOver}>Bid</Button>
                <p>Your bid must be strictly greater than (highestBid + 0.001)</p>
                {bidTxLoading && (<Loading/>)}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        metaData: state.metaData,
        contractData: state.contractData
    }
}

export default connect(mapStateToProps, null)(BiddingTable);
