const hre = require("hardhat");

async function main() {
  const [acc1, acc2] = await ethers.getSigners()
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
