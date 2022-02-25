The Charity project implements wallet for charity - any person can make a donation for any amount.
The project implements the following functionality:
1) Make a donation - receive();
2) Withdraw specified amount to specified wallet (only owner) - transferTo(address targetAddr, uint amount);
3) Keep all donators and sum of their donations - mapping (address => uint256) public donators;
4) Added unit tests /test/charity_unit_tests.js;
5) Added script deploy for rinkeby network ("hardhat run scripts/deploy.js --network rinkeby";