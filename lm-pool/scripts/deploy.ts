import { ethers } from "hardhat";
import { abi } from "@magmaswap/core/artifacts/contracts/MagmaFactory.sol/MagmaFactory.json";
const utils = require("../common/utils");

const masterChefAddress = "0xcBbD76a2F2926e161015b21596df37123c7f850C";
const magmaFactoryAddress = "0xd3A4204862955d1F422f533Eb581310DBaAfaf7e";

async function main() {
  const MagmaLmPoolDeployer = await ethers.getContractFactory(
    "MagmaLmPoolDeployer"
  );
  const magmaLmPoolDeployer = await MagmaLmPoolDeployer.deploy(
    masterChefAddress
  );
  console.log("MagmaLmPoolDeployer", magmaLmPoolDeployer.address);

  let contractAddresses = {
    MagmaLmPoolDeployer: magmaLmPoolDeployer.address,
  };
  await utils.writeContractAddresses(contractAddresses);

  const [owner] = await ethers.getSigners();
  const magmaFactory = new ethers.Contract(magmaFactoryAddress, abi, owner);
  let tx = await magmaFactory.setLmPoolDeployer(magmaLmPoolDeployer.address);
  console.log("SetLmPoolDeployer success, tx: ", tx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
