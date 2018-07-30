pragma solidity 0.4.24;

/**
* @title ERC20 Token minimal interface for external tokens handle
*/
contract Token {
    function balanceOf(address _owner) public constant returns (uint256 balance);
    function transfer(address _to, uint256 _value) public returns (bool success);
}
