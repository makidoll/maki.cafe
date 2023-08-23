import { Box, Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import IntroDrone from "../components/IntroDrone";
import Social from "../components/Social";
import DiscordHomeCard from "../components/home-cards/DiscordHomeCard";
import FlickrHomeCard from "../components/home-cards/FlickrHomeCard";
import GamesHomeCard from "../components/home-cards/GamesHomeCard";
import GithubGistsHomeCard from "../components/home-cards/GithubGistsHomeCard";
import HomelabCutelabBlahajHomeCard from "../components/home-cards/HomelabCutelabBlahajHomeCard";
import HomelabCutelabYetiHomeCard from "../components/home-cards/HomelabCutelabYetiHomeCard";
import HomelabHotmilkHomeCard, {
	OlderHomelab,
} from "../components/home-cards/HomelabHotmilkBlahajHomeCard";
import MastodonMediaHomeCard from "../components/home-cards/MastodonMediaHomeCard";
import MfcHomeCard from "../components/home-cards/MfcHomeCard";
import SketchfabHomeCard from "../components/home-cards/SketchfabHomeCard";
import WhereHomeCard from "../components/home-cards/WhereHomeCard";
import WorkHomeCard from "../components/home-cards/WorkHomeCard";
import Logo from "../components/ui/Logo";
import styles from "./index.module.scss";

const Home: NextPage = () => {
	const [ready, setReady] = useState(false);

	const [olderHomelab, setOlderHomelab] = useState(OlderHomelab.None);
	const resetHomelab = () => {
		setOlderHomelab(OlderHomelab.None);
	};

	const homelab =
		olderHomelab == OlderHomelab.Cutelab_Blahaj_Nov_11_2022 ? (
			<HomelabCutelabBlahajHomeCard onNewer={resetHomelab} />
		) : olderHomelab == OlderHomelab.Cutelab_Yeti_Feb_21_2022 ? (
			<HomelabCutelabYetiHomeCard onNewer={resetHomelab} />
		) : (
			<HomelabHotmilkHomeCard onOlder={setOlderHomelab} />
		);

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
				<IntroDrone
					h={550}
					mt={0}
					mb={0}
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
				{homelab}
				<MastodonMediaHomeCard />
				<GamesHomeCard />
				<GithubGistsHomeCard />
				<SketchfabHomeCard />
				<WhereHomeCard />
				<WorkHomeCard />
				<FlickrHomeCard />
				<MfcHomeCard />
			</Grid>
		</Box>
	);
};

export default Home;
