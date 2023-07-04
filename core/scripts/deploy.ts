import { ethers } from "hardhat";
const utils = require("../common/utils");

async function main() {
  const MagmaPoolDeployer = await ethers.getContractFactory(
    "MagmaPoolDeployer"
  );
  const magmaPoolDeployer = await MagmaPoolDeployer.deploy();
  console.log("MagmaPoolDeployer", magmaPoolDeployer.address);
  
  const MagmaFactory = await ethers.getContractFactory("MagmaFactory");
  const magmaFactory = await MagmaFactory.deploy(magmaPoolDeployer.address);
  console.log("MagmaFactory", magmaFactory.address);
 
  let setFactoryAddressTx = await magmaPoolDeployer.setFactoryAddress(magmaFactory.address);
  console.log(
    "magmaPoolDeployer setFactoryAddress tx:",
    setFactoryAddressTx.hash
  );

  const OutputCodeHash = await ethers.getContractFactory("OutputCodeHash");
  const outputCodeHash = await OutputCodeHash.deploy();
  console.log("OutputCodeHash", outputCodeHash.address);

  const hash = await outputCodeHash.getInitCodeHash();
  console.log("hash: ", hash);

  let contractAddresses = {
    MagmaPoolDeployer: magmaPoolDeployer.address,
    MagmaFactory: magmaFactory.address,
    InitCodeHashAddress: outputCodeHash.address,
    InitCodeHash: hash,
  };
  await utils.writeContractAddresses(contractAddresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
