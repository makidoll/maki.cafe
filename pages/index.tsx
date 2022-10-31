import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Social from "../components/Social";
import Card from "../components/ui/Card";
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
			<Box marginTop={6}>
				<Social />
			</Box>
			<Card>hi</Card>
		</Box>
	);
};

export default Home;
