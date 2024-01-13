import {
	Box,
	Flex,
	Grid,
	GridItem,
	HStack,
	Link,
	Text,
	VStack,
	chakra,
} from "@chakra-ui/react";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import blahajFinderImage from "./stuff-ive-made/blahaj-finder.png";
import hexcorpImage from "./stuff-ive-made/hexcorp.jpg";
import froggyBotImage from "./stuff-ive-made/froggy-bot.png";
import essenceBgImage from "./stuff-ive-made/essence-bg.png";
import melondsMetroidHuntersImage from "./stuff-ive-made/melonds-metroid-hunters.jpg";
import HomeCardFooterLink from "../ui/home-card/HomeCardFooterLink";
import { config } from "../../utils/config";
import { GitHubIcon } from "../ui/social-icons/GitHubIcon";
import { MastodonIcon } from "../ui/social-icons/MastodonIcon";
import { CodewarsIcon } from "../ui/social-icons/CodewarsIcon";

interface Thing {
	name: string;
	link: string;
	image: string;
	color: string;
	fontSize?: number;
}

export default function StuffIveMadeHomeCard() {
	const stuff: Thing[] = [
		{
			name: "blahaj\nfinder",
			link: "https://blahaj.quest",
			image: blahajFinderImage.src,
			color: "#3C8EA7",
		},
		{
			name: "froggy\nbot",
			link: "https://github.com/makidoll/frog-bot",
			image: froggyBotImage.src,
			color: "#B7D019",
		},
		{
			name: "mechanyx\ncoil\nlauncher",
			link: "https://mastodon.hotmilk.space/@maki/111502034093982672",
			image: essenceBgImage.src,
			color: "#393d4b",
			fontSize: 13,
		},
		{
			name: "melonds\nmetroid\nhunters",
			link: "https://github.com/makidoll/melonDS-Metroid-Hunters",
			image: melondsMetroidHuntersImage.src,
			color: "#872e0c",
			fontSize: 13,
		},
		{
			name: "hexdrone\nstatus\ncodes",
			link: "https://makidoll.github.io/hexdrone-status-codes/",
			image: hexcorpImage.src,
			color: "#ff64ff",
			fontSize: 13,
		},
	];

	const stuffThinner: (Thing | null)[] = [
		{
			name: "cloudflare ddns",
			link: "https://github.com/makidoll/cloudflare-ddns",
			image: "",
			color: "#333",
		},
		{
			name: "twinkly shaders",
			link: "https://github.com/makidoll/twinkly-shaders",
			image: "",
			color: "#333",
		},
		{
			name: "msa millenium lcd",
			link: "https://github.com/makidoll/msa-millenium-rp2040-touch-lcd",
			image: "",
			color: "#333",
		},
	];

	function makeButton(thing: Thing, i: number, thin = false) {
		return (
			<GridItem key={i}>
				<Link
					h={thin ? 6 : 12}
					borderRadius={8}
					lineHeight={1}
					fontSize={thing.fontSize ?? (thin ? 14 : 18)}
					fontWeight={700}
					backgroundImage={thing.image}
					backgroundColor={thing.image == "" ? thing.color : ""}
					backgroundPosition={"center"}
					backgroundSize={"cover"}
					backgroundRepeat={"no-repeat"}
					overflow={"hidden"}
					display={"flex"}
					flexDir={"row"}
					_hover={{
						transform: `scale(${thin ? 1.03 : 1.05})`,
					}}
					href={thing.link}
					color={"white"}
					textShadow={"2px 2px 0 rgba(0,0,0,0.1)"}
				>
					<Box w={1.5} h="100%" bg={thing.color} />
					<Box
						w="100%"
						h="100%"
						backgroundImage={`linear-gradient(90deg, ${thing.color}, transparent)`}
						display={"flex"}
						flexDir={"column"}
						justifyContent={"center"}
					>
						{thin
							? thing.name.replace(/\n/g, " ")
							: thing.name
									.split("\n")
									.map((t, i) => <Text key={i}>{t}</Text>)}
					</Box>
				</Link>
			</GridItem>
		);
	}

	return (
		<HomeCard>
			<HomeCardHeading mb={3}>stuff ive made</HomeCardHeading>
			<Text
				textAlign={"left"}
				fontSize={12}
				fontWeight={500}
				lineHeight={1.2}
				mb={3}
			>
				I&apos;m not good at making lists like this, so I recommend
				looking through my{" "}
				<chakra.span fontWeight={700}>Mastodon</chakra.span> or{" "}
				<chakra.span fontWeight={700}>GitHub</chakra.span> if you wanna
				see what I&apos; might be up to.
			</Text>
			<Grid templateColumns="repeat(4, 1fr)" gap={1} mb={1}>
				{stuff.map((thing, i) => makeButton(thing, i))}
			</Grid>
			<Grid templateColumns="repeat(2, 1fr)" gap={1}>
				{stuffThinner.map((thing, i) =>
					thing == null ? (
						<GridItem key={i} />
					) : (
						makeButton(thing, i, true)
					),
				)}
			</Grid>
			<Text
				textAlign={"center"}
				fontSize={12}
				fontWeight={500}
				lineHeight={1.2}
				mt={3}
				opacity={0.35}
			>
				i kinda keep to myself a lot now a days. im trying my best to
				add more!
			</Text>
			<HomeCardFooterLink
				multi={[
					{
						name: "Mastodon",
						url: config.socialLinks.mastodon,
						icon: MastodonIcon,
					},
					{
						name: "GitHub",
						url: config.socialLinks.github,
						icon: GitHubIcon,
					},
					{
						name: "Codewars",
						url: config.socialLinks.codewars,
						icon: CodewarsIcon,
					},
				]}
			/>
		</HomeCard>
	);
}
