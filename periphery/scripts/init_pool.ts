import { ethers } from "hardhat";
const utils = require("../common/utils");

const wmntAddress = "0xEa12Be2389c2254bAaD383c6eD1fa1e15202b52A";
const mamaAddress = "0x3e163f861826c3f7878bd8fa8117a179d80731ab";

async function main() {
  const [owner] = await ethers.getSigners();
  let contractAddresses = utils.getContractAddresses();
  console.log("contractAddresses:", contractAddresses);

  const positionManager = await ethers.getContractAt(
    "NonfungiblePositionManager",
    contractAddresses.NonfungiblePositionManager
  );

  let initPoolTx = await positionManager.createAndInitializePoolIfNecessary(
    wmntAddress < mamaAddress ? wmntAddress : mamaAddress,
    mamaAddress > wmntAddress ? mamaAddress : wmntAddress,
    500,
    ethers.BigNumber.from("2").pow(96)
  );
  console.log("initPoolTx pool success:", initPoolTx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
