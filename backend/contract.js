import Web3 from 'web3'
import fs from 'fs'
const web3 = new Web3("http://127.0.0.1:8545"); // Ganache RPC URL

const contractJson = JSON.parse(fs.readFileSync('../build/contracts/Election.json', 'utf8'));
// Get the network ID from Ganache
const networkId = await web3.eth.net.getId();

// Retrieve the contract address for the current network
const contractAddress = contractJson.networks[networkId]?.address;
const abi = contractJson.abi;

const electionContract = new web3.eth.Contract(abi, contractAddress);

// Submit a vote
export const submitVote = async (voterAddress, candidate) => {
    try {
        await electionContract.methods.Vote(candidate).send({
            from: voterAddress,
            gas: 6721975, // Adjust gas limit as needed
            gasPrice: web3.utils.toWei('20', 'gwei') // Use legacy gas price
        });
        console.log("Vote submitted successfully!");
    } catch (error) {
        console.error("Error submitting vote:", error);
    }
};


// Get the vote totals
export const getVoteCounts = async () => {
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

