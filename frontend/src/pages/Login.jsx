import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Button,
  Container,
  Text,
} from '@chakra-ui/react';
import Web3 from 'web3';

function App() {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    voterId: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Register voter function to interact with the smart contract
  const registerVoter = async () => {
    // Ensure MetaMask is available
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Initialize Web3 instance
      const web3 = new Web3(window.ethereum);

      // Set up contract instance
      const electionAddress = "OUR_CONTRACT_ADDRESS"; // Replace with your actual contract address
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

      // Send transaction
      const accounts = await web3.eth.getAccounts();
      await electionContract.methods.registerVoter(
        formData.firstName,
        formData.lastName,
        parseInt(formData.voterId)
      ).send({ from: accounts[0] });
      
      alert("Voter registered successfully!");
    } catch (error) {
      console.error("Error registering voter:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="md" centerContent py={10}>
        <Box
          w="100%"
          p={6}
          borderRadius="md"
          boxShadow="xl"
          background="white"
          textAlign="center"
        >
          <VStack spacing={4}>
            <Heading as="h2" size="lg" color="teal.500">
              Voter Registration
            </Heading>
            <Text color="gray.500">
              Enter your details to register on the Ethereum network.
            </Text>

            <FormControl id="first-name" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="last-name" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="voter-id" isRequired>
              <FormLabel>Voter ID</FormLabel>
              <Input
                placeholder="Voter ID"
                name="voterId"
                value={formData.voterId}
                onChange={handleChange}
                type="number"
              />
            </FormControl>

            <Button
              colorScheme="teal"
              size="lg"
              width="100%"
              onClick={registerVoter}
            >
              Register
            </Button>
          </VStack>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default App;
