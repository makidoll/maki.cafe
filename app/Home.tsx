"use client";

import { Box, Grid, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import Social from "../components/Social";
import pinesBackground from "../components/assets/pines-lighter.jpg";
import AlbumsHomeCard from "../components/home-cards/AlbumsHomeCard";
import AurHomeCard from "../components/home-cards/AurHomeCard";
import DiscordHomeCard from "../components/home-cards/DiscordHomeCard";
import GamesHomeCard from "../components/home-cards/GamesHomeCard";
import HomelabCutelabBlahajHomeCard from "../components/home-cards/HomelabCutelabBlahajHomeCard";
import HomelabCutelabYetiHomeCard from "../components/home-cards/HomelabCutelabYetiHomeCard";
import HomelabHotmilkBlahajHomeCard, {
	OlderHomelab,
} from "../components/home-cards/HomelabHotmilkBlahajHomeCard";
import MastodonMediaHomeCard from "../components/home-cards/MastodonMediaHomeCard";
import SketchfabHomeCard from "../components/home-cards/SketchfabHomeCard";
import SlMarketplaceHomeCard from "../components/home-cards/SlMarketplaceHomeCard";
import StuffIveMadeHomeCard from "../components/home-cards/StuffIveMadeHomeCard";
import WebringCard from "../components/home-cards/WebringCard";
import SpinnyIntro from "../components/spinny-intro/SpinnyIntro";
import SpinnyIntrosModal from "../components/spinny-intro/SpinnyIntrosModal";
import { SpinnyIntros } from "../components/spinny-intro/spinny-intros";
import Logo from "../components/ui/Logo";
import type { LatestData } from "../server/data-sources";
import { ClientInfo } from "../server/main";
import styles from "./Home.module.scss";
import gnomeDarkImage from "./gnome-dark.svg";

const layoutItemWidth = 450;

const layout2Wide = 900;
const layout3Wide = 1350;
// const layout4Wide = 1800;

export default function Home(props: { client: ClientInfo; data: LatestData }) {
	const [ready, setReady] = useState(false);

	const spinnyIntrosDisclosue = useDisclosure();

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
			<HomelabHotmilkBlahajHomeCard
				onOlder={setOlderHomelab}
				data={props.data.uptime}
			/>
		);

	// let logoUseCanvas = true;
	// if (typeof window !== "undefined") {
	// 	// on client, not ssr
	// 	if (typeof Path2D === "undefined") {
	// 		// that dont support path2d
	// 		logoUseCanvas = false;
	// 	}
	// }

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
				backgroundImage={gnomeDarkImage}
				backgroundSize={"100%"}
				style={{
					imageRendering: "pixelated",
				}}
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
				// backgroundImage={polkaDotPattern}
				// backgroundSize={[10, 11.547].map(v => v * 10 + "px").join(" ")}
				// backgroundPosition={"center 0"}
				// backgroundRepeat={"repeat"}
				// opacity={0.02}
				// style={{
				// 	// it can flash white if opacity is only set above
				// 	opacity: "0.02 !important",
				// 	WebkitMaskImage:
				// 		"linear-gradient(0deg, transparent, black)",
				// }}
				backgroundImage={pinesBackground.src}
				sx={{
					backgroundSize: "800px auto",
					[`@media (min-width: ${layout2Wide}px)`]: {
						backgroundSize: "1200px auto",
					},
					[`@media (min-width: ${layout3Wide}px)`]: {
						backgroundSize: "1600px auto",
					},
				}}
				backgroundPosition={"center 0"}
				backgroundRepeat={"no-repeat"}
			></Box>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
				width="100%"
			>
				{spinnyIntrosDisclosue.isOpen ? (
					<Box w={600} h={600} />
				) : (
					<SpinnyIntro
						w={600}
						h={500}
						mt={50}
						mb={50}
						client={props.client}
						intro={SpinnyIntros[0]}
						onReady={() => {
							setReady(true);
						}}
					/>
				)}
				<Box
					width={350}
					marginTop={-4}
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
					{/* {logoUseCanvas ? (
						<LogoCanvas width={350} ready={ready} />
					) : (
						<Logo ready={ready} />
					)} */}
					<Logo ready={ready} />
				</Box>
				<Box marginTop={4}>
					<Social onSpinnyIntrosOpen={spinnyIntrosDisclosue.onOpen} />
				</Box>
				<SpinnyIntrosModal
					client={props.client}
					disclosure={spinnyIntrosDisclosue}
				/>
			</Box>
			<Grid
				sx={{
					gridTemplateColumns: `repeat(1, ${layoutItemWidth}px)`,
					[`@media (min-width: ${layout2Wide}px)`]: {
						gridTemplateColumns: `repeat(2, ${layoutItemWidth}px)`,
					},
					[`@media (min-width: ${layout3Wide}px)`]: {
						gridTemplateColumns: `repeat(3, ${layoutItemWidth}px)`,
					},
					// [`@media (min-width: ${layout4Wide}px)`]: {
					// 	gridTemplateColumns: "repeat(4, 450px)",
					// },
				}}
				gap={6}
				alignItems="center"
				justifyContent="center"
				mt={12}
				mb={32}
			>
				<DiscordHomeCard />
				<StuffIveMadeHomeCard />
				<SlMarketplaceHomeCard data={props.data.slMarketplace} />
				<MastodonMediaHomeCard data={props.data.mastodon} />
				{homelab}
				<GamesHomeCard />
				<AlbumsHomeCard />
				{/* <GithubGistsHomeCard data={props.data.github} /> */}
				<AurHomeCard data={props.data.aur} />
				<SketchfabHomeCard data={props.data.sketchfab} />
				<WebringCard />
				{/* <WhereHomeCard /> */}
				{/* <FlickrHomeCard /> */}
				{/* <MfcHomeCard /> */}
			</Grid>
			{/* <PonyCounter n={1234567890} /> */}
		</Box>
	);
}
