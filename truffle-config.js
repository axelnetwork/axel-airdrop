/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "where win present rubber trap equal artwork vocal ancient fortune field velvet";

module.exports = {
  networks: {
    ropsten: {
      provider: function() {
         return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/AcyImYMIEbdYYWLFT6X9") // The actual api key infura gave you
      },
      network_id: '3',
      gas: 4500000
    },
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
