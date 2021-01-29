require("@nomiclabs/hardhat-waffle");

// Hardhat task definition used for testing the frontend.
require("./tasks/faucet");

const config = require("./config.json")

module.exports = {
  solidity: "0.7.3",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${config.INFURA_PROJECT_ID}`,
      accounts: [`0x${config.RINKEBY_PRIVATE_KEY}`]
    }
  }
};
