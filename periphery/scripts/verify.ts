const hre = require("hardhat");
const utils = require("../common/utils");

const magmaPoolDeployer = "0x13A16A5023387786a7c3b308AF17Eb4a5319Fad7";
const magmaFactory = "0xd3A4204862955d1F422f533Eb581310DBaAfaf7e";
const WMNT = "0xEa12Be2389c2254bAaD383c6eD1fa1e15202b52A";

async function main() {
  let contractAddresses = utils.getContractAddresses();

  await hre.run("verify:verify", {
    address: contractAddresses.SwapRouter,
    contract: "contracts/SwapRouter.sol:SwapRouter",
    constructorArguments: [magmaPoolDeployer, magmaFactory, WMNT],
  });

  await hre.run("verify:verify", {
    address: contractAddresses.QuoterV2,
    contract: "contracts/lens/QuoterV2.sol:QuoterV2",
    constructorArguments: [magmaPoolDeployer, magmaFactory, WMNT],
  });

  await hre.run("verify:verify", {
    address: contractAddresses.TickLens,
    contract: "contracts/lens/TickLens.sol:TickLens",
    constructorArguments: [],
  });

//    await hre.run("verify:verify", {
//      address: contractAddresses.NFTDescriptor,
//      contract:
//        "contracts/NFTDescriptor.sol:NFTDescriptor",
//      constructorArguments: [],
//    });

    await hre.run("verify:verify", {
      address: contractAddresses.NonfungibleTokenPositionDescriptor,
      contract:
        "contracts/NonfungibleTokenPositionDescriptor.sol:NonfungibleTokenPositionDescriptor",
      constructorArguments: [WMNT, utils.asciiStringToBytes32("MNT")],
    });

     await hre.run("verify:verify", {
       address: contractAddresses.NonfungiblePositionManager,
       contract:
         "contracts/NonfungiblePositionManager.sol:NonfungiblePositionManager",
       constructorArguments: [
         magmaPoolDeployer,
         magmaFactory,
         WMNT,
         contractAddresses.NonfungibleTokenPositionDescriptor,
       ],
     });

      await hre.run("verify:verify", {
        address: contractAddresses.MagmaInterfaceMulticall,
        contract:
          "contracts/lens/MagmaInterfaceMulticall.sol:MagmaInterfaceMulticall",
        constructorArguments: [],
      });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
