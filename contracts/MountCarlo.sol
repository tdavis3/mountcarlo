//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.7.0;

import "hardhat/console.sol";
//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract MountCarlo {

    uint public delay = 30 seconds;

    struct Bid {
        uint bid;
        address payable bidder;
        uint timestamp;
    }

    uint public inception;
    Bid public latestBid;
    bool public gameIsOver;

    constructor() payable {
        inception = block.timestamp;
        bid();
    }

    modifier checkIfOver() {
        require(!gameIsOver, "Sorry, this game is over.");
        _;
    }

    function collect() public {
        require(!gameIsOver, "Sorry, game is over.");
        require(block.timestamp - latestBid.timestamp > delay, "Not enough time has passed.");
        gameIsOver = true;
        latestBid.bidder.transfer(address(this).balance);
    }

    function bid() public checkIfOver payable {
        require(msg.value > latestBid.bid + 0.001 ether, "Bid must be greater than previous bid.");
        // Update latest bid
        latestBid = Bid({
            bid: msg.value,
            bidder: msg.sender,
            timestamp: block.timestamp
        });
    }

    function getTimeSinceLastBid() external view returns (uint) {
        return block.timestamp - latestBid.timestamp;
    }

}
