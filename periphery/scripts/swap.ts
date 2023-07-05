import { ethers } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";
const utils = require("../common/utils");

const mamaAddress = "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39";
const wmntAddress = "0xEa12Be2389c2254bAaD383c6eD1fa1e15202b52A";

async function main() {
  const [owner] = await ethers.getSigners();
  let contractAddresses = utils.getContractAddresses();

  const swapRouter = await ethers.getContractAt(
    "SwapRouter",
    contractAddresses.SwapRouter
  );

  const MNT = await ethers.getContractAt("WMNT", wmntAddress);
  let mammApproveTx = await MNT.approve(
    contractAddresses.SwapRouter,
    BigNumber.from("10000000000000000000000000000")
  );
  console.log("MNT approve tx:", mammApproveTx.hash);

  const MAMA = await ethers.getContractAt("SelfSufficientERC20", mamaAddress);
  await MAMA.approve(
    contractAddresses.SwapRouter,
    BigNumber.from("10000000000000000000000000000")
  );
  console.log("approve success");

  await swapRouter.exactInputSingle({
    tokenIn: wmntAddress,
    tokenOut: mamaAddress,
    fee: 100,
    recipient: owner.address,
    deadline: 999999999,
    amountIn: BigNumber.from("11000000000000000000"),
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  });
  console.log("swap success");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
