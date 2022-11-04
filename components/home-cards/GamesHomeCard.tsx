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
import { MdOpenInNew } from "react-icons/md";
import { config } from "../../config/config";
import { getBackgroundPositionsForSpritesheet } from "../../config/utils";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import { OsuIcon } from "../ui/social-icons/OsuIcon";
import { PlaystationIcon } from "../ui/social-icons/PlaystationIcon";
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
			url: config.socialLinks.steam,
			icon: SteamIcon,
		},
		{
			url: config.socialLinks.psnProfiles,
			icon: PlaystationIcon,
		},
		{
			url: config.socialLinks.osu,
			icon: OsuIcon,
		},
	];

	return (
		<HomeCard>
			<HomeCardHeading mb={4}>my favorite games</HomeCardHeading>
			<Grid templateColumns="repeat(3, 1fr)" gap={1} w={350} maxW={350}>
				{gamesWithPositions.slice(0, 6).map((game, i) => (
					<GridItem>
						<Link
							key={i}
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
						<GridItem>
							<Link
								key={i}
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
						gamesInfo.steamIds.length + gamesInfo.nonSteamGames,
					)
					.map((game, i) => (
						<GridItem>
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
						</GridItem>
					))}
			</Grid>
			<HStack spacing={6} justifyContent={"center"}>
				{socials.map((social, i) => (
					<Link
						key={i}
						href={social.url}
						textDecor="none"
						color="#000"
					>
						<Flex
							width="100%"
							alignItems="center"
							justifyContent="center"
							opacity={0.4}
							mt={3}
							mb={-2}
						>
							<social.icon size={18} />
							<Text ml={1} fontWeight={500}>
								Steam
							</Text>
						</Flex>
					</Link>
				))}
			</HStack>
		</HomeCard>
	);
}
