import Web3 from 'web3'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const web3 = new Web3("http://127.0.0.1:8545"); // Ganache RPC URL

// print out known voters
const accounts = await web3.eth.getAccounts();
console.log(" -- VOTERS -- ");
console.log(accounts);

// Workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the build path
const buildPath = path.resolve(__dirname, './build/contracts/Election.json');


// Check if file exists
if (!fs.existsSync(buildPath)) {
    throw new Error(`File not found: ${buildPath}`);
}

const contractJson = JSON.parse(fs.readFileSync(buildPath, 'utf8'));
// Get the network ID from Ganache
const networkId = await web3.eth.net.getId();

// Retrieve the contract address for the current network
const contractAddress = contractJson.networks[networkId]?.address;
const abi = contractJson.abi;

const electionContract = new web3.eth.Contract(abi, contractAddress);

export const validateVoterAddress = async (voterAddress) => {
    return (accounts.includes(voterAddress));
}

// Start the election
export const startElection = async () => {
    try {
        await electionContract.methods.startElection().send({
            from: accounts[0], // Owner's address
            gas: 6721975,
            gasPrice: web3.utils.toWei('20', 'gwei'),
        });
        console.log("Election has started");
        return "Election started successfully!";
    } catch (error) {
        console.error("Error starting election:", error.message);
        throw error;
    }
};

// End the election
export const endElection = async () => {
    try {
        await electionContract.methods.endElection().send({
            from: accounts[0], // Owner's address
            gas: 6721975,
            gasPrice: web3.utils.toWei('20', 'gwei'),
        });
        console.log("Election has ended");
        return "Election ended successfully!";
    } catch (error) {
        console.error("Error ending election:", error.message);
        throw error;
    }
};


// Get election status
export const getElectionStatus = async () => {
    try {
        const started = await electionContract.methods.started().call();
        const ended = await electionContract.methods.ended().call();
        return { started, ended };
    } catch (error) {
        console.error("Error fetching election status:", error.message);
        throw error;
    }
};



// Submit a vote
export const submitContractVote = async (voterAddress, candidate) => {
    try {
        await electionContract.methods.Vote(candidate).send({
            from: voterAddress,
            gas: 6721975,
            gasPrice: web3.utils.toWei('20', 'gwei'),
        });
        console.log("Voter: " + voterAddress + " has voted.");
        return "Vote submitted successfully!";
    } catch (error) {
        // Handle revert errors
        if (error.cause && error.cause.data) {
            const reason = error.cause.data[Object.keys(error.cause.data)[0]].reason;
            console.error("Smart contract reverted:", reason);

            if (reason === "Address has already voted") {
                throw new Error(reason); // Rethrow with custom error message
            }
        }

        console.error("Error submitting vote:", error.message);
        throw error; // Rethrow other errors
    }
};



// Get the vote totals
export const getContractVoteCounts = async () => {
    try {
        // Call the GetCount method on the contract
        const counts = await electionContract.methods.GetCount().call();
        
        // Debug: Log the fetched counts
        console.log("Vote counts:", {
            redVotes: counts['0'], 
            blueVotes: counts['1']
        });

        // Return the counts object in a more user-friendly format
        return {
            redVotes: counts['0'],
            blueVotes: counts['1']
        };
    } catch (error) {
        // Enhanced error logging
        console.error("Error fetching vote counts:", {
            message: error.message,
            stack: error.stack
        });

        // Return an empty count object in case of failure
        return {
            redVotes: BigInt(0),
            blueVotes: BigInt(0)
        };
    }
};

// Get election results (only after election has ended)
export const getElectionResults = async () => {
    try {
        const ended = await electionContract.methods.ended().call();
        if (!ended) {
            throw new Error("Election has not ended yet");
        }
        const counts = await electionContract.methods.GetResults().call();
        const red = counts['0'],
                blue = counts['1'];
        console.log("Election results:", {
            redVotes: red,
            blueVotes: blue,
        });
        return {
            redVotes: red,
            blueVotes: blue,
        };
    } catch (error) {
        console.error("Error fetching election results:", error.message);
        throw error;
    }
};


