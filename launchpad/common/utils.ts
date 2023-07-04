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

module.exports = {
  getContractAddresses,
  writeContractAddresses,
};