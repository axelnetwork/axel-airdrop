/*

1. Transfer 100 tokens to user x.
2. Check that user x has 100 tokens.
3. Check that Bounty amount is less 100 tokens.

*/

var AxelToken = artifacts.require("AxelToken");

contract('AxelToken', function(accounts) {

  var startingAmount = 250000000;
  var amount = 1000;

  var account_1 = '0x7eba3223b670e79c3592b7ed1e2b55cb2327b6e4'; //accounts[0];
  var account_2 = '0xc67c480effff19aad955e54ec4fb17d5f5446b60'; //accounts[1];
  var account_3 = '0x155b1b0fde4c456ca7f15256ba21efa0e6a5f019'; //accounts[2];

  //
  // Start and verify contract has correct # of tokens
  //
  it("Contract starts with " + startingAmount + " tokens", function() {
    return AxelToken.deployed().then(function(instance) {
      return instance.balanceOf.call(account_1);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), startingAmount, startingAmount + " wasn't the starting amount");
    });
  });

  /*
    Drop 100 tokens to a user
  */
  it("AirDrop " + amount + " tokens to a user", function() {

    var axel;

    var account_1_starting_balance;
    var account_2_starting_balance;
    var account_1_ending_balance;
    var account_2_ending_balance;

    return AxelToken.deployed().then(function(instance) {
      axel = instance;
      return axel.balanceOf.call(account_1);
    }).then(function(balance) {
      account_1_starting_balance = balance.toNumber();
      return axel.balanceOf.call(account_2);
    }).then(function(balance) {
      account_2_starting_balance = balance.toNumber();
      return axel.transfer(account_2, amount, {from: account_1});
    }).then(function() {
      return axel.balanceOf.call(account_1);
    }).then(function(balance) {
      account_1_ending_balance = balance.toNumber();
      return axel.balanceOf.call(account_2);
    }).then(function(balance) {
      account_2_ending_balance = balance.toNumber();
      console.log("Account 1 after transfer has "+ account_1_ending_balance);
      console.log("Account 2 after transfer has "+ account_2_ending_balance);
      assert.equal(account_1_ending_balance, account_1_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_2_ending_balance, account_2_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  }); // it

  var account_1_ending_balance;

  it("Now airDrop " + amount + " tokens to ANOTHER user ", function() {
    var axel;

    var account_1_starting_balance;

    var account_3_starting_balance;
    var account_3_ending_balance;

    return AxelToken.deployed().then(function(instance) {
      axel = instance;
      return axel.balanceOf.call(account_1);
    }).then(function(balance) {
      account_1_starting_balance = balance.toNumber();
      return axel.balanceOf.call(account_3);
    }).then(function(balance) {
      account_3_starting_balance = balance.toNumber();
      return axel.transfer(account_3, amount, {from: account_1});
    }).then(function() {
      return axel.balanceOf.call(account_1);
    }).then(function(balance) {
      account_1_ending_balance = balance.toNumber();
      return axel.balanceOf.call(account_3);
    }).then(function(balance) {
      account_3_ending_balance = balance.toNumber();
      console.log("Account 1 after transfer has "+ account_1_ending_balance);
      console.log("Account 3 after transfer has "+ account_3_ending_balance);
      assert.equal(account_1_ending_balance, account_1_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_3_ending_balance, account_3_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  }); // it


  /*

  1. Test Pause/Un-pause function.
  2. Burn function was tested in the browser @
     https://ropsten.etherscan.io/token/0x18218840f11abdf2b5097806706796829135a22e

  */

  it("Pause will now be called with a Transfer after the Pause.", async function () {

      var amount = 888;
      console.log("Attempting to transfer "+ amount + " tokens.");

      let axel = await AxelToken.deployed();
      let balance_before = await axel.balanceOf.call(account_1);

      await axel.pause();

      try {
          await axel.transfer(account_2, amount, {from: account_1});
          assert.fail('Transfer expected to fail.');
      } catch (error) {
          assert(error.toString().includes('invalid opcode'), error.toString())
      }

      let balance_after = await axel.balanceOf.call(account_1);
      console.log("balance_before = "+ balance_before);
      console.log("balance_after = "+ balance_after);
      assert.equal(balance_before+0, balance_after+0, "balance_before == balance_after ");

      // Now unpause it

      console.log("Unpausing now.");
      let balance_before_1 = await axel.balanceOf.call(account_1);

      await axel.unpause();

      try {
          await axel.transfer(account_2, amount, {from: account_1});
      } catch (error) {
          assert(error.toString().includes('invalid opcode'), error.toString())
      }

      let balance_after_1 = await axel.balanceOf.call(account_1);
      console.log("balance_before_1 = "+ balance_before_1.toNumber()); //balance.toNumber()
      console.log("balance_after_1 = "+ balance_after_1.toNumber());
      assert.equal(balance_before_1.toNumber(), balance_after_1.toNumber()+amount, "balance_before_1 == balance_after_1 + " + amount);

    });
});
