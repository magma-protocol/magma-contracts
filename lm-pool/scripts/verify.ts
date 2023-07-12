const hre = require("hardhat");
const utils = require("../common/utils");

const masterChefAddress = "0xcBbD76a2F2926e161015b21596df37123c7f850C";

async function main() {
  let contractAddresses = utils.getContractAddresses("");

  await hre.run("verify:verify", {
    address: contractAddresses.MagmaLmPoolDeployer,
    contract: "contracts/MagmaLmPoolDeployer.sol:MagmaLmPoolDeployer",
    constructorArguments: [masterChefAddress],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
