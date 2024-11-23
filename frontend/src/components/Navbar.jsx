import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon, InfoIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "28", sm: "40" }}
					fontWeight={"600"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-l, red.600, gray.500, blue.700)"}
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