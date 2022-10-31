import {
	Box,
	Flex,
	Heading,
	HStack,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import { config } from "../../config/config";
import { useLanyard } from "../../hooks/UseLanyard";
import DiscordUserImage from "../ui/DiscordUserImage";
import HomeCard from "../ui/HomeCard";
import { chakra } from "@chakra-ui/react";
import { SpotifyIcon } from "../ui/social-icons/SpotifyIcon";

const clamp = (n: number, min: number, max: number) =>
	Math.min(Math.max(n, min), max);

const msToTime = (ms: number) => {
	let s = Math.floor(ms / 1000);
	const m = Math.floor(s / 60);
	s -= m * 60;
	return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
};

export default function DiscordHomeCard() {
	const { data, song, songTime } = useLanyard(config.socialIds.discord);

	if (data == null) return <HomeCard>loading</HomeCard>;

	const spotify =
		song == null ? (
			<></>
		) : (
			<VStack
				backgroundColor={"#1db954"}
				color="white"
				padding={2}
				paddingBottom={1}
				borderRadius={12}
				spacing={1}
				mt={4}
			>
				<HStack>
					<Image
						src={song.album_art_url}
						alt={song.album}
						width={16}
						height={16}
						borderRadius={6}
					/>
					<Flex
						flexDir="column"
						width="225px"
						maxWidth="225px"
						whiteSpace="nowrap"
						overflow="hidden"
					>
						<HStack opacity={0.6} spacing={1}>
							<SpotifyIcon color="#fff" size={12} />
							<Heading size={"xs"} fontWeight={500} pb={0.5}>
								Spotify
							</Heading>
						</HStack>
						<Heading size={"sm"}>{song.song}</Heading>
						<Heading size={"sm"} fontWeight={400}>
							by {song.artist}
						</Heading>
					</Flex>
				</HStack>
				<HStack width="100%" spacing={0}>
					<Text fontSize="13px" width="42px" overflow={"hidden"}>
						{msToTime(songTime.current)}
					</Text>
					<Box
						flexGrow={1}
						background="rgba(255, 255, 255, 0.4)"
						height="6px"
						borderRadius={999}
						overflow="hidden"
					>
						<Box
							height="100%"
							style={{
								width:
									clamp(
										songTime.current / songTime.length,
										0,
										1,
									) *
										100 +
									"%",
							}}
							background="white"
							borderTopRightRadius={999}
							borderBottomRightRadius={999}
						></Box>
					</Box>
					<Text
						fontSize="13px"
						width="42px"
						overflow={"hidden"}
						textAlign="right"
					>
						{msToTime(songTime.length)}
					</Text>
				</HStack>
			</VStack>
		);

	const component = (
		<>
			<HStack>
				<chakra.a href={config.socialLinks.discord}>
					<HStack>
						<DiscordUserImage
							size={48}
							url={
								"https://cdn.discordapp.com/avatars/" +
								config.socialIds.discord +
								"/" +
								data?.discord_user.avatar +
								".webp?size=128"
							}
							status={data?.discord_status}
							mobile={data?.active_on_discord_mobile}
						/>
						<VStack paddingLeft={2} spacing={-1}>
							<Heading fontSize={"1.5em"}>
								{data.discord_user.username}
							</Heading>
							<Heading
								opacity={0.6}
								fontSize={"1em"}
								fontWeight={600}
							>
								#{data.discord_user.discriminator}
							</Heading>
						</VStack>
					</HStack>
				</chakra.a>
				<Heading
					opacity={0.4}
					fontWeight={200}
					flex={1}
					textAlign={"center"}
					fontSize="3xl"
				>
					{data.discord_status}
				</Heading>
			</HStack>
			{spotify}
		</>
	);

	return <HomeCard>{component}</HomeCard>;
}
