const hre = require("hardhat");
const ethers = hre.ethers

async function main() {
    const [signer] = await ethers.getSigners() // разворачиваем смарт контракт под самым первым аккаунтом

    const Charity = await ethers.getContractFactory('Charity', signer);
    const charity = await Charity.deploy();
    await charity.deployed();

    console.log("Contract deployed to:", charity.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });