import { ethers } from "hardhat";

async function main() {
  const verifyStr = "npx hardhat verify --network";

  const MagmaPoolDeployer = await ethers.getContractFactory(
    "MagmaPoolDeployer"
  );
  const magmaPoolDeployer = await MagmaPoolDeployer.deploy();
  console.log("MagmaPoolDeployer", magmaPoolDeployer.address);
  console.log(
    verifyStr,
    process.env.HARDHAT_NETWORK,
    magmaPoolDeployer.address
  );

  const MagmaFactory = await ethers.getContractFactory("MagmaFactory");
  const magmaFactory = await MagmaFactory.deploy(magmaPoolDeployer.address);
  console.log("MagmaFactory", magmaFactory.address);
  console.log(
    verifyStr,
    process.env.HARDHAT_NETWORK,
    magmaFactory.address,
    magmaPoolDeployer.address
  );

  await magmaPoolDeployer.setFactoryAddress(magmaFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
