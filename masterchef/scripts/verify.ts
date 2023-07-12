const hre = require("hardhat");
const utils = require("../common/utils");

const mamaAddress = "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39";
const wMNT = "0xEa12Be2389c2254bAaD383c6eD1fa1e15202b52A";
const positionManagerAddress = "0x63E6d23173d05d26Ce0803423a45EBE0442b63f7";

async function main() {
  let contractAddresses = utils.getContractAddresses("");

  await hre.run("verify:verify", {
    address: contractAddresses.MasterChef,
    contract: "contracts/MasterChef.sol:MasterChef",
    constructorArguments: [mamaAddress, positionManagerAddress, wMNT],
  });

  await hre.run("verify:verify", {
    address: contractAddresses.MasterChefV3Receiver,
    contract:
      "contracts/receiver/MasterChefV3Receiver.sol:MasterChefV3Receiver",
    constructorArguments: [contractAddresses.MasterChef, mamaAddress],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
