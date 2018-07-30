
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

  // bump up amount
  //amount = amount*10;

  it("AirDrop " + amount + " tokens to aother user", function() {

    var axel;

    var account_1_starting_balance;
    var account_3_starting_balance;
    var account_1_ending_balance;
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

  it("Getting size of address array ", function() {
    var axel;
    var index = 1;
    return AxelToken.deployed().then(function(instance) {
      axel = instance;
      return axel.addressLUTSize.call();
    }).then(function(size) {
      console.log("addressLUTSize = " + size )
      return axel.valueAtAddressLUT.call(size-1);
    }).then(function(address_value) {
      console.log("addressLUT[1] = " + address_value )
      return axel.balanceOf.call(address_value);
    }).then(function(balance) {
      console.log("value @ addressLUT[1] = " + balance )
      return axel.balanceOf.call(account_1);
    }).then(function(balance) {
      console.log("Remaining Balance = " + balance );
    });
  }); // it


  /**
    Now burn the remaining tokens except for a handful.
  */
  var keep = 100;
  it("Now burn the remaining tokens except for " + keep, function() {
    var axel;
    return AxelToken.deployed().then(function(instance) {
      axel = instance;
      return axel.balanceOf.call(account_1);
    }).then(function(balance) {
      console.log("Remaining Balance = " + balance );
      return axel.burn.call(balance);
    }).then(function() {
        return axel.balanceOf.call(account_1);
    }).then(function(whatsLeft) {
        console.log("whatsLeft = " + whatsLeft );
    });
  }); // it

});
