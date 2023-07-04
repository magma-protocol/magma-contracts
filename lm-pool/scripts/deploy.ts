import { ethers } from "hardhat";
import { abi } from "@magmaswap/core/artifacts/contracts/MagmaFactory.sol/MagmaFactory.json";

const masterChefAddress = "0xFF79ddBB87ae69bA8Bd09579081719d06EbAa58B";
const magmaFactoryAddress = "0x5a296481eb35fc57a471afd448213c77e9d779a1";

const magmaLmPoolDeloyerAddress = "0xCaBb72b55CdadcEbaA7fa78cE97730824CD9561B";

async function main() {
  // const MagmaLmPoolDeployer = await ethers.getContractFactory(
  //   "MagmaLmPoolDeployer"
  // );
  // const magmaLmPoolDeployer = await MagmaLmPoolDeployer.deploy(
  //   masterChefAddress
  // );
  // console.log("MagmaLmPoolDeployer", magmaLmPoolDeployer.address);

  const [owner] = await ethers.getSigners();
  const magmaFactory = new ethers.Contract(magmaFactoryAddress, abi, owner);
  let tx = await magmaFactory.setLmPoolDeployer(magmaLmPoolDeloyerAddress);
  console.log("SetLmPoolDeployer success, tx: ", tx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
