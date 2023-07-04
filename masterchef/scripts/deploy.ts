import { ethers } from "hardhat";
const hre = require("hardhat");

const mamaAddress = "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39";
const positionManagerAddress = "0x521c76bF1F44f85eF5dbC17d5B70B7Be48Dd2f05";
const wBit = "0x8734110e5e1dcf439c7f549db740e546fea82d66";
const masterChefAddress = "0xFF79ddBB87ae69bA8Bd09579081719d06EbAa58B";


async function main() {
  // deploy masterChef
  const MasterChef = await ethers.getContractFactory("MasterChef");
  const masterChef = await MasterChef.deploy(
    mamaAddress,
    positionManagerAddress,
    wBit
  );

  console.log("masterChef deployed to:", masterChef.address);

  // deploy receiver
   const MasterChefV3Receiver = await ethers.getContractFactory("MasterChefV3Receiver");
   const masterChefV3Receiver = await MasterChefV3Receiver.deploy(
    masterChefAddress,
    mamaAddress
  );
  console.log("masterChefV3Receiver deployed to:", masterChefV3Receiver.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
