import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

function App() {
	return (
		<Box min={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
		</Box>
	);
}

export default App;