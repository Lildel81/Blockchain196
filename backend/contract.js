import Web3 from 'web3'
const web3 = new Web3("http://127.0.0.1:7545"); // Ganache RPC URL
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your deployed contract address
const abi = YOUR_CONTRACT_ABI; // Replace with your contract's ABI

const electionContract = new web3.eth.Contract(abi, contractAddress);

// Submit a vote
export const submitVote = async (voterAddress, candidate) => {
    try {
        await electionContract.methods.Vote(candidate).send({ from: voterAddress });
        console.log("Vote submitted successfully!");
    } catch (error) {
        console.error("Error submitting vote:", error);
    }
};

// Get the vote totals
export const getVoteCounts = async () => {
    try {
        const counts = await electionContract.methods.GetCount().call();
        console.log("Vote counts:", counts);
        return counts;
    } catch (error) {
        console.error("Error fetching counts:", error);
    }
};
