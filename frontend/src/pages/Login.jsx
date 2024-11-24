import React, { useState, useEffect } from 'react';
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
  useClipboard,
} from '@chakra-ui/react';
import Web3 from 'web3';

const registerVoter = async (firstName, lastName, voterAccount) => {
  try {
    // Send voter details to backend API
    const response = await fetch("http://localhost:5000/api/votes/register-voter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, voterAccount }),
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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: ''
  });
  const [address, setAddress] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); // Track button click
  const [usedAddresses, setUsedAddresses] = useState([]); // Track used addresses

  // Initialize Web3 with Ganache provider
  const web3 = new Web3('http://localhost:8545');  // Connect to Ganache CLI

  // Function to fetch accounts and pick a random unused address
  const getRandomAddress = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        // Filter out used addresses
        const unusedAddresses = accounts.filter(account => !usedAddresses.includes(account));
        if (unusedAddresses.length > 0) {
          // If there are unused addresses, pick a random one and set it
          const randomAddress = unusedAddresses[Math.floor(Math.random() * unusedAddresses.length)];
          setAddress(randomAddress); // Set the random address
        } else {
          console.error("No unused accounts found");
        }
      } else {
        console.error("No accounts found");
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address) {
      console.error("No Ethereum account selected");
      return;
    }
    // Register the voter without voterId, using the address from Ganache
    registerVoter(formData.firstName, formData.lastName, address);

    // Update usedAddresses and set isRegistered
    setUsedAddresses(prevUsed => [...prevUsed, address]);
    setIsRegistered(true);  // Set isRegistered to true after button click
  };

  // Handle address copying using Chakra's useClipboard hook
  const { onCopy, hasCopied } = useClipboard(address);

  // Only run getRandomAddress once when the form is ready to submit
  useEffect(() => {
    if (!isRegistered && address === '') {
      getRandomAddress(); // Fetch random address when the page loads or when registration hasn't been done yet
    }
  }, [isRegistered, address]);

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

            {isRegistered && (
              <FormControl id="ethereum-address" isRequired>
                <FormLabel>Ethereum Address</FormLabel>
                <Box display="flex" alignItems="center">
                  <Text mr={2} isTruncated maxW="250px">
                    {address}
                  </Text>
                  <Button onClick={onCopy} size="sm" colorScheme="teal">
                    {hasCopied ? "Copied" : "Copy"}
                  </Button>
                </Box>
              </FormControl>
            )}

            <Button
              colorScheme="teal"
              size="lg"
              width="100%"
              onClick={handleSubmit}
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
