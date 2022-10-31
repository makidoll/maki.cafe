import { Box, Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import DiscordHomeCard from "../components/home-cards/DiscordHomeCard";
import Social from "../components/Social";
import HomeCard from "../components/ui/HomeCard";
import Logo from "../components/ui/Logo";

const Home: NextPage = () => {
	return (
		<>
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
			</Box>
			<Grid
				sx={{
					gridTemplateColumns: "repeat(1, 450px)",
					"@media (min-width: 900px)": {
						gridTemplateColumns: "repeat(2, 450px)",
					},
					"@media (min-width: 1350px)": {
						gridTemplateColumns: "repeat(3, 450px)",
					},
					"@media (min-width: 1800px)": {
						gridTemplateColumns: "repeat(4, 450px)",
					},
				}}
				gap={6}
				alignItems="center"
				justifyContent="center"
				mt={8}
			>
				<DiscordHomeCard />
			</Grid>
		</>
	);
};

export default Home;
