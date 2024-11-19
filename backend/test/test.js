import { submitVote, getVoteCounts } from '../contract.js';

const voterAddress = "0x052C47781bD6512480390C9Bbebb99A26Ffc8054"; // Replace with an address from Ganache
const candidate = "Trump"; // Change to any candidate

const main = async () => {
    await submitVote(voterAddress, candidate);

    const counts = await getVoteCounts();
    console.log("Final counts:", counts);
};

main();
