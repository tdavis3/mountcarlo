const fs = require("fs");

// This file is only here to make interacting with the Dapp easier,
// feel free to ignore it if you don't need it.

task("faucet", "Sends ETH an address")
    .addPositionalParam("receiver", "The address that will receive them")
    .setAction(async ({receiver}) => {
        if (network.name === "hardhat") {
            console.warn(
                "You are running the faucet task with Hardhat network, which" +
                "gets automatically created and destroyed every time. Use the Hardhat" +
                " option '--network localhost'"
            );
        }

        const addressesFile =
            __dirname + "/../client/src/contracts/contract-address.json";

        if (!fs.existsSync(addressesFile)) {
            console.error("You need to deploy your contract first");
            return;
        }

        const addressJson = fs.readFileSync(addressesFile);
        const address = JSON.parse(addressJson);

        if ((await ethers.provider.getCode(address.MountCarlo)) === "0x") {
            console.error("You need to deploy your contract first");
            return;
        }

        // const mountCarlo = await ethers.getContractAt("MountCarlo", address.MountCarlo);
        const [sender] = await ethers.getSigners();

        // const tx = await mountCarlo.<some func>(<some param0>, <some param1>);
        // await tx.wait();

        console.log("receiver: ", receiver);
        const tx2 = await sender.sendTransaction({
            to: receiver,
            value: ethers.constants.WeiPerEther,
        });
        await tx2.wait();

        console.log(`Transferred 1 ETH to ${receiver}`);
    });
