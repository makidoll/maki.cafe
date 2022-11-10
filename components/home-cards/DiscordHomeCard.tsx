import {
	Box,
	Center,
	chakra,
	Flex,
	Heading,
	HStack,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdHelp } from "react-icons/md";
import { config } from "../../utils/config";
import { useLanyard } from "../../hooks/UseLanyard";
import DancingLetters from "../ui/DancingLetters";
import DiscordUserImage from "../ui/DiscordUserImage";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardFooterLink from "../ui/home-card/HomeCardFooterLink";
import HomeCardLoading from "../ui/home-card/HomeCardLoading";
import { SpotifyIcon } from "../ui/social-icons/SpotifyIcon";
import SubHeading from "../ui/SubHeading";
import styles from "./DiscordHomeCard.module.scss";

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

	if (data == null) {
		return (
			<HomeCard>
				<HomeCardLoading />
			</HomeCard>
		);
	}

	const spotify = (
		<VStack
			backgroundColor={song == null ? "rgba(0,0,0,0.5)" : "#1db954"}
			color="white"
			padding={2}
			borderRadius={12}
			spacing={1}
			mt={4}
		>
			<HStack>
				{song == null ? (
					<Center
						width={16}
						height={16}
						borderRadius={6}
						background="rgba(255, 255, 255, 0.5)"
					>
						<Text fontSize="32px" color="rgba(255, 255, 255, 0.5)">
							#!
						</Text>
					</Center>
				) : (
					<Image
						src={song.album_art_url}
						alt={song.album}
						width={16}
						height={16}
						borderRadius={6}
						className={
							song == null ? "" : styles["animate-album-image"]
						}
					/>
				)}
				<Flex
					flexDir="column"
					width="225px"
					maxWidth="225px"
					whiteSpace="nowrap"
					overflow="hidden"
				>
					<HStack opacity={0.6} spacing={1} pb={0.5}>
						{song == null ? (
							<MdHelp color="#fff" size={14} />
						) : (
							<SpotifyIcon color="#fff" size={12} />
						)}
						<SubHeading size={"xs"} fontWeight={500}>
							{song == null ? "No player" : "Spotify"}
						</SubHeading>
					</HStack>
					<SubHeading size={"sm"}>
						{song == null ? (
							"Not listening"
						) : (
							<DancingLetters>{song.song}</DancingLetters>
						)}
					</SubHeading>
					<SubHeading size={"sm"} fontWeight={400}>
						{song == null ? "to anything" : "by " + song.artist}
					</SubHeading>
				</Flex>
			</HStack>
			{song == null || songTime == null ? (
				<></>
			) : (
				<HStack
					width="100%"
					spacing={0}
					style={{ marginBottom: "-3px" }}
				>
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
			)}
		</VStack>
	);

	return (
		<HomeCard>
			<HStack>
				<Link href={config.socialLinks.discord} color="#000">
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
							<SubHeading fontSize={"1.5em"}>
								{data.discord_user.username}
							</SubHeading>
							<SubHeading
								opacity={0.6}
								fontSize={"1em"}
								fontWeight={600}
							>
								#{data.discord_user.discriminator}
							</SubHeading>
						</VStack>
					</HStack>
				</Link>
				<SubHeading
					opacity={0.4}
					fontWeight={200}
					flex={1}
					textAlign={"center"}
					fontSize="3xl"
				>
					{data.discord_status}
				</SubHeading>
			</HStack>
			{spotify}
			<HomeCardFooterLink href="https://github.com/Phineas/lanyard">
				Powered by Lanyard
			</HomeCardFooterLink>
		</HomeCard>
	);
}
