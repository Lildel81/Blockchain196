// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    string candidate; // Trump, Harris, etc
    address[16] voter;

    struct Counts {
        uint64 red_total;
        uint64 blue_total;
    }

    Counts count;

    constructor() {
        count = Counts(0, 0);
    }

    function Vote(string memory _candidate) public {
        candidate = _candidate;
        // Vote function is entirely two-party system for this basic example
        if (keccak256(abi.encodePacked(candidate)) == (keccak256(abi.encodePacked("Trump")))) {
            count.red_total += 1;
        }
        else {
            count.blue_total += 1;
        }
    }

    function GetVote() public view returns(string memory) {
        return candidate;
    }

    function GetCount() public view returns(Counts memory) {
        return count;
    }
}