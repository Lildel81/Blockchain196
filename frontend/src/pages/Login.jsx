
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
import { ethers } from 'ethers';

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
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Contract setup
      const electionAddress = "OUR_CONTRACT_ADDRESS"; // We need to put our actual contract address in here
      const electionABI = [
        "function registerVoter(string memory firstName, string memory lastName, uint256 voterId)"
      ];
      const electionContract = new ethers.Contract(electionAddress, electionABI, signer);

      // Send transaction
      const transaction = await electionContract.registerVoter(
        formData.firstName,
        formData.lastName,
        parseInt(formData.voterId)
      );
      await transaction.wait();
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


