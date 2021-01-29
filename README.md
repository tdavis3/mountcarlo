# Mount Carlo

This repository contains the Mount Carlo project.

## Quick start


Once installed, run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to deploy your contract:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

Finally, we can run the frontend with:

```sh
cd client
npm install
npm start
```

Use the faucet to send yourself some test eth:

```sh
npx hardhat --network localhost faucet <address here>
```


You can also interact with the contract in the console
(https://docs.openzeppelin.com/learn/deploying-and-interacting)

```sh
$ npx hardhat console --network localhost

> const MountC = await ethers.getContractFactory("MountCarlo")
> undefined
>
> const mc = await MountC.attach("<address>")
> undefined
>
> await box.retrieve()
> BigNumber { _hex: '0x2a', _isBigNumber: true }

```


> Note: There's [an issue in `ganache-core`](https://github.com/trufflesuite/ganache-core/issues/650) that can make the `npm install` step fail. 
>
> If you see `npm ERR! code ENOLOCAL`, try running `npm ci` instead of `npm install`.

Open [http://localhost:3000/](http://localhost:3000/) to see the Dapp. You will
need to have [Metamask](https://metamask.io) installed and listening to `localhost 8545`.

## The environment?

Powered by Hardhat and React.

- [Hardhat](https://hardhat.org/): An Ethereum development task runner and testing network.
- [Mocha](https://mochajs.org/): A JavaScript test runner.
- [Chai](https://www.chaijs.com/): A JavaScript assertion library.
- [ethers.js](https://docs.ethers.io/ethers.js/html/): A JavaScript library for interacting with Ethereum.
- [Waffle](https://github.com/EthWorks/Waffle/): To have Ethereum-specific Chai assertions/mathers.

## Troubleshooting

- `Invalid nonce` errors: if you are seeing this error on the `npx hardhat node`
  console, try resetting your Metamask account. This will reset the account's
  transaction history and also the nonce. Open Metamask, click on your account
  followed by `Settings > Advanced > Reset Account`.

