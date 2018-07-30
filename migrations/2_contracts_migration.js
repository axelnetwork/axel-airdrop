var AxelToken = artifacts.require("./AxelToken.sol");

module.exports = function(deployer) {
  deployer.deploy(AxelToken);
};
