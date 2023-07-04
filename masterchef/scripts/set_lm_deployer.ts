import { ethers } from "hardhat";
const utils = require("../common/utils");

const lmPoolDeployer = "0xCaBb72b55CdadcEbaA7fa78cE97730824CD9561B";
const masterChefAddress = "0xFF79ddBB87ae69bA8Bd09579081719d06EbAa58B";
const receiver = "0x75F57C3a822cc37dd2453cAC3469a21361456BFb";

async function main() {
  let contractAddresses = utils.getContractAddresses();

  const MasterChef = await ethers.getContractFactory("MasterChef");
  const masterChef = await MasterChef.attach(masterChefAddress);


  // set lmpool deployer
  let LMPoolDeployer = await masterChef.LMPoolDeployer();
  console.log("master chef lm deploy:", LMPoolDeployer);

  if (LMPoolDeployer == "0x0000000000000000000000000000000000000000") {
    let setLmDeployer = await masterChef.setLMPoolDeployer(lmPoolDeployer);
    console.log("set lmPoolDeployer tx: ", setLmDeployer.hash);
  }

  // set receiver
  let masterChefReceiver = await masterChef.receiver();
  console.log("masterChef receiver:", masterChefReceiver);

  if (masterChefReceiver == "0x0000000000000000000000000000000000000000") {
    let setReceiver = await masterChef.setReceiver(receiver);
    console.log("setReceiver tx: ", setReceiver.hash);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
