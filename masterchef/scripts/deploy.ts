import { ethers } from "hardhat";
const utils = require("../common/utils");
import dotenv from "dotenv";
dotenv.config();

async function main() {
  let peripheryContractAddresses = utils.getContractAddresses(`../periphery/deployments/${process.env.NETWORK}.json`);
  console.log("periphery contract addresses:", peripheryContractAddresses);

  let WMNT = process.env.WMNT !== undefined ? process.env.WMNT : "";
  console.log("WMNT addresses:", WMNT);

  let MAMA = process.env.MAMA !== undefined ? process.env.MAMA : "";
  console.log("MAMA addresses:", MAMA);

  // deploy masterChef
  const MasterChef = await ethers.getContractFactory("MasterChef");
  const masterChef = await MasterChef.deploy(
    MAMA,
    peripheryContractAddresses.NonfungiblePositionManager,
    WMNT
  );
  console.log("masterChef deployed to:", masterChef.address);

  // deploy receiver
  const MasterChefV3Receiver = await ethers.getContractFactory("MasterChefV3Receiver");
  const masterChefV3Receiver = await MasterChefV3Receiver.deploy(
    masterChef.address,
    MAMA
  );
  console.log("masterChefV3Receiver deployed to:", masterChefV3Receiver.address);

  let contractAddresses = {
    MasterChef: masterChef.address,
    MasterChefV3Receiver: masterChefV3Receiver.address,
  };
  await utils.writeContractAddresses(contractAddresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
