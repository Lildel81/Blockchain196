import { submitVote, getVoteCounts } from '../contract.js';

const voterAddress = "0xYourVoterAddress"; // Replace with an address from Ganache
const candidate = "Trump"; // Change to any candidate

const main = async () => {
    await submitVote(voterAddress, candidate);

    const counts = await getVoteCounts();
    console.log("Final counts:", counts);
};

main();
