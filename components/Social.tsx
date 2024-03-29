import {
	Box,
	Button,
	Code,
	Flex,
	HStack,
	Heading,
	Link,
	Modal,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	VStack,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaArrowRight, FaTwitch } from "react-icons/fa";
import { config } from "../utils/config";
import { colorMix, lerp } from "../utils/utils";
import rainbowShaderGif from "./assets/rainbow-shader.gif";
import Emoji from "./ui/Emoji";
import SubHeading from "./ui/SubHeading";
import { ElementIcon } from "./ui/social-icons/ElementIcon";
import { GitHubIcon } from "./ui/social-icons/GitHubIcon";
import { KofiIcon } from "./ui/social-icons/KofiIcon";
import { MastodonIcon } from "./ui/social-icons/MastodonIcon";
import { PronounsPageIcon } from "./ui/social-icons/PronounsPageIcon";
import { SteamIcon } from "./ui/social-icons/SteamIcon";
import { XmppIcon } from "./ui/social-icons/XmppIcon";
import { useState } from "react";
import { chakra } from "@chakra-ui/react";
import { SecondLifeIcon } from "./ui/social-icons/SecondLifeIcon";

interface Popup {
	title: string;
	username: string;
	uri: string;
}

interface Social {
	icon: IconType;
	href?: string;
	name: string;
	color: string;
	small: boolean;
	rel?: string;
	rainbow?: boolean;
	iconSize?: number;
	openPopup?: Popup;
}

