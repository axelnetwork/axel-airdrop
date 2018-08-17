pragma solidity ^0.4.24;

import './ERC20Token.sol';
import './Token.sol';

/**
* @title AXEL Token
* @notice AXEL Token creation.
* @dev ERC20 Token compliant
*/
contract AxelToken is ERC20Token {

    string public name = 'BB-AIRDROP';
    uint8 public decimals = 18;
    string public symbol = 'BRUCE';
    string public version = '1';

    /**
    * @notice token contructor.  250000000
    */
    constructor() public {
        //totalSupply = 50000000000 * 10 ** uint256(decimals); //50.000.000.000 tokens initial supply;
        totalSupply = 250000000 * 10 ** uint256(decimals); //50.000.000.000 tokens initial supply;
        balances[msg.sender] = totalSupply;
        emit Transfer(0, msg.sender, totalSupply);
    }

    /**
    * @notice Function to claim any token stuck on contract
    */
    function externalTokensRecovery(Token _address) onlyAdmin public {
        uint256 remainder = _address.balanceOf(this); //Check remainder tokens
        _address.transfer(msg.sender,remainder); //Transfer tokens to admin
    }

    /**
      Allow transfers of tokens in groups of addresses
    */
    function sendBatches(address[] _addrs, uint256[] tokensValue) onlyAdmin public {
      require(_addrs.length == tokensValue.length);
      for(uint256 i = 0; i < _addrs.length; i++) {
        require(transfer(_addrs[i], tokensValue[i]));
      }
    }

    /**
      Allow the admin to burn tokens
    */
    function burn(uint256 _value) onlyAdmin whenNotPaused public {
      require(_value <= balances[msg.sender]);

      balances[msg.sender] = balances[msg.sender].sub(_value);
      totalSupply = totalSupply.sub(_value);

      emit Burn(msg.sender, _value);
      emit Transfer(msg.sender, address(0), _value);
    }

    /**
    * @notice this contract will revert on direct non-function calls, also it's not payable
    * @dev Function to handle callback calls to contract
    */
    function() public {
        revert();
    }

    event Burn(address indexed burner, uint256 value);
}
