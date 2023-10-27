import { Button, Flex, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaArrowRight, FaCode } from "react-icons/fa";
import { config } from "../utils/config";
import { colorMix } from "../utils/utils";
import Emoji from "./ui/Emoji";
import SubHeading from "./ui/SubHeading";
import { DiscordIcon } from "./ui/social-icons/DiscordIcon";
import { ElementAltIcon } from "./ui/social-icons/ElementAltIcon";
import { GitHubIcon } from "./ui/social-icons/GitHubIcon";
import { MastodonIcon } from "./ui/social-icons/MastodonIcon";
import { PronounsPageIcon } from "./ui/social-icons/PronounsPageIcon";
import { SteamIcon } from "./ui/social-icons/SteamIcon";
import { TwitterIcon } from "./ui/social-icons/TwitterIcon";

interface Social {
	icon: IconType;
	href: string;
	name: string;
	color: string;
	small: boolean;
	rel?: string;
}

export default function Social() {
	const socialsSpacing = 3;
	const socialsRows: Social[][] = [
		[
			{
				icon: MastodonIcon,
				href: config.socialLinks.mastodon,
				name: "Mastodon",
				color: "#6364FF",
				small: false,
				rel: "me",
			},
			// {
			// 	icon: TwitterIcon,
			// 	href: config.socialLinks.twitter,
			// 	name: "Twitter",
			// 	color: "#1DA1F2",
			// 	small: false,
			// },
			{
				icon: GitHubIcon,
				href: config.socialLinks.github,
				name: "GitHub",
				color: "#333",
				small: false,
			},
		],
		[
			{
				icon: PronounsPageIcon,
				href: config.socialLinks.pronounsPage,
				name: "Pronouns",
				color: "#e91e63", // original #ff95bb
				small: true,
			},
			// {
			// 	icon: DiscordIcon,
			// 	href: config.socialLinks.discord,
			// 	name: "Discord",
			// 	color: "#5865F2",
			// 	small: true,
			// },
			{
				icon: ElementAltIcon,
				href: config.socialLinks.matrix,
				name: "Element",
				color: "#0dbd8b",
				small: true,
			},
			{
				icon: SteamIcon,
				href: config.socialLinks.steam,
				name: "Steam",
				color: "#333",
				small: true,
			},
			// {
			// 	icon: SoundCloudIcon,
			// 	href: config.socialLinks.soundcloud,
			// 	name: "SoundCloud",
			// 	color: "#ff7700",
			// 	small: true,
			// },
		],
	];

	const SocialsRows = socialsRows.map((row, i) => (
		<HStack key={i} spacing={socialsSpacing}>
			{row.map((social, i) => (
				<Button
					as={"a"}
					href={social.href}
					size={social.small ? "sm" : "md"}
					key={i}
					opacity={1}
					leftIcon={
						<social.icon
							color={"#fff"}
							size={social.small ? 16 : 18}
						/>
					}
					color={"#fff"}
					background={social.color}
					_hover={{
						background: colorMix(social.color, "#ffffff", 0.2),
						opacity: 1,
					}}
					rel={social.rel}
				>
					{social.name}
				</Button>
			))}
		</HStack>
	));

	const subTextOpacity = 0.5;
	const fontWeight = 600;

	return (
		<Flex flexDir="column" alignItems="center" justifyContent="center">
			<HStack spacing={2}>
				<Emoji size={24} font="twemoji" mr={-0.5}>
					✨
				</Emoji>
				{/* <Emoji size={24} custom="pleading-hypno"></Emoji> */}
				<SubHeading
					opacity={0.7}
					fontWeight={fontWeight}
					fontSize="2xl"
				>
					cute shiny latex doll
				</SubHeading>
				<Emoji size={24} custom="cyber-heart"></Emoji>
				<SubHeading
					opacity={0.5}
					fontWeight={fontWeight + 100}
					fontSize="md"
				>
					she/they/it
				</SubHeading>
				<Emoji size={24} custom="trans-heart"></Emoji>
				{/* <Emoji size={24} custom="blahaj-trans"></Emoji> */}
			</HStack>
			<VStack spacing={0} mt={3}>
				<HStack spacing={1}>
					<Emoji size={24} custom="shaderlab"></Emoji>
					<Text
						opacity={subTextOpacity}
						fontWeight={fontWeight}
						fontSize="xl"
						pl={1}
						letterSpacing={-1}
					>
						play and make video games
					</Text>
				</HStack>
				<HStack spacing={1}>
					<Emoji size={24} font="noto">
						👩‍💻
					</Emoji>
					<Text
						opacity={subTextOpacity}
						fontWeight={fontWeight}
						fontSize="xl"
						pl={1}
						letterSpacing={-1}
					>
						programming and running servers
					</Text>
				</HStack>
				<HStack spacing={1}>
					<Emoji size={24} font="noto">
						🦊
					</Emoji>
					<Text
						opacity={subTextOpacity}
						fontWeight={fontWeight}
						fontSize="xl"
						px={1}
						letterSpacing={-1}
					>
						sensitive
					</Text>
					<Emoji size={24} font="noto">
						🐸
					</Emoji>
					<Text
						opacity={subTextOpacity}
						fontWeight={fontWeight}
						fontSize="xl"
						px={1}
						letterSpacing={-1}
					>
						neurospicy
					</Text>
					<Emoji size={24} font="noto">
						🦐
					</Emoji>
					<Text
						opacity={subTextOpacity}
						fontWeight={fontWeight}
						fontSize="xl"
						px={1}
						letterSpacing={-1}
					>
						mess
					</Text>
					<Emoji size={24} font="noto">
						🐍
					</Emoji>
					{/* TODO: missing squirrel */}
				</HStack>
			</VStack>
			<VStack mt={6} spacing={socialsSpacing}>
				{SocialsRows}
			</VStack>
			<VStack spacing={1} mt={6}>
				<HStack spacing={0}>
					<Emoji
						size={24}
						custom="arch-linux"
						opacity={subTextOpacity + 0.1}
					></Emoji>
					<Link
						opacity={subTextOpacity - 0.1}
						fontWeight={fontWeight}
						fontSize="lg"
						px={1}
						letterSpacing={-1}
						fontStyle={"italic"}
						href={config.socialLinks.github + "/dots"}
						color="white"
					>
						i use arch btw lmao
					</Link>
				</HStack>
				<Link
					href={config.socialLinks.github + "/makidoll.io"}
					transformOrigin="center"
					transition={config.styles.hoverTransition}
					_hover={{ transform: "scale(1.05)" }}
					color="#fff"
				>
					<HStack spacing={1.5} opacity={0.25}>
						<Text fontWeight={fontWeight} fontSize="md">
							see site&apos;s code
						</Text>
						<FaArrowRight
							size={16}
							color="#fff"
							style={{ marginBottom: "0px" }}
						/>
					</HStack>
				</Link>
			</VStack>
		</Flex>
	);
}
