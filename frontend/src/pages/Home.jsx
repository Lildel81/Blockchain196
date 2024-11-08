import React from 'react';
import { Box, Button, Heading, Container, Center, Stack, Image, Input } from '@chakra-ui/react';

function Home () {
    return (
        <Box>
            <Heading textAlign={"center"} marginTop={"10vh"}>
                2024 Election
            </Heading>
            <Center height={"50vh"} justifyContent={"center"}>
                <Image src={"https://imgs.search.brave.com/gbcYiDOPmWNTc-mLYXN5TJtuXb4ZHsx0JXqtv03fdpQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jbm4uY29tL2Fw/aS92MS9pbWFnZXMv/c3RlbGxhci9wcm9k/LzIwMjQxMDI5LWth/bWFsYS1oYXJyaXMt/ZG9uYWxkLXRydW1w/LXNwbGl0LmpwZz9j/PTF4MSZxPWhfMjU2/LHdfMjU2LGNfZmls/bA"}></Image>
            </Center>
            <Center height="50vh">
                <Container justifyContent={"center"} textAlign={"space-between"}>
                    <Stack direction="row" spacing={32} width="100%">
                        <Button width="100%">Vote for Kamala Harris</Button>
                        <Button width="100%">Vote for Donald Trump</Button>
                    </Stack>
                </Container>
            </Center>

        </Box>
    );
}

export default Home;