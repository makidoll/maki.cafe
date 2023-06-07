import { Box, Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import DiscordHomeCard from "../components/home-cards/DiscordHomeCard";
import FlickrHomeCard from "../components/home-cards/FlickrHomeCard";
import GamesHomeCard from "../components/home-cards/GamesHomeCard";
import HomelabHomeCard from "../components/home-cards/HomelabHomeCard";
import MfcHomeCard from "../components/home-cards/MfcHomeCard";
import SketchfabHomeCard from "../components/home-cards/SketchfabHomeCard";
import WhereHomeCard from "../components/home-cards/WhereHomeCard";
import WorkHomeCard from "../components/home-cards/WorkHomeCard";
import IntroAvatar from "../components/IntroAvatar";
import Social from "../components/Social";
import Logo from "../components/ui/Logo";
import styles from "./index.module.scss";
import { useState } from "react";

const Home: NextPage = () => {
	const [ready, setReady] = useState(false);

	return (
		<Box
			className={
				process.env.NODE_ENV == "development" ? "" : styles["fade-in"]
			}
		>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
				width="100%"
			>
				<IntroAvatar
					h={400}
					mt={24}
					mb={16}
					onLoaded={() => {
						setReady(true);
					}}
				/>
				<Box width={400} marginTop={0}>
					<Logo ready={ready} />
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
				mb={32}
			>
				<DiscordHomeCard />
				<WorkHomeCard />
				<WhereHomeCard />
				<GamesHomeCard />
				<HomelabHomeCard />
				<MfcHomeCard />
				<FlickrHomeCard />
				<SketchfabHomeCard />
			</Grid>
		</Box>
	);
};

export default Home;
