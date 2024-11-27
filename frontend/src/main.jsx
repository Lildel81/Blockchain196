import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

// Creating a custom theme

/*
const theme = extendTheme({
	fonts: {
		heading: "'Libre Franklin', sans-serif", // Set Libre Franklin for headings
		body: "'Libre Franklin', sans-serif", // Set Libre Franklin for body text
		mono: "'Courier New', monospace", // Set a monospace font if needed
		//User's browser will try to use first font. If not available. Will default to second.
	},
	});
*/


ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>
);