require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");

const { ethers } = require("ethers");
const { task } = require("hardhat/config");
const CharityArtifacts = require('../artifacts/contracts/Charity.sol/Charity.json');
const addr = '0x5fbdb2315678afecb367f032d93f642f64180aa3';


task("balance", "Get donation account balance")
    .setAction(async () => {
        const account = web3.utils.toChecksumAddress(addr);
        const balance = await web3.eth.getBalance(account);
    
        console.log(web3.utils.fromWei(balance, "ether"), "ETH");
});

task("donate", "Make donation")
    .addParam("amount", "The donation amount")
    .setAction(async (taskArgs) => {
    const [owner, acc1] = await hre.ethers.getSigners();
    const charityContract = new ethers.Contract(addr, CharityArtifacts.abi, owner);

    const tx = {to: addr, value: ethers.utils.parseEther(taskArgs.amount)};
    
    const txSend = await owner.sendTransaction(tx);
    await txSend.wait();

    const account = web3.utils.toChecksumAddress(addr);
    const balance = await web3.eth.getBalance(account);
    
    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
});