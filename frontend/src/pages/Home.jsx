import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import { Box, Button, Heading, Container, Center, Stack, Image, Input, Text, Flex } from '@chakra-ui/react';

/* 
::TODO::
React component for our homepage
Buttons need to implement calls to the backend API
*/

function Home () {
    const [isSplit, setIsSplit] = useState(false);

    return (
        <Box 
            position = "relative"
            bgImage="url('https://www.downloadclipart.net/large/government-png-clipart.png'),
                     url('https://www.downloadclipart.net/large/69168-european-stars-clipart.png')" 
            bgSize="500px 400px, 340px 340px" // Makes sure the image covers the entire background
            bgPosition="49.5% 840px, 50% 380px" 
            bgRepeat="no-repeat, no-repeat"
            minHeight="100vh" 
        >
            
            <Navbar />
            <Heading textAlign={"center"} marginTop={"8vh"}>
                <Text fontWeight="300" textColor="gray.600" fontSize="70"> 2024 DIGITAL BALLOT </Text>
            </Heading>

            <Center height="60vh">
                {/* If not split, show a single rounded button */}
                {!isSplit ? (
                    <Button
                        onClick={() => setIsSplit(true)} // Splits the button on click
                        size="4xl"
                        bg="gray.600"
                        color="white"
                        borderRadius="50px 50px 50px 50px"
                        width="900px"
                        height="300px"
                        _hover={{ bg: "gray.700" }}
                    >
                        <Text fontWeight="400" fontSize="45" marginBottom={"1vh"}>
                                    CLICK TO CAST VOTE
                                </Text>
                    </Button>
                ) : (
                    // If split, show two semi-circular buttons
                    <Flex width="900px" justify="space-between">
                        {/* Left Semi-Circle Button */}
                        <Button
                            onClick={
                                () => {
                                    setIsSplit(false)
                                    console.log("Voting For Harris")
                                // TODO: Pop up window. Ask for final confirmation
                                // Display "BALLOT WAS SUCCESSFULLY CAST" Must login to new user to cast another.
                                // Post a vote to API for Harris
                                }
                            } 
                            width="50%"
                            height="300px"
                            borderRadius="50px 0 0 50px"
                            bg="blue.700"
                            color="white"
                            _hover={{ bg: "blue.800" }}
                        >
                            <Box>
                                
                                <Text fontWeight="400" fontSize="30" color="gray.100" display="inline">
                                    KAMALA D. {" "}
                                </Text>
                                <Text fontWeight="500" fontSize="30" color="gray.100" display="inline" >
                                     HARRIS
                                </Text>
                                <Text fontWeight="400" fontSize="20" color="gray.200" mt={2}>
                                    Tim Walz
                                </Text>
                            </Box>
                        </Button>

                        {/* Right Semi-Circle Button */}
                        <Button
                            onClick={
                                () => {
                                    setIsSplit(false)
                                    console.log("Voting For Harris")
                                // TODO: Pop up window. Ask for final confirmation
                                // Display "BALLOT WAS SUCCESSFULLY CAST" Must login to new user to cast another.
                                // Post a vote to API for Trump
                                }
                            } 
                            width="50%"
                            height="300px"
                            borderRadius="0 50px 50px 0"
                            bg="red.700"
                            color="white"
                            _hover={{ bg: "red.800" }}
                        >
                            <Box>
                            <Text fontWeight="400" fontSize="30" color="gray.100" display="inline">
                                    DONALD J. {" "}
                                </Text>
                                <Text fontWeight="500" fontSize="30" color="gray.100" display="inline" >
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