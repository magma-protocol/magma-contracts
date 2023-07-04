const hre = require("hardhat");
const utils = require("../common/utils");

const mamaAddress = "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39";
const positionManagerAddress = "0x521c76bF1F44f85eF5dbC17d5B70B7Be48Dd2f05";
const wBit = "0x8734110e5e1dcf439c7f549db740e546fea82d66";
const masterChefAddress = "0xFF79ddBB87ae69bA8Bd09579081719d06EbAa58B";
const receiver = "0x75F57C3a822cc37dd2453cAC3469a21361456BFb";

async function main() {
  await hre.run("verify:verify", {
    address: masterChefAddress,
    contract: "contracts/MasterChef.sol:MasterChef",
    constructorArguments: [
      mamaAddress,
      positionManagerAddress,
      wBit
    ],
  });

  await hre.run("verify:verify", {
    address: receiver,
    contract:
      "contracts/receiver/MasterChefV3Receiver.sol:MasterChefV3Receiver",
    constructorArguments: [
      masterChefAddress,
      mamaAddress
    ],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
