const hre = require("hardhat");
const utils = require("../common/utils");

async function main() {
  let contractAddresses = utils.getContractAddresses();

  await hre.run("verify:verify", {
    address: contractAddresses.MagmaPoolDeployer,
    contract: "contracts/MagmaPoolDeployer.sol:MagmaPoolDeployer",
    constructorArguments: [],
  });

  await hre.run("verify:verify", {
    address: contractAddresses.MagmaFactory,
    contract: "contracts/MagmaFactory.sol:MagmaFactory",
    constructorArguments: [contractAddresses.MagmaPoolDeployer],
  });

   await hre.run("verify:verify", {
     address: contractAddresses.InitCodeHashAddress,
     contract: "contracts/test/OutputCodeHash.sol:OutputCodeHash",
     constructorArguments: [],
   });

   await hre.run("verify:verify", {
     address: contractAddresses.WMNT,
     contract: "contracts/WMNT.sol:WMNT",
     constructorArguments: [],
   });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
