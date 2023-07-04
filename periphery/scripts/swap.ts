import { ethers } from "hardhat";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";

async function main() {
  const [owner] = await ethers.getSigners();

  const swapRouterAddress = "0xf5233793F07cC3a229F498744De6eEA7c52B2dAe";
  const swapRouter = await ethers.getContractAt(
    "SwapRouter",
    swapRouterAddress
  );

  const MAMA = await ethers.getContractAt(
    "SelfSufficientERC20",
    "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39"
  );
  const USDC = await ethers.getContractAt(
    "SelfSufficientERC20",
    "0xD0C049Ee0b0832e5678D837C1519e1b2380e32E4"
  );
  await MAMA.approve(
    swapRouterAddress,
    BigNumber.from("10000000000000000000000000000")
  );
  await USDC.approve(
    swapRouterAddress,
    BigNumber.from("10000000000000000000000000000")
  );
  console.log("approve success");

  await swapRouter.exactInputSingle({
    tokenIn: "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39",
    tokenOut: "0xD0C049Ee0b0832e5678D837C1519e1b2380e32E4",
    fee: 100,
    recipient: "0xcbe467AFe8Bb198a3924BAD8B509a3160647313a",
    deadline: 1786637844,
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
