// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    string candidate; // Trump, Harris, etc
    address[16] voter;
    address electoral_college;
    bool public votingActive;

    struct Counts {
        uint64 red_total;
        uint64 blue_total;
    }

    Counts count;

    constructor() {
        count = Counts(0, 0);
        electoral_college = msg.sender;
    }

    function Vote(string memory _candidate) public {
        if(isVoting())
        {
            candidate = _candidate;
        // Vote function is entirely two-party system for this basic example
            if (keccak256(abi.encodePacked(candidate)) == (keccak256(abi.encodePacked("Trump")))) {
                count.red_total += 1;
            }
            else {
                count.blue_total += 1;
            }
        }
        
    }

    //Get the candidate voted for
    function GetVote() public view returns(string memory) {
        return candidate;
    }

    //Get the total votes for each side - Must be viewable by only the college
    function GetCount() public view returns(Counts memory) {
        require(!votingActive, displayError());
        return count;
    }

    //must be seen by the college - not public view
    function Winner() public view returns(string memory)
    {   
        if (!votingActive)
        {
            return "Voting hasn't started yet.";
        }
      
        else
        {
            if((count.blue_total == 0) && (count.red_total) == 0)
            {
                require(votingActive, displayError());
                return "No vote counted.";
            }
            //blue is Kamala
            else if(count.blue_total > count.red_total)
            {
                require(votingActive, displayError());
                return "The winner is Kamala";
            }

            //red is Trump
            else if(count.red_total > count.blue_total)
            {
                require(votingActive, displayError());
                return "The winner is Trump";
            }
            else {
                require(votingActive, displayError());
                return "Votes are tied!";
            }
        }
    }

    modifier electionController()
    {
        require(msg.sender == electoral_college, "Only the electoral college can view this!");
        _;
    }

    function displayError() public pure returns (string memory)
    {
        return "Only the electoral college can view this right now!";
    }

    

    function startVoting() public electionController {
        votingActive = true;
    }

    function endVoting() public electionController{
        votingActive = false;
    }

    function isVoting() public view returns(bool)
    {
        return votingActive;
    }

 }