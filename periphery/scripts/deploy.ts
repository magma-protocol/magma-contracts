import { ethers } from "hardhat";

async function main() {
  const magmaPoolDeployer = "0x2014B354e8D3E5F49519a414b250Eda65e618e1c";
  const magmaFactory = "0x5A296481Eb35FC57a471afD448213C77e9d779A1";
  const WBIT = "0x8734110e5e1dcf439c7f549db740e546fea82d66";

  const SwapRouter = await ethers.getContractFactory("SwapRouter");
  const swapRouter = await SwapRouter.deploy(
    magmaPoolDeployer,
    magmaFactory,
    WBIT
  );
  console.log("SwapRouter", swapRouter.address);

  const QuoterV2 = await ethers.getContractFactory("QuoterV2");
  const quoterV2 = await QuoterV2.deploy(magmaPoolDeployer, magmaFactory, WBIT);
  console.log("QuoterV2", quoterV2.address);

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
      WBIT,
      asciiStringToBytes32("BIT")
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
    WBIT,
    nonfungibleTokenPositionDescriptor.address
  );
  console.log("NonfungiblePositionManager", nonfungiblePositionManager.address);

  const MagmaInterfaceMulticall = await ethers.getContractFactory(
    "MagmaInterfaceMulticall"
  );
  const magmaInterfaceMulticall = await MagmaInterfaceMulticall.deploy();
  console.log("MagmaInterfaceMulticall", magmaInterfaceMulticall.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

function isAscii(str: string): boolean {
  return /^[\x00-\x7F]*$/.test(str);
}

function asciiStringToBytes32(str: string): string {
  if (str.length > 32 || !isAscii(str)) {
    throw new Error("Invalid label, must be less than 32 characters");
  }

  return "0x" + Buffer.from(str, "ascii").toString("hex").padEnd(64, "0");
}
