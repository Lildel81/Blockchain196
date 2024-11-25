import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Info from "./pages/Info";


function App() {
	return (
		<Box min={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/info' element={<Info />} />

			</Routes>
		</Box>
	);
}

export default App;