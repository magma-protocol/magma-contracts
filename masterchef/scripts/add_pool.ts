import { ethers } from "hardhat";

const LpAddress = "0xd27d7eb5eabfdf563c69d7973cc42a12b270702b";
const masterChefAddress = "0xFF79ddBB87ae69bA8Bd09579081719d06EbAa58B";

async function main() {
  const MasterChef = await ethers.getContractFactory("MasterChef");
  const masterChef = await MasterChef.attach(masterChefAddress);

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