import { ethers } from "hardhat";
const utils = require("../common/utils");


const mamaAddress = "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39";
const wMNT = "0x8734110e5e1dcf439c7f549db740e546fea82d66";
const positionManagerAddress = "0x02dB6ab281dA6436D4A449a4b15d148a51ADC0f6";

async function main() {
  // deploy masterChef
  const MasterChef = await ethers.getContractFactory("MasterChef");
  const masterChef = await MasterChef.deploy(
    mamaAddress,
    positionManagerAddress,
    wMNT
  );
  console.log("masterChef deployed to:", masterChef.address);

  // deploy receiver
  const MasterChefV3Receiver = await ethers.getContractFactory("MasterChefV3Receiver");
  const masterChefV3Receiver = await MasterChefV3Receiver.deploy(
    masterChef.address,
    mamaAddress
  );
  console.log("masterChefV3Receiver deployed to:", masterChefV3Receiver.address);

  let contractAddresses = {
    MasterChef: masterChef.address,
    MasterChefV3Receiver: masterChefV3Receiver.address,
  };
  await utils.writeContractAddresses(contractAddresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
