
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Button, Heading, Center, Text, Flex, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';

function Home() {
    const [isSplit, setIsSplit] = useState(false);
    const [address, setAddress] = useState("");
    const [isAddressValid, setIsAddressValid] = useState(false);
    const toast = useToast();


    const handleVote = async (vote) => {
        try {
            const response = await axios.post('http://localhost:5000/voting/', 
                { address, vote }, 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true, // Enable CORS
                }
            );
            const result = response.data;
            toast({
                title: result.message || 'Vote submitted successfully!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error submitting vote',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleAddressChange = (e) => {
        const enteredAddress = e.target.value;
        setAddress(enteredAddress);
        setIsAddressValid(enteredAddress.trim().length > 0); // Simple validation for non-empty address
    };

    return (
        <Box
            position="relative"
            bgImage="url('https://www.downloadclipart.net/large/government-png-clipart.png'),
                     url('https://www.downloadclipart.net/large/69168-european-stars-clipart.png')"
            bgSize="500px 400px, 340px 340px"
            bgPosition="49.5% 840px, 50% 380px"
            bgRepeat="no-repeat, no-repeat"
            minHeight="100vh"
        >
            <Navbar />
            <Heading textAlign={"center"} marginTop={"8vh"}>
                <Text fontWeight="300" textColor="gray.600" fontSize="70">2024 DIGITAL BALLOT</Text>
            </Heading>

            <Center marginTop="5vh">
                <Input
                    placeholder="Enter Ethereum Address"
                    value={address}
                    onChange={handleAddressChange}
                    width="400px"
                />
            </Center>

            <Center height="60vh">
                {!isSplit ? (
                    <Button
                        onClick={() => setIsSplit(true)}
                        size="4xl"
                        bg="gray.600"
                        color="white"
                        borderRadius="50px 50px 50px 50px"
                        width="900px"
                        height="300px"
                        _hover={{ bg: "gray.700" }}
                        isDisabled={!isAddressValid} // Disable if address is not valid
                    >
                        <Text fontWeight="400" fontSize="45" marginBottom={"1vh"}>
                            CLICK TO CAST VOTE
                        </Text>
                    </Button>
                ) : (
                    <Flex width="900px" justify="space-between">
                        <Button
                            onClick={() => handleVote('Blue')}
                            width="50%"
                            height="300px"
                            borderRadius="50px 0 0 50px"
                            bg="blue.700"
                            color="white"
                            _hover={{ bg: "blue.800" }}
                            isDisabled={!isAddressValid}
                        >
                            <Box>
                                <Text fontWeight="400" fontSize="30" color="gray.100" display="inline">
                                    KAMALA D. {" "}
                                </Text>
                                <Text fontWeight="500" fontSize="30" color="gray.100" display="inline">
                                    HARRIS
                                </Text>
                                <Text fontWeight="400" fontSize="20" color="gray.200" mt={2}>
                                    Tim Walz
                                </Text>
                            </Box>
                        </Button>

                        <Button
                            onClick={() => handleVote('Red')}
                            width="50%"
                            height="300px"
                            borderRadius="0 50px 50px 0"
                            bg="red.700"
                            color="white"
                            _hover={{ bg: "red.800" }}
                            isDisabled={!isAddressValid}
                        >
                            <Box>
                                <Text fontWeight="400" fontSize="30" color="gray.100" display="inline">
                                    DONALD J. {" "}
                                </Text>
                                <Text fontWeight="500" fontSize="30" color="gray.100" display="inline">
                                    TRUMP
                                </Text>
                                <Text fontWeight="400" fontSize="20" color="gray.200" mt={2}>
                                    JD Vance
                                </Text>
                            </Box>
                        </Button>
                    </Flex>
                )}
            </Center>

            <Center height="20vh"></Center>
        </Box>
    );
}

export default Home;
