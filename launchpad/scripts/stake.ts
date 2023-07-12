import { ethers } from "hardhat";
const utils = require("../common/utils");
import { BigNumber } from "@ethersproject/bignumber";

const mamaAddress = "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39";

async function main() {
  let contractAddresses = utils.getContractAddresses("");

  const [owner, keeper] = await ethers.getSigners();

  // score calc check
  const ScoreCalculator = await ethers.getContractFactory("ScoreCalculator");
  const scoreCalculator = await ScoreCalculator.attach(
    contractAddresses.ScoreCalculator.Proxy
  );

  let scoreMama = await scoreCalculator.magmaToken();
  console.log("score mama token:", scoreMama);

  if (scoreMama == "0x0000000000000000000000000000000000000000"){
    let setMagmaTokenTx = await scoreCalculator.setMagmaToken(mamaAddress);
    console.log("setMagmaTokenTx :", setMagmaTokenTx.hash);
  }

  let score = await scoreCalculator.calculate(
    mamaAddress,
    BigNumber.from("1000000000000000000000")
  );
  console.log("score:", score);

  // stake
  const StakingPool = await ethers.getContractFactory("StakingPool");
  const stakingPool = await StakingPool.attach(contractAddresses.StakingPool);

  let scoreCalculatorAddress = await stakingPool.scoreCalculator();
  console.log("stakingPool scoreCalculatorAddress:", scoreCalculatorAddress);

  if (contractAddresses.ScoreCalculator.Proxy != scoreCalculatorAddress) {
    console.log("invalid scoreCalculatorAddress");
    return;
  }

  let isStakingToken = await stakingPool.isStakingToken(mamaAddress);
  console.log("isStakingToken:", isStakingToken);

  let tier = await stakingPool.getTierByScore(score);
  console.log("getTierByScore:", tier);

  // check staking token
  if (!isStakingToken) {
    let addTx = await stakingPool.addStakingToken(mamaAddress);
    console.log("addStakingToken:", addTx.hash);
  }

  // approve first
  const MAMA = await ethers.getContractAt("SelfSufficientERC20", mamaAddress);

  let balance = await MAMA.balanceOf(owner.address);
  console.log("balance:", balance.toString());

  let allownce = await MAMA.allowance(
    owner.address,
    contractAddresses.StakingPool
  );
  console.log("allownce:", allownce.toString());

  if (allownce.toString() == "0") {
    let approveTx = await MAMA.approve(
      contractAddresses.StakingPool,
      BigNumber.from("10000000000000000000000000000")
    );
    console.log("approveTx hash:", approveTx.hash);
  }

  //  do stake
  // let stakeTx = await stakingPool.stake(
  //   mamaAddress,
  //   BigNumber.from("1000000000000000000000")
  // );
  // console.log("stakeTx tx:", stakeTx.hash);

  // do unstake
  let unstakeTx = await stakingPool.unstake([0]);
  console.log("unstakeTx tx:", unstakeTx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
