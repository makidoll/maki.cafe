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
import { useState } from "react";
import { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { config } from "../utils/config";
import { colorMix, lerp } from "../utils/utils";
import rainbowShaderGif from "./assets/rainbow-shader.gif";
import Emoji from "./ui/Emoji";
import SubHeading from "./ui/SubHeading";
import { ArchLinuxIcon } from "./ui/social-icons/ArchLinuxIcon";
import { DiscordIcon } from "./ui/social-icons/DiscordIcon";
import { ElementIcon } from "./ui/social-icons/ElementIcon";
import { GitHubIcon } from "./ui/social-icons/GitHubIcon";
import { KofiIcon } from "./ui/social-icons/KofiIcon";
import { MastodonIcon } from "./ui/social-icons/MastodonIcon";
import { SecondLifeIcon } from "./ui/social-icons/SecondLifeIcon";
import { SteamIcon } from "./ui/social-icons/SteamIcon";
import { XmppIcon } from "./ui/social-icons/XmppIcon";

interface Popup {
	title: string;
	text: string;
	href: string;
	buttonText?: string;
	fontSize?: string;
	openWithJs?: boolean;
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
	openWithJs?: boolean;
}

export default function Social() {
	const toast = useToast();

	const [popupInfo, setPopupInfo] = useState<Popup>();
	const {
		isOpen: popupIsOpen,
		onOpen: popupOnOpen,
		onClose: popupOnClose,
	} = useDisclosure();

	// {
	// 	icon: TwitterIcon,
	// 	href: config.socialLinks.twitter,
	// 	name: "Twitter",
	// 	color: "#1DA1F2",
	// 	small: false,
	// }
	// {
	// 	icon: FaTwitch,
	// 	href: config.socialLinks.twitch,
	// 	name: "Twitch",
	// 	color: "#9146ff",
	// 	small: true,
	// },
	// {
	// 	icon: PronounsPageIcon,
	// 	href: config.socialLinks.pronounsPage,
	// 	name: "Pronouns",
	// 	color: "#e91e63", // original #ff95bb
	// 	small: true,
	// },
	// {
	// 	icon: MdLock,
	// 	name: "PGP",
	// 	color: "#222",
	// 	small: true,
	// 	openPopup: {
	// 		title: "Maki's Public Key",
	// 		text: config.pgpPublicKey,
	// 		href: "/BD9158A9ED0A2BE89CCEA2C362B5572AEF805F9A.asc",
	// 		buttonText: "Get .asc file",
	// 		fontSize: "0.5em",
	// 	},
	// },
	// {
	// 	icon: KofiIcon,
	// 	href: config.socialLinks.kofi,
	// 	name: "Support me",
	// 	color: "#13C3FF",
	// 	small: true,
	// 	rainbow: true,
	// 	iconSize: 26,
	// },
	// {
	// 	icon: SoundCloudIcon,
	// 	href: config.socialLinks.soundcloud,
	// 	name: "SoundCloud",
	// 	color: "#ff7700",
	// 	small: true,
	// },

	const socialsSpacing = 2;
	const socialsRows: Social[][] = [
		[
			{
				icon: GitHubIcon,
				href: config.socialLinks.github,
				name: "GitHub",
				color: "#333",
				small: true,
			},
			{
				icon: MastodonIcon,
				href: config.socialLinks.mastodon,
				name: "Mastodon",
				color: "#6364FF",
				small: true,
				rel: "me",
			},
		],
		[
			{
				icon: XmppIcon,
				name: "XMPP",
				color: "#227ee1", // e96d1f or d9541e
				small: true,
				openPopup: {
					title: "XMPP",
					text: config.socialIds.xmpp,
					href: "xmpp:" + config.socialIds.xmpp,
				},
			},
			{
				icon: ElementIcon,
				href: config.socialLinks.matrix,
				name: "Matrix",
				color: "#0dbd8b", // element color
				small: true,
			},
			{
				icon: SecondLifeIcon,
				name: "Second Life",
				color: "#00bfff",
				small: true,
				openPopup: {
					title: "Second Life",
					text: config.socialIds.secondLifeName,
					href: config.socialLinks.secondLife,
				},
			},
		],
		[
			{
				icon: DiscordIcon,
				href: config.socialLinks.discord,
				name: "Discord",
				color: "#5865F2",
				small: true,
			},
			{
				icon: SteamIcon,
				href: config.socialLinks.steam,
				name: "Steam",
				color: "#222",
				small: true,
			},
			{
				icon: MdEmail,
				name: "Email",
				color: "#222",
				small: true,
				openPopup: {
					title: "Email",
					text: config.socialIds.email,
					href: config.socialLinks.email,
				},
			},
		],
	];

	const SocialsRows = socialsRows.map((row, i) => (
		<HStack key={"social-row-" + i} spacing={socialsSpacing}>
			{row.map((social, i) => (
				<Button
					key={"social-button-" + i}
					{...(social.openPopup || social.openWithJs
						? {
								as: "button",
								onClick: () => {
									if (social.openPopup) {
										setPopupInfo(social.openPopup);
										popupOnOpen();
									} else if (social.openWithJs) {
										window.open(social.href, "_self");
									}
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
						background: colorMix(social.color, "#ffffff", 0.1),
						opacity: 1,
						transform: "scale(1.05)",
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

	// const primaryFontWeight = 800;
	// const primaryLetterSpacing = -1.0;
	// const primaryTextOpacity = 0.8;

	const secondaryFontWeight = 600;
	const secondaryLetterSpacing = -1.0;
	const secondaryTextOpacity = 0.7;

	// const tertiaryFontWeight = 600;
	// const tertiaryLetterSpacing = -1.0;
	const tertiaryTextOpacity = 0.5;

	return (
		<>
			<Flex flexDir="column" alignItems="center" justifyContent="center">
				{/* <HStack spacing={2}>
					<Emoji size={24} font="noto" mr={-0.5}>
						🎀
					</Emoji>
					<Emoji size={24} font="twemoji" mr={-0.5}>
						✨
					</Emoji>
					<SubHeading
						opacity={primaryTextOpacity}
						fontWeight={primaryFontWeight}
						fontSize="2xl"
						letterSpacing={primaryLetterSpacing}
					>
						shy mare
					</SubHeading>
					<Emoji size={24} custom="cyber-heart"></Emoji>
				</HStack> */}
				<VStack spacing={0} mt={-2}>
					{/* <HStack spacing={1}>
						<Emoji size={24} font="noto">
							🌱
						</Emoji>
						<Text
							opacity={secondaryTextOpacity}
							fontWeight={secondaryFontWeight}
							fontSize="xl"
							pl={1}
							letterSpacing={secondaryLetterSpacing}
						>
							creator of virtual worlds
						</Text>
					</HStack> */}
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
						<Emoji size={24} custom="codium"></Emoji>
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
					{/* <Text
						opacity={tertiaryTextOpacity}
						fontWeight={secondaryFontWeight}
						fontSize="md"
						mt={6}
						letterSpacing={secondaryLetterSpacing}
					>
						idk i just kinda exist. yay look cute aminals
					</Text> */}
					<HStack spacing={0.5} mt={2}>
						{[
							"🦄",
							"🦐",
							"🦞",
							"🦊",
							// "🐤",
							"🐝",
							"🐍",
							"🐸",
							"🐦",
							"🐟",
							"🐿️",
							"🦆",
							"🪱",
							// "🦋",
							// "🐓",
						].map((emoji, i) => (
							<Emoji
								key={i}
								size={24}
								font="noto"
								opacity={0.8}
								transition={"all .1s ease-in-out"}
								_hover={{
									opacity: 1,
									transform: "translateY(-2px)",
								}}
							>
								{emoji}
							</Emoji>
						))}
					</HStack>
					{/* <HStack spacing={0.5} mt={0.5}>
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
							neurodivergent/sensitive
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
					{/* <HStack spacing={0.5} mt={3}>
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
						<Emoji size={18} fonst="noto">
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
					</HStack> */}
				</VStack>
				<VStack mt={10} spacing={socialsSpacing}>
					{SocialsRows}
				</VStack>
				<VStack spacing={0} mt={8}>
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
								<ArchLinuxIcon
									size={24}
									fill="#1793d1"
									opacity={tertiaryTextOpacity + 0.1}
								/>
								<Text opacity={tertiaryTextOpacity}>
									i use arch btw lmao
								</Text>
								<FaArrowRight
									opacity={tertiaryTextOpacity}
									size={14}
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
								size={14}
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
					maxWidth={"fit-content"}
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
							{popupInfo?.title.toLowerCase()}
							{/* <chakra.span fontWeight={700}>add at</chakra.span> */}
						</Heading>
						<HStack spacing={3}>
							{/* <Heading size={"md"}>Add me</Heading> */}
							<Code
								px={1.5}
								py={0.5}
								borderRadius={4}
								whiteSpace={"pre-line"}
								fontSize={popupInfo?.fontSize}
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

									selection.removeAllRanges();

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
								{popupInfo?.text}
							</Code>
						</HStack>
						<Button
							as="a"
							href={popupInfo?.href}
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
							{popupInfo?.buttonText ?? "open using client"}
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
