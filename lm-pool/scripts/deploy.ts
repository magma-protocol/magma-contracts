import { ethers } from "hardhat";
import { abi } from "@magmaswap/core/artifacts/contracts/MagmaFactory.sol/MagmaFactory.json";
const utils = require("../common/utils");

import dotenv from "dotenv";
dotenv.config();

async function main() {
   let coreContractAddresses = utils.getContractAddresses(
     `../core/deployments/${process.env.NETWORK}.json`
   );
   console.log("core contract addresses:", coreContractAddresses);

    let masterChefContractAddresses = utils.getContractAddresses(
      `../masterChef/deployments/${process.env.NETWORK}.json`
    );
    console.log("masterChef contract addresses:", masterChefContractAddresses);

   let WMNT = process.env.WMNT !== undefined ? process.env.WMNT : "";
   console.log("WMNT addresses:", WMNT);

   let MAMA = process.env.MAMA !== undefined ? process.env.MAMA : "";
   console.log("MAMA addresses:", MAMA);

  const MagmaLmPoolDeployer = await ethers.getContractFactory(
    "MagmaLmPoolDeployer"
  );
  const magmaLmPoolDeployer = await MagmaLmPoolDeployer.deploy(
    masterChefContractAddresses.MasterChef
  );
  console.log("MagmaLmPoolDeployer", magmaLmPoolDeployer.address);

  let contractAddresses = {
    MagmaLmPoolDeployer: magmaLmPoolDeployer.address,
  };
  await utils.writeContractAddresses(contractAddresses);

  const [owner] = await ethers.getSigners();
  const magmaFactory = new ethers.Contract(
    coreContractAddresses.MagmaFactory,
    abi,
    owner
  );
  let tx = await magmaFactory.setLmPoolDeployer(magmaLmPoolDeployer.address);
  console.log("SetLmPoolDeployer success, tx: ", tx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
