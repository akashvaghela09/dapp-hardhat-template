const { ethers } = require("hardhat");

async function main() {
    const Contract = await ethers.getContractFactory(
        "Test"   // Contract Name
    );

    // Create new instance
    const ContractInstance = await Contract.deploy()

    await ContractInstance.deployed();
    console.log("Success, Contract Deployed: ", ContractInstance.address);
}

main()
.then(() => {
    process.exit(0)
})
.catch((err) => {
    console.error(err);
    process.exit(1);
})