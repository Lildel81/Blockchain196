import React from 'react';
import Navbar from '../components/Navbar';
import { Box, Button, Heading, Container, Center, Stack, Image, Input, Text,  } from '@chakra-ui/react';

/* 
::TODO::
React component for our homepage
Buttons need to implement calls to the backend API
*/

function Home () {
    return (
        <Box>
            <Navbar />
            <Heading textAlign={"center"} marginTop={"8vh"}>

                <Text fontWeight="bold" fontSize="5xl">2024 DIGITAL BALLOT</Text>
            </Heading>
            <Center height={"50vh"} justifyContent={"center"}>
                <Image src={"https://imgs.search.brave.com/gbcYiDOPmWNTc-mLYXN5TJtuXb4ZHsx0JXqtv03fdpQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jbm4uY29tL2Fw/aS92MS9pbWFnZXMv/c3RlbGxhci9wcm9k/LzIwMjQxMDI5LWth/bWFsYS1oYXJyaXMt/ZG9uYWxkLXRydW1w/LXNwbGl0LmpwZz9j/PTF4MSZxPWhfMjU2/LHdfMjU2LGNfZmls/bA"}></Image>
            </Center>
            <Center height="35vh">
                <Container justifyContent={"center"} textAlign={"space-between"}>
                    <Stack direction="row" spacing={10} width="100%">
                        <Button width="100%" onClick={() => {
                            console.log("Voting for Harris")
                            // Post a Vote to the API for Harris
                            }   
                        }>
                            <Box>
                                <Text fontWeight="bold" fontSize="lg">KAMALA D. HARRIS</Text>
                                <Text fontWeight="medium" fontSize="sm" color="gray.600">Tim Walz</Text>
                            </Box>
                            </Button>

                        <Button width="100%" onClick={() => {
                            console.log("Voting for Trump")
                            // Post a Vote to the API for Trump
                            }
                        }>

                            <Box>
                                <Text fontWeight="bold" fontSize="lg">DONALD J. TRUMP</Text>
                                <Text fontWeight="medium" fontSize="sm" color="gray.600">JD Vance</Text>
                            </Box>
                            </Button>
                    </Stack>
                </Container>
            </Center>
        </Box>
    );
}

export default Home;