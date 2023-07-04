import { ethers } from "hardhat";

async function main() {
  const verifyStr = "npx hardhat verify --network";

  const OutputCodeHash = await ethers.getContractFactory("OutputCodeHash");
  const outputCodeHash = await OutputCodeHash.deploy();
  console.log("OutputCodeHash", outputCodeHash.address);
  console.log(verifyStr, process.env.HARDHAT_NETWORK, outputCodeHash.address);

  const hash = await outputCodeHash.getInitCodeHash();
  console.log("hash: ", hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
