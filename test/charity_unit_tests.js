const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Charity unit tests", function () {
  let charity;
  let owner;
  let acc1;
  let contractAddr;

  before(async function () {
    [owner, acc1] = await ethers.getSigners();
    const Charity = await ethers.getContractFactory("Charity");
    charity = await Charity.deploy();
    await charity.deployed();

    contractAddr = charity.address;
  });

  it("Should return the contract's balance", async function () {
    const txSend = await owner.sendTransaction({to: contractAddr, value: ethers.utils.parseEther('1')});
    await txSend.wait();

    const tx2Send = await acc1.sendTransaction({to: contractAddr, value: ethers.utils.parseEther('2')});
    await tx2Send.wait();

    const actualBalance = await charity.getBalance();
    expect(ethers.utils.formatEther(actualBalance)).to.equal('3.0');
  });

  it("Should return all donations amount from address", async function () {
    const txSend = await acc1.sendTransaction({to: contractAddr, value: ethers.utils.parseEther('3')});
    await txSend.wait();

    expect(ethers.utils.formatEther(await charity.getDonateAmountFromAddress(acc1.address))).to.equal('5.0')
  });

  it("Should return all donators without repetition", async function () {
    expect(await charity.getAllDonators()).deep.to.equal(['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266','0x70997970C51812dc3A010C7d01b50e0d17dc79C8']);
  });

  it("Should transfer donations only by owner", async function () {
    await expect(charity.connect(acc1).transferTo(acc1.address, '2')).to.be.revertedWith('You are not an owner');

    await charity.transferTo(acc1.address, '1000000000000000000');
    expect(ethers.utils.formatEther(await charity.getBalance())).to.equal('5.0');
  });

  it("Should throw error if transfer transaction amount bigger than available balance", async function () {
    await expect(charity.transferTo(acc1.address, '9000000000000000000')).to.be.revertedWith('Transfer amount should be equal or less then available balance');
  });

  it("Should recieve transaction with 0 amount", async function () {
    await expect(acc1.sendTransaction({to: contractAddr, value: ethers.utils.parseEther('0')})).to.be.revertedWith('Donation amount must be greater than 0');
  })
});
