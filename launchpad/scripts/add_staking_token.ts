import { ethers } from "hardhat";
const utils = require("../common/utils");
const fs = require("fs");

const mamaAddress = "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39";
const wMNT = "0xEa12Be2389c2254bAaD383c6eD1fa1e15202b52A";

async function main() {
  let contractAddresses = utils.getContractAddresses("");

  const [owner, keeper] = await ethers.getSigners();

  const StakingPool = await ethers.getContractFactory("StakingPool");
  const stakingPool = await StakingPool.attach(contractAddresses.StakingPool);

  const ScoreCalculator = await ethers.getContractFactory("ScoreCalculator");
  const scoreCalculator = await ScoreCalculator.attach(
    contractAddresses.ScoreCalculator.Proxy
  );


  // add mama
  let mamaIsStakingToken = await stakingPool.isStakingToken(mamaAddress);
  if (!mamaIsStakingToken){
      let addTx = await stakingPool.addStakingToken(mamaAddress);
      console.log("addStakingToken:", addTx.hash);
  }

  let scoreMama = await scoreCalculator.magmaToken();
  console.log("score mama token:", scoreMama);

  if (scoreMama == "0x0000000000000000000000000000000000000000") {
    let setMagmaTokenTx = await scoreCalculator.setMagmaToken(mamaAddress);
    console.log("setMagmaTokenTx :", setMagmaTokenTx.hash);
  }

  // add LP
  let mamaMntFee100Lp = await scoreCalculator.isPoolSupported(mamaAddress, wMNT,100);
  console.log("scoreCalculator  isPoolSupported:", mamaMntFee100Lp);
  if (!mamaMntFee100Lp){
    let addMamaMntFee100LpTx = await scoreCalculator.supportPool(mamaAddress,wMNT,100);
    console.log("addMamaMntFee100LpTx:", addMamaMntFee100LpTx.hash);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