export default function Social() {
	const toast = useToast();

	const [popupInfo, setPopupInfo] = useState<Popup>();
	const {
		isOpen: popupIsOpen,
		onOpen: popupOnOpen,
		onClose: popupOnClose,
	} = useDisclosure();

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
				iconSize: 26,
			},
		],
		[
			{
				icon: SecondLifeIcon,
				name: "Second Life",
				color: "#00bfff",
				small: true,
				openPopup: {
					title: "Second Life",
					username: config.socialIds.secondLifeName,
					uri: config.socialLinks.secondLife,
				},
			},
			{
				icon: XmppIcon,
				name: "XMPP",
				color: "#227ee1", // e96d1f or d9541e
				small: true,
				openPopup: {
					title: "XMPP",
					username: config.socialIds.xmpp,
					uri: "xmpp:" + config.socialIds.xmpp,
				},
			},
			{
				icon: ElementIcon,
				href: config.socialLinks.matrix,
				name: "Matrix",
				color: "#0dbd8b", // element color
				small: true,
			},
		],
		[
			{
				icon: FaTwitch,
				href: config.socialLinks.twitch,
				name: "Twitch",
				color: "#9146ff",
				small: true,
			},

			{
				icon: SteamIcon,
				href: config.socialLinks.steam,
				name: "Steam",
				color: "#333",
				small: true,
			},
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
		<HStack key={"social-row-" + i} spacing={socialsSpacing}>
			{row.map((social, i) => (
				<Button
					key={"social-button-" + i}
					{...(social.openPopup
						? {
								as: "button",
								onClick: () => {
									setPopupInfo(social.openPopup);
									popupOnOpen();
								},
						  }
						: {
								as: "a",
								href: social.href,
						  })}
					size={social.small ? "sm" : "md"}
					opacity={1}
					leftIcon={
						<social.icon
							color={"#fff"}
							size={social.iconSize ?? (social.small ? 16 : 18)}
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
									size={
										social.iconSize ??
										(social.small ? 16 : 18)
									}
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

	const tertiaryFontWeight = 700;
	const tertiaryLetterSpacing = -1.0;
	const tertiaryTextOpacity = 0.4;

	return (
		<>
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
						cute game dev pony doll
					</SubHeading>
					<Emoji size={24} custom="cyber-heart"></Emoji>
					{/* <SubHeading
						opacity={lerp(
							primaryTextOpacity,
							secondaryTextOpacity,
							0.5,
						)}
						fontWeight={primaryFontWeight}
						fontSize="md"
						letterSpacing={primaryLetterSpacing + 0.25}
					>
						she/they/it
					</SubHeading>
					<Emoji size={24} custom="trans-heart"></Emoji> */}
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
					<HStack spacing={0.5} mt={0.5}>
						<Emoji size={20} font="noto">
							🦄
						</Emoji>
						<Text
							opacity={secondaryTextOpacity}
							fontWeight={secondaryFontWeight}
							fontSize="xl"
							px={1}
							letterSpacing={secondaryLetterSpacing}
						>
							neurodivergent sensitive
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
							🐸
						</Emoji>
					</HStack>
					<HStack spacing={0.5} mt={3}>
						<Emoji size={18} custom="trans-heart"></Emoji>
						<Text
							opacity={tertiaryTextOpacity}
							fontWeight={tertiaryFontWeight}
							fontSize="lg"
							px={1}
							letterSpacing={tertiaryLetterSpacing}
						>
							she/they/it
						</Text>
						<Emoji size={18} font="noto">
							🐿️
						</Emoji>
						<Text
							opacity={tertiaryTextOpacity}
							fontWeight={tertiaryFontWeight}
							fontSize="lg"
							px={1}
							letterSpacing={tertiaryLetterSpacing}
						>
							hrt since 2018
						</Text>
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
							<Text
								fontWeight={secondaryFontWeight}
								fontSize="md"
							>
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
			<Modal
				isOpen={popupIsOpen && popupInfo != null}
				onClose={popupOnClose}
				isCentered
				colorScheme="brand"
			>
				<ModalOverlay background={"rgba(17,17,17,0.7)"} />
				<ModalContent
					background={"#222"}
					width={"fit-content"}
					borderRadius={16}
				>
					<ModalHeader
						my={1.5}
						display={"flex"}
						flexDir={"column"}
						alignItems={"center"}
						gap={1}
					>
						<Heading size={"md"} fontWeight={800} mb={2}>
							{popupInfo?.title}
							{/* <chakra.span fontWeight={700}>add at</chakra.span> */}
						</Heading>
						<HStack spacing={3}>
							{/* <Heading size={"md"}>Add me</Heading> */}
							<Code
								px={1.5}
								py={0.5}
								borderRadius={4}
								onClick={e => {
									const el = e.target as HTMLElement;
									const range = document.createRange();
									range.selectNodeContents(el);

									const selection = window.getSelection();
									selection?.removeAllRanges();
									selection?.addRange(range);

									navigator.clipboard.writeText(
										el.textContent ?? "",
									);

									toast({
										title: "Copied to clipboard",
										position: "bottom-left",
										status: "info",
										variant: "subtle",
										duration: 1200,
										isClosable: false,
									});
								}}
								fontFamily={"var(--chakra-fonts-monospace)"}
							>
								{popupInfo?.username}
							</Code>
						</HStack>
						<Button
							as="a"
							href={popupInfo?.uri}
							onClick={popupOnClose}
							background={"brand.500"}
							size={"sm"}
							mt={4}
							_hover={{
								background: "brand.400",
							}}
							_active={{
								background: "brand.300",
							}}
							fontWeight={700}
						>
							Open using client
						</Button>
					</ModalHeader>
					{/* <ModalCloseButton /> */}
					{/* <ModalBody>
						<Code px={1.5}>{config.socialIds.xmpp}</Code>
					</ModalBody> */}
					{/* <ModalFooter mt={-2}>
						<Button
							as="a"
							href={"xmpp:" + config.socialIds.xmpp}
							onClick={xmppOnClose}
							background={"brand.500"}
							_hover={{
								background: "brand.400",
							}}
							_active={{
								background: "brand.300",
							}}
						>
							Open using client
						</Button>
					</ModalFooter> */}
				</ModalContent>
			</Modal>
		</>
	);
}
