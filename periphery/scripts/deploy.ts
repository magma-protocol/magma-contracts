import { ethers,upgrades } from "hardhat";
const utils = require("../common/utils");
import dotenv from "dotenv";
dotenv.config();

async function main() {
  let coreContractAddresses = utils.getContractAddresses(`../core/deployments/${process.env.NETWORK}.json`);
  console.log("core contract addresses:", coreContractAddresses);

  let WMNT = process.env.WMNT !== undefined ? process.env.WMNT : "";
  console.log("WMNT addresses:", WMNT);

  const Multicall = await ethers.getContractFactory("MagmaInterfaceMulticall");
  const multicall = await Multicall.deploy();
  console.log("Multicall", multicall.address);

  const SwapRouter = await ethers.getContractFactory("SwapRouter");
  const swapRouter = await SwapRouter.deploy(
    coreContractAddresses.MagmaPoolDeployer,
    coreContractAddresses.MagmaFactory,
    WMNT
  );
  console.log("SwapRouter", swapRouter.address);

  const QuoterV2 = await ethers.getContractFactory("QuoterV2");
  const quoterV2 = await QuoterV2.deploy(coreContractAddresses.MagmaPoolDeployer, coreContractAddresses.MagmaFactory, WMNT);
  console.log("QuoterV2", quoterV2.address);

  const TickLens = await ethers.getContractFactory("TickLens");
  const tickLens = await TickLens.deploy();
  console.log("TickLens", tickLens.address);

  const NFTDescriptor = await ethers.getContractFactory("NFTDescriptor");
  const nftDescriptor = await NFTDescriptor.deploy();
  console.log("NFTDescriptor", nftDescriptor.address);

  const NonfungibleTokenPositionDescriptor = await ethers.getContractFactory(
    "NonfungibleTokenPositionDescriptorOffChain"
  );
  const nonfungibleTokenPositionDescriptor = await upgrades.deployProxy(
    NonfungibleTokenPositionDescriptor,
    [process.env.TOKEN_URI]
  );
  await nonfungibleTokenPositionDescriptor.deployed();
  console.log(
    "NonfungibleTokenPositionDescriptor deployed at",
    nonfungibleTokenPositionDescriptor.address
  );

  const NonfungiblePositionManager = await ethers.getContractFactory(
    "NonfungiblePositionManager"
  );
  const nonfungiblePositionManager = await NonfungiblePositionManager.deploy(
    coreContractAddresses.MagmaPoolDeployer,
    coreContractAddresses.MagmaFactory,
    WMNT,
    nonfungibleTokenPositionDescriptor.address
  );
  console.log("NonfungiblePositionManager", nonfungiblePositionManager.address);

  let contractAddresses = {
    WMNT: WMNT,
    SwapRouter: swapRouter.address,
    QuoterV2: quoterV2.address,
    TickLens: tickLens.address,
    NFTDescriptor: nftDescriptor.address,
    NonfungibleTokenPositionDescriptor:
      nonfungibleTokenPositionDescriptor.address,
    NonfungiblePositionManager: nonfungiblePositionManager.address,
    MagmaInterfaceMulticall: multicall.address,
  };
  await utils.writeContractAddresses(contractAddresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
