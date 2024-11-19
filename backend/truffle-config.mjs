export default {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost
      port: 8545,        // Standard Ethereum port
      network_id: "*",   // Any network
      gas: 800000,
      gasPrice: 2000000000
    }
  },
  compilers: {
    solc: {
      version: "^0.8.21", // Use locally installed version
      parser: "solcjs",  // Use the solc-js parser
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
