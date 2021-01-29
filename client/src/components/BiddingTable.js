import React, {useState, useEffect} from 'react';
import './BiddingTable.css';
import {Button} from 'rebass';
import {Input} from '@rebass/forms';
import Loading from "./Loading";


const BiddingTable = ({contractState, sendBid, loading}) => {

    useEffect(() => {
    }, [loading]);

    const [inputBid, setInputBid] = useState(0);

    const handleChange = e => {
        setInputBid(e.target.value);
    }

    const executeBid = async () => {
        if (inputBid > 0.001) {  // TODO: Probably 0.001 (the minimum bid) should not be hardcoded
            await sendBid(inputBid.toString());
        }
    }

    if (contractState.gameOver) {
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
                <Button onClick={executeBid} disabled={contractState.gameOver}>Bid</Button>
                {loading && (<Loading/>)}
            </div>
        </div>
    );
}

export default BiddingTable;
