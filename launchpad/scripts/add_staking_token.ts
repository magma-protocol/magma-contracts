import { ethers } from "hardhat";
const utils = require("../common/utils");
const fs = require("fs");

const mamaAddress = "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39";

async function main() {
  let contractAddresses = utils.getContractAddresses();

  const [owner, keeper] = await ethers.getSigners()

  const StakingPool = await ethers.getContractFactory("StakingPool");
  const stakingPool = await StakingPool.attach(contractAddresses.StakingPool);

  let addTx = await stakingPool.addStakingToken(mamaAddress);
  console.log("addStakingToken:", addTx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
