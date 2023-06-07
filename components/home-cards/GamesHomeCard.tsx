import {
	Box,
	Divider,
	Flex,
	Grid,
	GridItem,
	HStack,
	Link,
	Text,
} from "@chakra-ui/react";
import { config } from "../../utils/config";
import { getBackgroundPositionsForSpritesheet } from "../../utils/utils";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import { PlayStationIcon } from "../ui/social-icons/PlayStationIcon";
import { SteamIcon } from "../ui/social-icons/SteamIcon";
import { gamesInfo } from "./games-info";
import gamesSpritesheet from "./games-spritesheet.png";

export default function GamesHomeCard(props) {
	const gamesWithPositions = getBackgroundPositionsForSpritesheet(
		gamesInfo.sheetWidth,
		gamesInfo.sheetHeight,
	).map((position, i) => ({
		steamId: gamesInfo.steamIds[i],
		position,
	}));

	const steamHorizontalAspectRation = "231 / 87";

	const socials = [
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
		// {
		// 	name: "Osu",
		// 	url: config.socialLinks.osu,
		// 	icon: OsuIcon,
		// },
	];

	return (
		<HomeCard>
			<HomeCardHeading mb={4}>my favorite games</HomeCardHeading>
			<Grid templateColumns="repeat(3, 1fr)" gap={1} w={350} maxW={350}>
				{gamesWithPositions.slice(0, 6).map((game, i) => (
					<GridItem
						key={i}
						transition={config.styles.hoverTransition}
						_hover={{
							transform: "scale(1.05)",
						}}
					>
						<Link
							aria-label="Steam Game"
							href={
								"https://store.steampowered.com/app/" +
								game.steamId
							}
						>
							<Box
								borderRadius={4}
								sx={{
									imageRendering: "optimizeQuality",
									aspectRatio: steamHorizontalAspectRation,
								}}
								backgroundImage={gamesSpritesheet.src}
								backgroundPosition={game.position}
								backgroundSize={
									gamesInfo.sheetWidth * 100 +
									"% " +
									gamesInfo.sheetHeight * 100 +
									"%"
								}
							/>
						</Link>
					</GridItem>
				))}
			</Grid>
			<Grid
				templateColumns="repeat(4, 1fr)"
				gap={1}
				w={350}
				maxW={350}
				mt={1}
			>
				{gamesWithPositions
					.slice(6, gamesInfo.steamIds.length)
					.map((game, i) => (
						<GridItem
							key={i}
							transition={config.styles.hoverTransition}
							_hover={{
								transform: "scale(1.05)",
							}}
						>
							<Link
								aria-label="Steam Game"
								href={
									"https://store.steampowered.com/app/" +
									game.steamId
								}
							>
								<Box
									borderRadius={4}
									sx={{
										imageRendering: "optimizeQuality",
										aspectRatio:
											steamHorizontalAspectRation,
									}}
									backgroundImage={gamesSpritesheet.src}
									backgroundPosition={game.position}
									backgroundSize={
										gamesInfo.sheetWidth * 100 +
										"% " +
										gamesInfo.sheetHeight * 100 +
										"%"
									}
								/>
							</Link>
						</GridItem>
					))}
			</Grid>
			<Divider my={2} />
			<Grid
				templateColumns="repeat(4, 1fr)"
				gap={1}
				w={350}
				maxW={350}
				mt={1}
			>
				{gamesWithPositions
					.slice(
						gamesInfo.steamIds.length,
						gamesInfo.steamIds.length +
							gamesInfo.nonSteamLinks.length,
					)
					.map((game, i) => (
						<GridItem
							key={i}
							transition={config.styles.hoverTransition}
							_hover={{
								transform: "scale(1.05)",
							}}
						>
							<Link
								aria-label="Non-Steam Game"
								href={gamesInfo.nonSteamLinks[i]}
							>
								<Box
									borderRadius={4}
									sx={{
										imageRendering: "optimizeQuality",
										aspectRatio:
											steamHorizontalAspectRation,
									}}
									backgroundImage={gamesSpritesheet.src}
									backgroundPosition={game.position}
									backgroundSize={
										gamesInfo.sheetWidth * 100 +
										"% " +
										gamesInfo.sheetHeight * 100 +
										"%"
									}
								/>
							</Link>
						</GridItem>
					))}
			</Grid>
			<HStack spacing={6} justifyContent={"center"}>
				{socials.map((social, i) => (
					<Link
						key={i}
						href={social.url}
						textDecor="none"
						color="#fff"
					>
						<Flex
							width="100%"
							alignItems="center"
							justifyContent="center"
							opacity={0.4}
							mt={3}
							mb={-2}
						>
							<social.icon size={18} color="#fff" />
							<Text ml={1} fontWeight={500}>
								{social.name}
							</Text>
						</Flex>
					</Link>
				))}
			</HStack>
		</HomeCard>
	);
}
