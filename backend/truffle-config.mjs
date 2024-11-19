// truffle-config.mjs
import { resolve } from 'path';

export default {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      gas: 800000,      
      gasPrice: 2000000000     
    },
  },
  compilers: {
    solc: {
      version: "0.8.21" // Your Solidity version
    }
  }
};