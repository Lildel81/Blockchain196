import Web3 from 'web3';
import { submitVote, getVoteCounts } from '../contract.js';

// Initialize web3
const web3 = new Web3('http://127.0.0.1:8545'); // Assuming Ganache is running on this address

const main = async () => {
    // Get accounts dynamically
    const accounts = await web3.eth.getAccounts();
    
    // Simulate election
    await submitVote(accounts[0], "Red");
    await submitVote(accounts[1], "Blue");
    await submitVote(accounts[2], "Red");
    // Voter from above attempts to vote twice:
    await submitVote(accounts[2], "Red");
    await submitVote(accounts[3], "Red");
    await submitVote(accounts[4], "Blue");
    await submitVote(accounts[5], "Blue");
    const counts = await getVoteCounts();
    console.log("Final counts:", counts);
};

main();
