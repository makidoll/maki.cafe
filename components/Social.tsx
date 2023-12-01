import {
	Box,
	Button,
	Flex,
	HStack,
	Link,
	Text,
	VStack,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa";
import { config } from "../utils/config";
import { colorMix, lerp } from "../utils/utils";
import rainbowShaderGif from "./assets/rainbow-shader.gif";
import Emoji from "./ui/Emoji";
import SubHeading from "./ui/SubHeading";
import { ElementAltIcon } from "./ui/social-icons/ElementAltIcon";
import { GitHubIcon } from "./ui/social-icons/GitHubIcon";
import { KofiIcon } from "./ui/social-icons/KofiIcon";
import { MastodonIcon } from "./ui/social-icons/MastodonIcon";
import { PronounsPageIcon } from "./ui/social-icons/PronounsPageIcon";
import { SteamIcon } from "./ui/social-icons/SteamIcon";

interface Social {
	icon: IconType;
	href: string;
	name: string;
	color: string;
	small: boolean;
	rel?: string;
	rainbow?: boolean;
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
			{
				icon: KofiIcon,
				href: config.socialLinks.kofi,
				name: "Support me",
				color: "#13C3FF",
				small: false,
				rainbow: true,
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
					position={"relative"}
					overflow={social.rainbow ? "hidden" : "auto"}
					fontWeight={800}
				>
					{social.rainbow ? (
						<>
							<Box
								position={"absolute"}
								top={0}
								bottom={0}
								left={0}
								right={0}
								margin={"auto"}
								opacity={1}
								backgroundSize={"cover"}
								backgroundImage={`url(${rainbowShaderGif.src})`}
								style={{
									imageRendering: "pixelated",
								}}
							></Box>
							<Box
								position={"absolute"}
								top={0}
								bottom={0}
								left={0}
								right={0}
								margin={"auto"}
								opacity={1}
								display={"flex"}
								alignItems={"center"}
								justifyContent={"center"}
								backgroundColor={"rgba(20,20,20,0.3)"}
								_hover={{
									backgroundColor: "rgba(20,20,20,0.15)",
								}}
								transitionProperty={
									"var(--chakra-transition-property-common)"
								}
								transitionDuration={
									"var(--chakra-transition-duration-normal)"
								}
							>
								<social.icon
									color={"#fff"}
									size={social.small ? 16 : 18}
									style={{ marginRight: "8px" }}
								/>
								{social.name.toLowerCase()}
							</Box>
						</>
					) : (
						<></>
					)}
					{social.name.toLowerCase()}
				</Button>
			))}
		</HStack>
	));

	const primaryFontWeight = 900;
	const primaryLetterSpacing = -1.0;
	const primaryTextOpacity = 0.7;

	const secondaryFontWeight = 700;
	const secondaryLetterSpacing = -1.0;
	const secondaryTextOpacity = 0.6;

	return (
		<Flex flexDir="column" alignItems="center" justifyContent="center">
			<HStack spacing={2}>
				<Emoji size={24} font="twemoji" mr={-0.5}>
					🎀
				</Emoji>
				<Emoji size={24} font="twemoji" mr={-0.5}>
					✨
				</Emoji>
				{/* <Emoji size={24} custom="pleading-hypno"></Emoji> */}
				<SubHeading
					opacity={primaryTextOpacity}
					fontWeight={primaryFontWeight}
					fontSize="2xl"
					letterSpacing={primaryLetterSpacing}
				>
					cute game dev doll
				</SubHeading>
				<Emoji size={24} custom="cyber-heart"></Emoji>
				<SubHeading
					opacity={lerp(
						primaryTextOpacity,
						secondaryTextOpacity,
						0.5,
					)}
					fontWeight={primaryFontWeight}
					fontSize="md"
					letterSpacing={primaryLetterSpacing + 0.25}
				>
					she/they
				</SubHeading>
				<Emoji size={24} custom="trans-heart"></Emoji>
				{/* <Emoji size={24} custom="blahaj-trans"></Emoji> */}
			</HStack>
			<VStack spacing={0} mt={3}>
				<HStack spacing={1}>
					<Emoji size={24} custom="shaderlab"></Emoji>
					<Text
						opacity={secondaryTextOpacity}
						fontWeight={secondaryFontWeight}
						fontSize="xl"
						pl={1}
						letterSpacing={secondaryLetterSpacing}
					>
						play and make video games
					</Text>
				</HStack>
				<HStack spacing={1}>
					<Emoji size={24} font="noto">
						👩‍💻
					</Emoji>
					<Text
						opacity={secondaryTextOpacity}
						fontWeight={secondaryFontWeight}
						fontSize="xl"
						pl={1}
						letterSpacing={secondaryLetterSpacing}
					>
						programming and running servers
					</Text>
				</HStack>
				{/* <HStack spacing={0.5} mt={0.5}>
					<Emoji size={20} font="noto">
						🦊
					</Emoji>
					<Text
						opacity={subTextOpacity}
						fontWeight={fontWeight}
						fontSize="lg"
						px={1}
						letterSpacing={letterSpacing}
					>
						sensitive
					</Text>
					<Emoji size={20} font="noto">
						🐸
					</Emoji>
					<Text
						opacity={subTextOpacity}
						fontWeight={fontWeight}
						fontSize="lg"
						px={1}
						letterSpacing={letterSpacing}
					>
						neuro-
					</Text>
					<Emoji size={20} font="noto">
						🦐
					</Emoji>
					<Text
						opacity={subTextOpacity}
						fontWeight={fontWeight}
						fontSize="lg"
						px={1}
						letterSpacing={letterSpacing}
					>
						-spicy
					</Text>
					<Emoji size={20} font="noto">
						🐍
					</Emoji>
					<Text
						opacity={subTextOpacity}
						fontWeight={fontWeight}
						fontSize="lg"
						px={1}
						letterSpacing={letterSpacing}
					>
						mess
					</Text>
					<Emoji size={20} font="noto">
						🐿️
					</Emoji>
				</HStack> */}
				<HStack spacing={0.5} mt={0.5}>
					<Emoji size={20} font="noto">
						🐸
					</Emoji>
					<Text
						opacity={secondaryTextOpacity}
						fontWeight={secondaryFontWeight}
						fontSize="xl"
						px={1}
						letterSpacing={secondaryLetterSpacing}
					>
						autistic and highly sensitive
					</Text>
					<Emoji size={20} font="noto">
						🦐
					</Emoji>
					<Emoji size={20} font="noto">
						🦊
					</Emoji>
					<Emoji size={20} font="noto">
						🐍
					</Emoji>
					<Emoji size={20} font="noto">
						🐿️
					</Emoji>
				</HStack>
			</VStack>
			<VStack mt={6} spacing={socialsSpacing}>
				{SocialsRows}
			</VStack>
			<VStack spacing={1} mt={6}>
				<HStack spacing={0}>
					<Link
						fontWeight={secondaryFontWeight}
						fontSize="lg"
						px={1}
						letterSpacing={secondaryLetterSpacing}
						fontStyle={"italic"}
						href={config.socialLinks.github + "/dots"}
						color="white"
						transition={config.styles.hoverTransition}
						_hover={{ transform: "scale(1.05)" }}
					>
						<HStack spacing={2}>
							<Emoji
								opacity={secondaryTextOpacity + 0.1}
								size={24}
								custom="arch-linux"
							></Emoji>
							<Text opacity={secondaryTextOpacity - 0.1}>
								i use arch btw lmao
							</Text>
							<FaArrowRight
								opacity={secondaryTextOpacity - 0.1}
								size={16}
								color="#fff"
								style={{ marginBottom: "0px" }}
							/>
						</HStack>
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
						<Text fontWeight={secondaryFontWeight} fontSize="md">
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
