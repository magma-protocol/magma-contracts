const hre = require("hardhat");
const utils = require("../common/utils");
import dotenv from "dotenv";
dotenv.config();


async function main() {
  let contractAddresses = utils.getContractAddresses("");

   let masterChefContractAddresses = utils.getContractAddresses(
     `../masterChef/deployments/${process.env.NETWORK}.json`
   );
   console.log("masterChef contract addresses:", masterChefContractAddresses);

  await hre.run("verify:verify", {
    address: contractAddresses.MagmaLmPoolDeployer,
    contract: "contracts/MagmaLmPoolDeployer.sol:MagmaLmPoolDeployer",
    constructorArguments: [masterChefContractAddresses.MasterChef],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
