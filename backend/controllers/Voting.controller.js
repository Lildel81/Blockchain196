/*
::TODO::
In here, the controller needs to interface with our smart contract
it should call smart contract functions to submit a vote for a candidate, get all
*/

import e from "express";
import Web3 from "web3";

// Set up Web3 with HTTP provider (infura, alchemy, etc.)
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_URL || "http://127.0.0.1:7545")) // Dummy URL fallback));

// Contract address and ABI
const electionAddress = "0x0000000000000000000000000000000000000000"; // Placeholder address

const electionABI = [
    {
        "constant": false,
        "inputs": [
            { "name": "firstName", "type": "string" },
            { "name": "lastName", "type": "string" },
            { "name": "voterId", "type": "uint256" }
        ],
        "name": "registerVoter",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const electionContract = new web3.eth.Contract(electionABI, electionAddress);

// Get vote totals
export const getVote = async (request, response) => {
    try {
        // Web3 method for calling getVoteCount function:
        //const voteCount = await votingContract.methods.GetCount().call();
        console.log("Got vote!")
        response.status(200).json({ success: true, data: "I got your vote!" });
    } catch (error) {
        console.error("Error fetching vote count:", error);
        response.status(500).json({ success: false, message: "Error fetching vote count from blockchain." });
    }
};


// Submit a vote from a voter_id
export const submitVote = async (request, response) => {
    const { voter_id, vote } = request.body;

    // Validate the vote
    if (!voter_id || !vote) {
        return response.status(400).send({ message: "Vote is missing required fields." });
    }

    try {
        //const transaction = await votingContract.methods.Vote(vote).send({
        //    from: voter_id,  // Address of the voter
        //    gas: 3000000     // Set an appropriate gas limit
        //});

        console.log("Got vote!");
        response.status(200).json({ success: true, data: transaction });
    } catch (error) {
        console.error("Error submitting vote:", error);
        response.status(500).json({ success: false, message: "Failed to submit vote to blockchain." });
    }
}

// Backend API to register voter
export const registerVoter = async (request, response) => {
    const { firstName, lastName, voterId } = request.body;

    // Validate the request body
    if (!firstName || !lastName || !voterId) {
        return response.status(400).send({ message: "Voter registration is missing required fields." });
    }

    try {
        // Prepare transaction
        const tx = electionContract.methods.registerVoter(firstName, lastName, parseInt(voterId));

        // Estimate gas and prepare transaction parameters
        const gas = await tx.estimateGas({ from: web3.eth.accounts.wallet[0].address });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();
        const nonce = await web3.eth.getTransactionCount(web3.eth.accounts.wallet[0].address);

        // Sign and send transaction
        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: electionAddress,
                data,
                gas,
                gasPrice,
                nonce,
            },
            process.env.PRIVATE_KEY // Private key from environment
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        response.status(200).json({ success: true, data: receipt });
    } catch (error) {
        console.error("Error registering voter:", error);
        response.status(500).json({ success: false, message: "Failed to register voter on blockchain." });
    }
};



