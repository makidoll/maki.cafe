import { Center, HStack, Link, Text, VStack } from "@chakra-ui/react";
import Emoji from "./ui/Emoji";
import { AppleMusicIcon } from "./ui/social-icons/AppleMusicIcon";
import { DeadbeefIcon } from "./ui/social-icons/DeadbeefIcocn";
import { DiscordIcon } from "./ui/social-icons/DiscordIcon";
import { ElementAltIcon } from "./ui/social-icons/ElementAltIcon";
import { ElementIcon } from "./ui/social-icons/ElementIcon";
import { FaSquirrelIcon } from "./ui/social-icons/FaSquirrelIcon";
import { FlickrIcon } from "./ui/social-icons/FlickrIcon";
import { GitHubIcon } from "./ui/social-icons/GitHubIcon";
import { GitHubOcticonSquirrelIcon } from "./ui/social-icons/GitHubOcticonSquirrelIcon";
import { InstagramIcon } from "./ui/social-icons/InstagramIcon";
import { MfcIcon } from "./ui/social-icons/MfcIcon";
import { OsuIcon } from "./ui/social-icons/OsuIcon";
import { PlaystationIcon } from "./ui/social-icons/PlaystationIcon";
import { SkebIcon } from "./ui/social-icons/SkebIcon";
import { SoundCloudIcon } from "./ui/social-icons/SoundcloudIcon";
import { SpotifyIcon } from "./ui/social-icons/SpotifyIcon";
import { SteamIcon } from "./ui/social-icons/SteamIcon";
import { TwitterIcon } from "./ui/social-icons/TwitterIcon";

export default function Social() {
	return (
		<VStack spacing={1}>
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
			<Link
				href="https://xn--3h8h64hda.ws"
				textDecor="none"
				color="#000"
				fontSize="xs"
				fontFamily='"Minecraft"'
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
			</Link>
			<HStack spacing={2} opacity={0.3} paddingTop={6}>
				<Link href="https://discord.com/users/72139729285427200">
					<DiscordIcon width={"auto"} height={24} />
				</Link>
				<Link href="https://github.com/makifoxgirl">
					<GitHubIcon size={24} />
				</Link>
				<Link href="https://steamcommunity.com/id/makifoxgirl">
					<SteamIcon size={24} />
				</Link>
				<Link href="https://matrix.to/#/@maki:cutelab.space">
					<ElementAltIcon size={24} />
				</Link>
			</HStack>
			<Link
				paddingTop={4}
				href="https://github.com/makifoxgirl/maki.cafe"
			>
				<HStack spacing={2} opacity={0.2}>
					<GitHubIcon size={16} />
					<Text fontWeight={700}>See site's code</Text>
				</HStack>
			</Link>
		</VStack>
	);
}
