pragma solidity ^0.4.24;

/**
* @title Admin parameters
* @dev Define administration parameters for this contract
*/
contract Admined { //This token contract is administered
    address public admin; //Admin address is public

    /**
    * @dev Contract constructor, define initial administrator
    */
    constructor() internal {
        admin = msg.sender; //Set initial admin to contract creator
        emit AdminedEvent(admin);
    }

    modifier onlyAdmin() { //A modifier to define admin-only functions
        require(msg.sender == admin);
        _;
    }

    /**
    * @dev Function to set new admin address
    * @param _newAdmin The address to transfer administration to
    */
    function transferAdminship(address _newAdmin) onlyAdmin public { //Admin can be transfered
        require(_newAdmin != address(0));
        admin = _newAdmin;
        emit TransferAdminship(admin);
    }

    //All admin actions have a log for public review
    event TransferAdminship(address newAdminister);
    event AdminedEvent(address administer);

}
