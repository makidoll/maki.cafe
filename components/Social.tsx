import { chakra, Flex, HStack, Text } from "@chakra-ui/react";
import Emoji from "./ui/Emoji";
import { DiscordIcon } from "./ui/social-icons/DiscordIcon";
import { ElementAltIcon } from "./ui/social-icons/ElementAltIcon";
import { GitHubIcon } from "./ui/social-icons/GitHubIcon";
import { SteamIcon } from "./ui/social-icons/SteamIcon";

export default function Social() {
	var socials = [
		{
			icon: DiscordIcon,
			href: "https://discord.com/users/72139729285427200",
		},
		{
			icon: GitHubIcon,
			href: "https://github.com/makifoxgirl",
		},
		{
			icon: SteamIcon,
			href: "https://steamcommunity.com/id/makifoxgirl",
		},
		{
			icon: ElementAltIcon,
			href: "https://matrix.to/#/@maki:cutelab.space",
		},
	];

	return (
		<Flex flexDir="column" alignItems="center" justifyContent="center">
			<HStack spacing={1}>
				{/* <Emoji>🌺</Emoji>
				<Emoji>🦊</Emoji>
				<Emoji>🦋</Emoji> */}
				<Emoji>🦊</Emoji>
				<Emoji>🍃</Emoji>
				<Emoji>✨</Emoji>
				<Text
					opacity={0.5}
					fontWeight={600}
					fontSize="2xl"
					letterSpacing="-0.05em"
					paddingLeft={2}
					paddingRight={1}
				>
					game dev fox girl
				</Text>
				<Text
					opacity={0.4}
					fontWeight={700}
					fontSize="md"
					letterSpacing="-0.05em"
					paddingRight={2}
				>
					she/they
				</Text>
				<Emoji>🏳️‍⚧️</Emoji>
				<Emoji>lesbian-flag</Emoji>
				{/* <Emoji>t4t-flag-better</Emoji>  */}
			</HStack>
			<chakra.a
				href="https://xn--3h8h64hda.ws"
				transformOrigin="center"
				transition="transform .15s ease-in-out"
				_hover={{ transform: "scale(1.05)" }}
				fontSize="xs"
				fontFamily='"Minecraft"'
				marginTop={1}
			>
				<HStack spacing={0.5} justifyContent="center">
					<Text opacity={0.3}>now available at www.</Text>
					<Emoji width={14} height={14} opacity={0.6}>
						🌺
					</Emoji>
					<Emoji width={14} height={14} opacity={0.6}>
						🦊
					</Emoji>
					<Emoji width={14} height={14} opacity={0.6}>
						🦋
					</Emoji>
					<Text opacity={0.3}>.ws!</Text>
				</HStack>
			</chakra.a>
			<HStack spacing={2} opacity={0.3} marginTop={8}>
				{socials.map((social, i) => (
					<chakra.a
						key={i}
						href={social.href}
						transition="transform .15s ease-in-out"
						transformOrigin="center"
						_hover={{ transform: "scale(1.1)" }}
					>
						<social.icon width={"auto"} height={24} />
					</chakra.a>
				))}
			</HStack>
			<chakra.a
				href="https://github.com/makifoxgirl/maki.cafe"
				transformOrigin="center"
				transition="transform .15s ease-in-out"
				_hover={{ transform: "scale(1.05)" }}
				marginTop={4}
			>
				<HStack spacing={2} opacity={0.2}>
					<GitHubIcon size={16} />
					<Text fontWeight={700}>See site&apos;s code</Text>
				</HStack>
			</chakra.a>
		</Flex>
	);
}
