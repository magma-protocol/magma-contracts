import { ethers } from "hardhat";
const utils = require("../common/utils");

const LpAddress = "0x55F64f0EAbC15E957219b5513D2d8C823EbB7F37";

async function main() {
  let contractAddresses = utils.getContractAddresses();

  const MasterChef = await ethers.getContractFactory("MasterChef");
  const masterChef = await MasterChef.attach(contractAddresses.MasterChef);

  let owner = await  masterChef.owner();
  console.log("master chef owner:",owner);

  let LMPoolDeployer = await masterChef.LMPoolDeployer();
  console.log("master chef lm deploy:", LMPoolDeployer);

  let addPoolTx = await masterChef.add(10000, LpAddress, true);
  console.log("add pool tx: ", addPoolTx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});