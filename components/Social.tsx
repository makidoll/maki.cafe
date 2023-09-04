import { Flex, HStack, Link, Text } from "@chakra-ui/react";
// import { minecraft } from "../fonts/fonts";
import { config } from "../utils/config";
import Emoji from "./ui/Emoji";
import SubHeading from "./ui/SubHeading";
import { DiscordIcon } from "./ui/social-icons/DiscordIcon";
import { ElementAltIcon } from "./ui/social-icons/ElementAltIcon";
import { GitHubIcon } from "./ui/social-icons/GitHubIcon";
import { MastodonIcon } from "./ui/social-icons/MastodonIcon";
import { SketchfabIcon } from "./ui/social-icons/SketchfabIcon";
import { SteamIcon } from "./ui/social-icons/SteamIcon";

export default function Social() {
	var socials = [
		{
			icon: DiscordIcon,
			href: config.socialLinks.discord,
			name: "Discord",
		},
		{
			icon: GitHubIcon,
			href: config.socialLinks.github,
			name: "GitHub",
		},
		{
			icon: SteamIcon,
			href: config.socialLinks.steam,
			name: "Steam",
		},
		{
			icon: MastodonIcon,
			href: config.socialLinks.mastodon,
			name: "Mastodon",
		},
		{
			icon: ElementAltIcon,
			href: config.socialLinks.matrix,
			name: "Element",
		},
	];

	return (
		<Flex flexDir="column" alignItems="center" justifyContent="center">
			<HStack spacing={1}>
				{/* <Emoji>🌺</Emoji>
				<Emoji>🦊</Emoji>
				<Emoji>🦋</Emoji> */}
				{/* <Emoji>🦊</Emoji> */}
				{/* <Emoji>🍃</Emoji> */}
				<Emoji>✨</Emoji>
				<SubHeading
					opacity={0.5}
					fontWeight={600}
					fontSize="2xl"
					pl={1.5}
					pr={1.5}
				>
					{/* game dev fox girl */}
					shiny rubber drone doll
				</SubHeading>
				<SubHeading
					opacity={0.4}
					fontWeight={700}
					fontSize="md"
					pr={1.5}
				>
					it/she/they
				</SubHeading>
				<Emoji>🏳️‍⚧️</Emoji>
				{/* <Emoji>lesbian-flag</Emoji> */}
				{/* <Emoji>t4t-flag-better</Emoji> */}
			</HStack>
			<HStack spacing={1}>
				<Emoji size={16}>🎮</Emoji>
				<Text
					opacity={0.3}
					fontWeight={600}
					fontSize="xl"
					pl={1}
					letterSpacing={-1}
				>
					play and make video games
				</Text>
			</HStack>
			{/* <Link
				href="https://xn--3h8h64hda.ws"
				transformOrigin="center"
				transition={config.styles.hoverTransition}
				_hover={{ transform: "scale(1.05)" }}
				fontSize="xs"
				fontFamily={minecraft.style.fontFamily}
				marginTop={1}
				color="#fff"
			>
				<HStack spacing={0.5} justifyContent="center">
					<Text opacity={0.3}>now available at www.</Text>
					<Emoji size={14} opacity={0.6}>
						🌺
					</Emoji>
					<Emoji size={14} opacity={0.6}>
						🦊
					</Emoji>
					<Emoji size={14} opacity={0.6}>
						🦋
					</Emoji>
					<Text opacity={0.3}>.ws!</Text>
				</HStack>
			</Link> */}
			<HStack spacing={2} opacity={0.3} marginTop={8}>
				{socials.map((social, i) => (
					<Link
						key={i}
						href={social.href}
						aria-label={social.name}
						transition={config.styles.hoverTransition}
						transformOrigin="center"
						_hover={{ transform: "scale(1.1)" }}
						rel="me"
					>
						<social.icon width={"auto"} height={24} color="#fff" />
					</Link>
				))}
			</HStack>
			<Link
				href={config.socialLinks.github + "/makidrone.io"}
				transformOrigin="center"
				transition={config.styles.hoverTransition}
				_hover={{ transform: "scale(1.05)" }}
				marginTop={8}
				color="#fff"
			>
				<HStack spacing={2} opacity={0.2}>
					<GitHubIcon size={16} color="#fff" />
					<Text fontWeight={700}>See site&apos;s code</Text>
				</HStack>
			</Link>
		</Flex>
	);
}
