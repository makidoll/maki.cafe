import { Box, Grid, GridItem, Link, Text } from "@chakra-ui/react";
import { config } from "../../utils/config";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardFooterLink from "../ui/home-card/HomeCardFooterLink";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import { OsuIcon } from "../ui/social-icons/OsuIcon";
import { PlayStationIcon } from "../ui/social-icons/PlayStationIcon";
import { SteamIcon } from "../ui/social-icons/SteamIcon";
import { gamesInfo } from "../assets/games-info";
import gamesSpritesheet from "../assets/games-spritesheet.png";

const steamHorizontalAspectRatio = "231 / 87";

function GameGridItem(props: { game: { url: string; position: string } }) {
	return (
		<GridItem
			transition={config.styles.hoverTransition}
			_hover={{
				transform: "scale(1.05)",
			}}
		>
			<Link aria-label="Game" href={props.game.url}>
				<Box
					borderRadius={4}
					sx={{
						imageRendering: "optimizeQuality",
						aspectRatio: steamHorizontalAspectRatio,
					}}
					backgroundImage={gamesSpritesheet.src}
					backgroundPosition={props.game.position}
					backgroundRepeat={"no-repeat"}
					backgroundSize={gamesInfo.cssSize}
				/>
			</Link>
		</GridItem>
	);
}

export default function GamesHomeCard() {
	return (
		<HomeCard>
			<HomeCardHeading mb={4}>my favorite games</HomeCardHeading>
			<Grid templateColumns="repeat(3, 1fr)" gap={1} w={350} maxW={350}>
				{gamesInfo.games.slice(0, 6).map((game, i) => (
					<GameGridItem game={game} key={i} />
				))}
			</Grid>
			<Text
				textAlign={"left"}
				py={1}
				opacity={0.4}
				fontSize={"sm"}
				fontWeight={600}
			>
				in no particular order...
			</Text>
			<Grid templateColumns="repeat(4, 1fr)" gap={1} w={350} maxW={350}>
				{gamesInfo.games.slice(6).map((game, i) => (
					<GameGridItem game={game} key={i} />
				))}
			</Grid>
			{/* <HomeCardFooterLink
				multi={[
					{
						name: "Steam",
						url: config.socialLinks.steam,
						icon: SteamIcon,
					},
					{
						name: "PlayStation",
						url: config.socialLinks.psnProfiles,
						icon: PlayStationIcon,
					},
					{
						name: "Osu",
						url: config.socialLinks.osu,
						icon: OsuIcon,
					},
				]}
			/> */}
		</HomeCard>
	);
}
