import { Box, Grid } from "@chakra-ui/react";
import type {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from "next";
import { useState } from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import IntroPony from "../components/IntroPony";
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
import StuffIveMadeHomeCard from "../components/home-cards/StuffIveMadeHomeCard";
import WhereHomeCard from "../components/home-cards/WhereHomeCard";
import Logo from "../components/ui/Logo";
import polkaDotPattern from "../tools/polka-dot-pattern/polka-dot-pattern.svg";
import gnomeDarkImage from "./gnome-dark.png";
import styles from "./index.module.scss";

export const getServerSideProps = (async ({ req }) => {
	let isMobile = false;
	if (req) {
		isMobile = getSelectorsByUserAgent(
			req.headers["user-agent"] ?? "",
		).isMobile;
	} else {
		isMobile = getSelectorsByUserAgent(navigator.userAgent).isMobile;
	}

	return { props: { isMobile } };
}) satisfies GetServerSideProps<{
	isMobile: boolean;
}>;

const Home: NextPage = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
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
			{/* <Box
				position={"fixed"}
				top={0}
				left={0}
				right={0}
				h={4}
				zIndex={999998}
				backgroundColor={"justKindaDark"}
				backgroundSize={"100% 100%"}
			></Box> */}
			<Box
				position={"fixed"}
				top={0}
				left={0}
				right={0}
				h={2}
				zIndex={999999}
				backgroundImage={gnomeDarkImage.src}
				backgroundSize={"100% 100%"}
			></Box>
			<Box
				position={"absolute"}
				top={2}
				left={0}
				right={0}
				h={"80vh"}
				zIndex={-999999}
				// backgroundSize={`52px 90px`} // hexagon
				// backgroundSize={[1200, 923.76]
				// 	.map(v => v * 0.2 + "px")
				// 	.join(" ")}
				// backgroundImage={militarismTile.src}
				backgroundImage={polkaDotPattern.src}
				backgroundSize={[10, 11.547].map(v => v * 10 + "px").join(" ")}
				backgroundPosition={"center 0"}
				backgroundRepeat={"repeat"}
				opacity={0.02}
				style={{
					// it can flash white if opacity is only set above
					opacity: "0.02 !important",
					WebkitMaskImage:
						"linear-gradient(0deg, transparent, black)",
				}}
			></Box>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
				width="100%"
			>
				<IntroPony
					h={600}
					mt={2}
					mb={0}
					onLoaded={() => {
						setReady(true);
					}}
					isMobile={props.isMobile}
				/>
				<Box
					width={350}
					// marginTop={0}
					position={"relative"}
					// marginTop="16px"
				>
					{/* <chakra.svg
						viewBox="0 0 100 50"
						xmlns="http://www.w3.org/2000/svg"
						margin={"auto"}
						position={"absolute"}
						top={"-230px"}
						left={"-128px"}
						right={"-128px"}
						opacity={ready ? 0.2 : 0}
						fontFamily={""}
						pointerEvents={"none"}
					>
						<path
							id="textPath"
							fill="none"
							d="
								M 10, 50
								a 40,40 0 1,0 80,0
								40,40 0 1,0 -80,0
							"
							transform="scale(1 0.333)"
						/>
						<text>
							<textPath
								href="#textPath"
								fontSize={"2.7px"}
								fill="white"
								startOffset={23}
								// letterSpacing={"0.2px"}
								fontWeight={700}
							>
								hoping to change my avatar soon...
							</textPath>
						</text>
					</chakra.svg> */}
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
				<StuffIveMadeHomeCard />
				{homelab}
				<MastodonMediaHomeCard />
				<GamesHomeCard />
				<GithubGistsHomeCard />
				<SketchfabHomeCard />
				{/* <WhereHomeCard /> */}
				{/* <FlickrHomeCard /> */}
				{/* <MfcHomeCard /> */}
			</Grid>
		</Box>
	);
};

export default Home;
