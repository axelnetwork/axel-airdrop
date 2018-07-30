pragma solidity 0.4.24;

import './ERC20Token.sol';
import './Token.sol';

/**
* @title AXEL Token
* @notice AXEL Token creation.
* @dev ERC20 Token compliant
*/
contract AxelToken is ERC20Token {
    string public name = 'AXEL';
    uint8 public decimals = 18;
    string public symbol = 'AXEL';
    string public version = '1';

    /**
    * @notice token contructor.  250000000
    */
    constructor() public {
        //totalSupply = 50000000000 * 10 ** uint256(decimals); //50.000.000.000 tokens initial supply;
        totalSupply = 250000000 * 10 ** uint256(0); //50.000.000.000 tokens initial supply;
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

    // This is the array of token holder addresses
    address[] private addressLUT;

    /**
      Get the size of the addressLUTSize Array
    */
    function addressLUTSize() onlyAdmin public constant returns (uint) {
        return addressLUT.length;
    }

    /**
      Get address value at index of addressLUT
    */
    function valueAtAddressLUT(uint index) onlyAdmin public constant returns (address) {
        return addressLUT[index];
    }

    /**
    * @dev transfer token to a specified address
    * @param _to The address to transfer to.
    * @param _value The amount to be transferred.
    */
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(_to != address(0)); //If you dont want that people destroy token
        require(frozen[msg.sender]==false);
        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        addressLUT.push(_to);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    /**
      Allow the admin to burn tokens
    */
    function burn(uint256 _value) onlyAdmin public {
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
