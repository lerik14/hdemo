// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Charity {
    address owner;
    address thisContract;
    mapping (address => uint256) public donators;
    address[] donatorsAddresses;

    constructor() {
        owner = msg.sender;
        thisContract = address(this);
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "You are not an owner");
        _;
    }

    receive() external payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        if(donators[msg.sender] == 0) {
            donatorsAddresses.push(msg.sender);
        }
        donators[msg.sender] += msg.value; 
    }

    function transferTo(address targetAddr, uint amount) public onlyOwner {
        require(amount <= thisContract.balance, "Transfer amount should be equal or less then available balance");
        address payable _to = payable(targetAddr);
        _to.transfer(amount);
    }

    function getBalance() public view returns(uint) {
        return thisContract.balance;
    }

    function getDonateAmountFromAddress(address checkAddress) public view returns(uint) {
        return donators[checkAddress];
    }

    function getAllDonators() public view returns(address[] memory) {
        return donatorsAddresses;
    }
}