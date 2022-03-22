//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Test {

    string internal name = "test";
    address internal to = 0xbd426704F3881e3106081d3Cef83658FDac08Bf7;
    address internal owner = msg.sender;

    function setName(string memory _name) public {
        name = _name;
    }

    function getName() public view returns (string memory){
        return name;
    }

    function send() public payable {
        payable(to).transfer(msg.value);
    }

    function check() public view returns (bool) {
        require(msg.sender == owner, "Not an Owner");
        return true;
    }
}