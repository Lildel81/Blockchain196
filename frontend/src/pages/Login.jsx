import React, { useState } from 'react';
import axios from 'axios';
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

const registerVoter = async (firstName, lastName, voterId) => {
  if (!window.ethereum) {
    alert("MetaMask is not installed!");
    return;
}

try {
    // Request account access from MetaMask
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Get the user's account
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const voterAccount = accounts[0];

    // Send voter details to backend API
    const response = await fetch("http://localhost:5000/api/votes/register-voter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, voterId, voterAccount }),
    });

    const data = await response.json();
    if (data.success) {
        console.log("Voter registered successfully:", data);
    } else {
        console.error("Error:", data.message);
    }
  } catch (error) {
      console.error("Error registering voter:", error);
  }
};

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
