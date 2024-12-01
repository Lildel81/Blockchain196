import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon, InfoIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Container maxW={"2000px"} >
			<Flex
				//h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
				bg={colorMode === "light" ? "gray.200" : "black.900"} 
				backgroundImage={'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("https://t3.ftcdn.net/jpg/00/22/35/86/360_F_22358642_TlOPo0uu0tAb22YINFwY1UDKxFON8TFR.jpg")'}
				
				p={5} 
				width="100%"
				
			>
				<Text
					fontSize={{ base: "28", sm: "40" }}
					fontWeight={"600"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-l, red.500, blue.900, blue.400)"}
					bgClip={"text"}
				>
					<Link to={"/"}>US Presidential Election</Link>
				</Text>

				<Text
					fontWeight="600" fontSize="20"
				>
					<Link to={"/info"}>INFORMATION</Link>
				</Text>

				<Text
				fontWeight="600" fontSize="20"
				>
					<Link to={"/login"}>LOGIN</Link>
				</Text>
				
				<Text
				fontWeight="600" fontSize="20"
				>
					<Link to={"/Results"}>RESULTS</Link>
				</Text>

				<HStack spacing={3} alignItems={"center"}>
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
};
export default Navbar;
