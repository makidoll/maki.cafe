import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Social from "../components/Social";
import Logo from "../components/ui/Logo";

const Home: NextPage = () => {
	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="center"
			flexDirection="column"
			width="100%"
		>
			<Box width={400} marginTop={16}>
				<Logo />
			</Box>
			<Box marginTop={8}>
				<Social />
			</Box>
		</Box>
	);
};

export default Home;
