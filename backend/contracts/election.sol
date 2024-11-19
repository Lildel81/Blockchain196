// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    struct Counts {
        uint256 red_total; // Total votes for red candidate
        uint256 blue_total; // Total votes for blue candidate
    }

    Counts public count;

    mapping(address => bool) private hasVoted;

    // Vote function: Cast a vote for "Red" or "Blue"
    function Vote(string memory _candidate) public {
        // Ensure the voter hasn't already voted
        require(!hasVoted[msg.sender], "Address has already voted");

        // Check the candidate and increment the respective count
        if (keccak256(abi.encodePacked(_candidate)) == keccak256(abi.encodePacked("Red"))) {
            count.red_total += 1;
        } else if (keccak256(abi.encodePacked(_candidate)) == keccak256(abi.encodePacked("Blue"))) {
            count.blue_total += 1;
        } else {
            revert("Invalid candidate"); // Reject invalid candidates
        }

        // Mark the sender as having voted
        hasVoted[msg.sender] = true;
    }

    // GetCount function: Return the current vote totals
    function GetCount() public view returns (uint256 redVotes, uint256 blueVotes) {
        return (count.red_total, count.blue_total);
    }
}
