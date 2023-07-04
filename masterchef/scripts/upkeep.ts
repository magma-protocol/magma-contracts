import { ethers } from "hardhat";
const web3 = require("web3");

const receiver = "0x75F57C3a822cc37dd2453cAC3469a21361456BFb";

async function main() {
  const MasterChefV3Receiver = await ethers.getContractFactory("MasterChefV3Receiver");
  const masterChefRecevier = await MasterChefV3Receiver.attach(receiver);

  let upkeepTx = await masterChefRecevier.upkeep(
    "100000000000000000000000",
    86400 * 30,
    true
  );
  console.log("upkeep tx:", upkeepTx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
