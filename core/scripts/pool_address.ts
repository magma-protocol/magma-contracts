import { ethers } from "hardhat";
const utils = require("../common/utils");

const mamaAddress = "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39";
const usdcAddress = "0x82A2eb46a64e4908bBC403854bc8AA699bF058E9";

async function main() {
  let contractAddresses = utils.getContractAddresses("");
  console.log("contractAddresses:", contractAddresses);

  // const MagmaFactory = await ethers.getContractAt(
  //   "MagmaFactory",
  //   contractAddresses.MagmaFactory
  // );
  // let poolAddress = await MagmaFactory.getPool(mamaAddress,usdcAddress,500);
  // console.log("getPool:", poolAddress);

  const MagmaPool = await ethers.getContractAt(
    "MagmaPool",
    "0xabb213151ee053180348d9423f7f8daf24f46f02"
  );

  let slot0 = await MagmaPool.slot0();
  console.log("slot0:", slot0);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
