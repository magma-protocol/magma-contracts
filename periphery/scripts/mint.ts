import { ethers } from "hardhat";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";

async function main() {
  const [owner] = await ethers.getSigners();

  const positionManagerAddress = "0x632F8C240Da3d3b96b15BaCF3E120FCdD105a1fF";
  const positionManager = await ethers.getContractAt(
    "NonfungiblePositionManager",
    positionManagerAddress
  );

  //   await positionManager.createAndInitializePoolIfNecessary(
  //     "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39",
  //     "0x82A2eb46a64e4908bBC403854bc8AA699bF058E9",
  //     10000,
  //     BigNumber.from("79228162500000000")
  //   );
  //   console.log("create pool success");

  const MAMA = await ethers.getContractAt(
    "SelfSufficientERC20",
    "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39"
  );
  const USDC = await ethers.getContractAt(
    "SelfSufficientERC20",
    "0x82A2eb46a64e4908bBC403854bc8AA699bF058E9"
  );
  await MAMA.approve(
    positionManagerAddress,
    BigNumber.from("10000000000000000000000000000")
  );
  await USDC.approve(
    positionManagerAddress,
    BigNumber.from("10000000000000000000000000000")
  );
  console.log("approve success");

  const tickMath = await ethers.getContractAt(
    "ExternalTickMath",
    "0x03C295ff7f1Fe1085e9ceA827d5d7b7f8cA7c684"
  );
  const tick = await tickMath.getTickAtSqrtRatio(
    BigNumber.from("79228162500000000")
  );
  console.log("get tick success");

  await positionManager.mint({
    token0: "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39",
    token1: "0x82A2eb46a64e4908bBC403854bc8AA699bF058E9",
    fee: 500,
    tickLower: -275281,
    tickUpper: -275261,
    amount0Desired: BigNumber.from("20000019471182331350603"),
    amount1Desired: BigNumber.from("200000000"),
    amount0Min: 0,
    amount1Min: 0,
    recipient: "0x1956b2c4C511FDDd9443f50b36C4597D10cD9985",
    deadline: 9999999999,
  });
  console.log("mint success");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
