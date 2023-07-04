const fs = require("fs");

function getContractAddresses() {
  return JSON.parse(
    fs
      .readFileSync(`${process.cwd()}/deployments/mantleTestnet.json`)
      .toString()
  );
}

function writeContractAddresses(contractAddresses) {
  fs.writeFileSync(
    `${process.cwd()}/deployments/mantleTestnet.json`,
    JSON.stringify(contractAddresses, null, 2) // Indent 2 spaces
  );
}

function isAscii(str: string): boolean {
  return /^[\x00-\x7F]*$/.test(str);
}

function asciiStringToBytes32(str: string): string {
  if (str.length > 32 || !isAscii(str)) {
    throw new Error("Invalid label, must be less than 32 characters");
  }

  return "0x" + Buffer.from(str, "ascii").toString("hex").padEnd(64, "0");
}


module.exports = {
  getContractAddresses,
  writeContractAddresses,
  isAscii,
  asciiStringToBytes32,
};