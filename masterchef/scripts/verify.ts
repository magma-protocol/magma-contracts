const hre = require("hardhat");
const utils = require("../common/utils");

async function main() {
  let peripheryContractAddresses = utils.getContractAddresses(
    `../periphery/deployments/${process.env.NETWORK}.json`
  );
  console.log("periphery contract addresses:", peripheryContractAddresses);

  let WMNT = process.env.WMNT !== undefined ? process.env.WMNT : "";
  console.log("WMNT addresses:", WMNT);

  let MAMA = process.env.MAMA !== undefined ? process.env.MAMA : "";
  console.log("MAMA addresses:", MAMA);

  let contractAddresses = utils.getContractAddresses("");

  await hre.run("verify:verify", {
    address: contractAddresses.MasterChef,
    contract: "contracts/MasterChef.sol:MasterChef",
    constructorArguments: [
      MAMA,
      peripheryContractAddresses.NonfungiblePositionManager,
      WMNT,
    ],
  });

  await hre.run("verify:verify", {
    address: contractAddresses.MasterChefV3Receiver,
    contract:
      "contracts/receiver/MasterChefV3Receiver.sol:MasterChefV3Receiver",
    constructorArguments: [contractAddresses.MasterChef, MAMA],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
