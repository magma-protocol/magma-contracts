import { ethers } from "hardhat";
const utils = require("../common/utils");

async function main() {
  const magmaPoolDeployer = "0x13A16A5023387786a7c3b308AF17Eb4a5319Fad7";
  const magmaFactory = "0xd3A4204862955d1F422f533Eb581310DBaAfaf7e";

  // const WMNT = await ethers.getContractFactory("WMNT");
  // const wmnt = await WMNT.deploy();
  // console.log("WMNT address:", wmnt.address);

  // const SwapRouter = await ethers.getContractFactory("SwapRouter");
  // const swapRouter = await SwapRouter.deploy(
  //   magmaPoolDeployer,
  //   magmaFactory,
  //   wmnt.address
  // );
  // console.log("SwapRouter", swapRouter.address);

  // const QuoterV2 = await ethers.getContractFactory("QuoterV2");
  // const quoterV2 = await QuoterV2.deploy(magmaPoolDeployer, magmaFactory, wmnt.address);
  // console.log("QuoterV2", quoterV2.address);

  const QuoterV2 = await ethers.getContractFactory("QuoterV2");
  const quoterV2 = await QuoterV2.deploy(
    magmaPoolDeployer,
    magmaFactory,
    "0xea12be2389c2254baad383c6ed1fa1e15202b52a"
  );
  console.log("QuoterV2", quoterV2.address);
  return

  ;
  const TickLens = await ethers.getContractFactory("TickLens");
  const tickLens = await TickLens.deploy();
  console.log("TickLens", tickLens.address);

  const NFTDescriptor = await ethers.getContractFactory("NFTDescriptor");
  const nftDescriptor = await NFTDescriptor.deploy();
  console.log("NFTDescriptor", nftDescriptor.address);

  const NonfungibleTokenPositionDescriptor = await ethers.getContractFactory(
    "NonfungibleTokenPositionDescriptor",
    { libraries: { NFTDescriptor: nftDescriptor.address } }
  );
  const nonfungibleTokenPositionDescriptor =
    await NonfungibleTokenPositionDescriptor.deploy(
      wmnt.address,
      utils.asciiStringToBytes32("MNT")
    );
  console.log(
    "NonfungibleTokenPositionDescriptor",
    nonfungibleTokenPositionDescriptor.address
  );

  const NonfungiblePositionManager = await ethers.getContractFactory(
    "NonfungiblePositionManager"
  );
  const nonfungiblePositionManager = await NonfungiblePositionManager.deploy(
    magmaPoolDeployer,
    magmaFactory,
    wmnt.address,
    nonfungibleTokenPositionDescriptor.address
  );
  console.log("NonfungiblePositionManager", nonfungiblePositionManager.address);

  let contractAddresses = {
    WMNT: wmnt.address,
    SwapRouter: swapRouter.address,
    QuoterV2: quoterV2.address,
    TickLens: tickLens.address,
    // NFTDescriptor: nftDescriptor.address,
    NonfungibleTokenPositionDescriptor: nonfungibleTokenPositionDescriptor.address,
    NonfungiblePositionManager: nonfungiblePositionManager.address,
  };
  await utils.writeContractAddresses(contractAddresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
