
/*

*/

var AxelToken = artifacts.require("AxelToken");
contract('AxelToken', function(accounts) {

  var account_one = '0x7eba3223b670e79c3592b7ed1e2b55cb2327b6e4'; //accounts[0];
  var account_two = '0xc67c480effff19aad955e54ec4fb17d5f5446b60';

  //
  // Start and verify contract has correct # of tokens
  //
  it("Contract starts with 1000 tokens", function() {
    return AxelToken.deployed().then(function(instance) {
      return instance.getBalance.call(account_one);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 1000, "1000 wasn't the starting amount");
    });
  });

  /*
    Drop 100 tokens to a user
  */
  it("AirDrop 1001 tokens to a user", function() {

    var axel;

    // Get initial balances of first and second account.
    var account_two = '0xc67c480effff19aad955e54ec4fb17d5f5446b60';

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 1001;

    return AxelToken.deployed().then(function(instance) {
      axel = instance;
      return axel.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return axel.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return axel.transfer(account_two, amount, {from: account_one});
    }).then(function() {
      return axel.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return axel.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();
      console.log("Account 1 has "+ account_one_ending_balance);
      console.log("Account 2 has "+ account_two_ending_balance);
      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });

  });

});
