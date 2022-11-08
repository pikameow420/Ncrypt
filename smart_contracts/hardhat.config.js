//https://eth-mainnet.g.alchemy.com/v2/ngsrOVGZHRRzRz34Gp3B0h23E0V1GVah
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli:{
      url: 'https://eth-goerli.g.alchemy.com/v2/p7m3y2ZUCSEO5gJx-ES1RT26M_6HRHMc',
      accounts: ['fa3eb06b81f67d89a9ea3042b109560679cd73811c08045be1a20605a25897a1'],
    }
  },
  etherscan: {
    apiKey: '28FA3AIIIDG8NS7EN4XCHV9FV11R5CHZ9H',
  }

};
