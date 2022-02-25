require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("./tasks/charityTasks.js");
require('solidity-coverage');
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}',
      accounts: [process.env.RINK_ACC_PK]
    },
    hardhat: {
      chainId: 1337
    }
  },
};
