import { ethers, upgrades } from "hardhat";
const utils = require("../common/utils");

async function main() {
  let contractAddresses = utils.getContractAddresses();

  // const potisionManager = "0x521c76bF1F44f85eF5dbC17d5B70B7Be48Dd2f05";
  const WMNT = "0xEa12Be2389c2254bAaD383c6eD1fa1e15202b52A";
  // let scoreCalculatorAddress = "";


  // const ScoreCalculator = await ethers.getContractFactory("ScoreCalculator");
  // const scoreCalculator = await upgrades.deployProxy(ScoreCalculator, [
  //   potisionManager,
  // ]);
  // console.log("ScoreCalculator deployed to:", scoreCalculator.address);
  // scoreCalculatorAddress = scoreCalculator.address;

  // const scoreCalculatorAddresses = {
  //    Proxy: scoreCalculator.address,
  //    Admin: await upgrades.erc1967.getAdminAddress(
  //      contractAddresses.ScoreCalculator.Proxy
  //    ),
  //    Implementation: await upgrades.erc1967.getImplementationAddress(
  //      scoreCalculator.Proxy
  //    ),
  //  };
  //  console.log("ScoreCalculator Addresses:", scoreCalculatorAddresses);

  // upgrade scoreCalculator
  // const ScoreCalculator = await ethers.getContractFactory("ScoreCalculator");
  // let upgrade = await upgrades.upgradeProxy(
  //   contractAddresses.ScoreCalculator.Proxy,
  //   ScoreCalculator
  // );
  // console.log("ScoreCalculator upgrade to:", upgrade.address);

  // const scoreCalculatorAddresses = {
  //   Proxy: contractAddresses.ScoreCalculator.Proxy,
  //   Admin: await upgrades.erc1967.getAdminAddress(
  //     contractAddresses.ScoreCalculator.Proxy
  //   ),
  //   Implementation: await upgrades.erc1967.getImplementationAddress(
  //     contractAddresses.ScoreCalculator.Proxy
  //   ),
  // };
  // console.log("ScoreCalculator Addresses:", scoreCalculatorAddresses);

  // if (scoreCalculatorAddress == "") {
  //   scoreCalculatorAddress = contractAddresses.ScoreCalculator.Proxy;
  // }

  // const lockPeriod = 15 * 24 * 3600;
  const lockPeriod = 600;
  const tierScores = [
    50 * 1e8,
    100 * 1e8,
    500 * 1e8,
    1000 * 1e8,
    5000 * 1e8,
    10000 * 1e8,
  ];
  const StakingPool = await ethers.getContractFactory("StakingPool");
  const stakingPool = await StakingPool.deploy(
    WMNT,
    contractAddresses.ScoreCalculator.Proxy,
    lockPeriod,
    tierScores
  );
  console.log("StakingPool", stakingPool.address);

  // const IdoPool = await ethers.getContractFactory("IdoPool");
  // const idoPoolTemplate = await IdoPool.deploy();
  // console.log("idoPoolTemplate", idoPoolTemplate.address);

  // const IdoPoolFactory = await ethers.getContractFactory("IdoPoolFactory");
  // const idoPoolFactory = await IdoPoolFactory.deploy(idoPoolTemplate.address);
  // console.log("IdoPoolFactory", idoPoolFactory.address);

  // const InsurancePool = await ethers.getContractFactory("InsurancePool");
  // const insurancePool = await InsurancePool.deploy(idoPoolFactory.address);
  // console.log("InsurancePool", insurancePool.address);

  // await idoPoolFactory.setInsurancePool(insurancePool.address, 15);
  // console.log("Set InsurancePool Success");

  // // write deployed contract address to file
  // contractAddresses = {
  //   ScoreCalculator: scoreCalculatorAddresses,
  //   StakingPool: stakingPool.address,
  //   IdoPoolTemplate: idoPoolTemplate.address,
  //   IdoPoolFactory: idoPoolFactory.address,
  //   InsurancePool: insurancePool.address,
  // };
  // await utils.writeContractAddresses(contractAddresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
