import React from 'react';
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

function App() {
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
              <Input placeholder="First Name" />
            </FormControl>

            <FormControl id="last-name" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder="Last Name" />
            </FormControl>

            <FormControl id="voter-id" isRequired>
              <FormLabel>Voter ID</FormLabel>
              <Input placeholder="Voter ID" />
            </FormControl>

            <Button colorScheme="teal" size="lg" width="100%">
              Register
            </Button>
          </VStack>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default App;
