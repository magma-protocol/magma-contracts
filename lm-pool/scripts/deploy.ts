import { ethers } from "hardhat";
import { abi } from "@magmaswap/core/artifacts/contracts/MagmaFactory.sol/MagmaFactory.json";

const masterChefAddress = "0xd9bf825c35F383506203537696C3597cB8306c55";
const magmaFactoryAddress = "0x651570c879ca1C09AAfF7e10c17F79c17709390C";

const magmaLmPoolDeloyerAddress = "0xCaBb72b55CdadcEbaA7fa78cE97730824CD9561B";

async function main() {
  const MagmaLmPoolDeployer = await ethers.getContractFactory(
    "MagmaLmPoolDeployer"
  );
  const magmaLmPoolDeployer = await MagmaLmPoolDeployer.deploy(
    masterChefAddress
  );
  console.log("MagmaLmPoolDeployer", magmaLmPoolDeployer.address);

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
