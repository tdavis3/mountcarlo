// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
    // This is just a convenience check
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which" +
            "gets automatically created and destroyed every time. " +
            "Use the Hardhat option '--network localhost'"
        );
    }

    // ethers is available in the global scope
    const [deployer] = await ethers.getSigners();
    console.log("Deploying the contracts with the account:", await deployer.getAddress());

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const MC = await ethers.getContractFactory("MountCarlo");
    // Send 0.002 to the contract on a deploy
    const mountCarlo = await MC.deploy({value: ethers.utils.parseEther("0.002")});
    await mountCarlo.deployed();

    console.log("Contract address:", mountCarlo.address);

    // We also save the contract's artifacts and address in the client directory
    saveClientFiles(mountCarlo);
}

function saveClientFiles(contract) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../client/src/contracts";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + "/contract-address.json",
        JSON.stringify({MountCarlo: contract.address}, undefined, 2)
    );

    const ContractArtifact = artifacts.readArtifactSync("MountCarlo");

    fs.writeFileSync(
        contractsDir + "/MountCarlo.json",
        JSON.stringify(ContractArtifact, null, 2)
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
