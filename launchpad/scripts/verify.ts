const hre = require("hardhat");
const utils = require("../common/utils");

const mamaAddress = "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39";
const positionManagerAddress = "0x521c76bF1F44f85eF5dbC17d5B70B7Be48Dd2f05";
const WMNT = "0xEa12Be2389c2254bAaD383c6eD1fa1e15202b52A";
const masterChefAddress = "0xFF79ddBB87ae69bA8Bd09579081719d06EbAa58B";

async function main() {
    let contractAddresses = utils.getContractAddresses();
    console.log(contractAddresses);

   const lockPeriod = 600;
   const tierScores = [
     50 * 1e8,
     100 * 1e8,
     500 * 1e8,
     1000 * 1e8,
     5000 * 1e8,
     10000 * 1e8,
   ];
    await hre.run("verify:verify", {
      address: contractAddresses.StakingPool,
      contract: "contracts/StakingPool.sol:StakingPool",
      constructorArguments: [
        WMNT,
        contractAddresses.ScoreCalculator.Proxy,
        lockPeriod,
        tierScores,
      ],
    });
    return

    await hre.run("verify:verify", {
      address: contractAddresses.IdoPoolTemplate,
      contract: "contracts/IdoPool.sol:IdoPool",
      constructorArguments: [],
    });

    await hre.run("verify:verify", {
      address: contractAddresses.IdoPoolFactory,
      contract: "contracts/IdoPoolFactory.sol:IdoPoolFactory",
      constructorArguments: [contractAddresses.IdoPoolTemplate],
    });

    await hre.run("verify:verify", {
      address: contractAddresses.InsurancePool,
      contract: "contracts/InsurancePool.sol:InsurancePool",
      constructorArguments: [contractAddresses.IdoPoolFactory],
    });

    await hre.run("verify:verify", {
        address: contractAddresses.ScoreCalculator.Proxy,
        contract: "contracts/ScoreCalculator.sol:ScoreCalculator",
        constructorArguments: [],
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
