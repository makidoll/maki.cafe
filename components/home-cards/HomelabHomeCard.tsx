import {
	Box,
	chakra,
	Flex,
	Link,
	ListItem,
	Text,
	UnorderedList,
	VStack,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { config } from "../../utils/config";
import { trpc } from "../../utils/trpc";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import OpenableImage from "../ui/OpenableImage";
import blahajInside from "./homelab/blahaj-inside.jpg";
import blahajRack from "./homelab/blahaj-rack.jpg";

const macMini = [["Say server", "https://say.cutelab.space"]];

const blahajMedia = [
	["qBittorrent", "https://www.qbittorrent.org"],
	["Radarr", "https://radarr.video/"],
	["Mullvad VPN", "https://mullvad.net/en"],
	["Emby", "https://emby.media"],
];

const blahajFiles = [
	["Samba", "https://github.com/ServerContainers/samba"],
	["Seafile", "https://seafile.com/"],
	[
		"Unity Accelerator",
		"https://hub.docker.com/r/unitytechnologies/accelerator",
	],
];

const blahajSocial = [
	["Synapse", "https://github.com/matrix-org/synapse"],
	["Mastodon", "https://mastodon.cutelab.space"],
	["Nitter", "https://nitter.cutelab.space"],
	["Bibliogram", "https://bibliogram.cutelab.space"],
	["Lanyard", "https://lanyard.cutelab.space"],
];

const blahajDev = [
	["Gitea", "https://gitea.io"],
	["Meli", "https://github.com/getmeli/meli"],
	["Tileserver GL", "https://github.com/maptiler/tileserver-gl"],
	["Traefik", "https://traefik.io/traefik"],
];

const blahajHome = [
	["Home Assistant", "https://www.home-assistant.io"],
	["Scrypted", "https://www.scrypted.app"],
	["Cutelab Squirrels", "https://squirrels.tivolicloud.com"],
	["Librespeed", "https://speedtest.cutelab.space"],
];

const blahajPersonal = [
	["Homer", "https://github.com/bastienwirtz/homer"],
	["FreshRSS", "https://freshrss.org"],
	["RSS Bridge", "https://github.com/RSS-Bridge/rss-bridge"],
	["Blåhaj Finder", "https://blahaj.quest"],
	["Grafana + Prometheus", "https://grafana.com"],
	["InvoiceNinja", "https://www.invoiceninja.com"],
	["Maki Upload", "https://maki.cafe/u"],
];

function linksToListItem(name: string, links: string[][]) {
	return (
		<ListItem>
			{name == "" ? "" : name + ": "}
			{links.map((link, i) => (
				<Fragment key={i}>
					<Link href={link[1]}>{link[0]}</Link>
					{i == links.length - 1 ? "" : ", "}
				</Fragment>
			))}
		</ListItem>
	);
}

export default function HomelabHomeCard() {
	const uptimeRobot = trpc.uptimeRobot.all.useQuery();

	return (
		<HomeCard>
			<Flex flexDir={"row"}>
				<VStack width="100px" mr={4}>
					<HomeCardHeading mt={0} mb={0}>
						homelab
					</HomeCardHeading>
					<Box
						borderRadius={4}
						overflow="hidden"
						w="100%"
						fontFamily={'"Azeret Mono", monospace'}
						fontSize="0.65em"
					>
						<Box
							background="#1d1f21"
							color="white"
							px={1.5}
							pt={1}
							pb={1}
							lineHeight={1.2}
						>
							{uptimeRobot.data ? (
								<>
									<chakra.span fontWeight={700}>
										{(
											(uptimeRobot.data?.uptime == 100
												? 99.9999
												: uptimeRobot.data?.uptime) ?? 0
										).toFixed(2)}
										%
									</chakra.span>{" "}
									uptime
									<br />
									<chakra.span fontWeight={700}>
										{uptimeRobot.data?.up}
									</chakra.span>{" "}
									up{" "}
									<chakra.span fontWeight={700}>
										{uptimeRobot.data?.down}
									</chakra.span>{" "}
									down
									<br />
								</>
							) : (
								"Loading..."
							)}
						</Box>
						<Link
							color="white"
							href={config.socialLinks.homelabUptimeRobot}
						>
							<Box
								background="brand.500"
								color="white"
								fontWeight={700}
								px={1.5}
								pt={1}
								pb={1.5}
								lineHeight={1.2}
							>
								See more here
							</Box>
						</Link>
					</Box>
					<OpenableImage
						width={100}
						image={blahajRack}
						alt="Blahaj Rack"
						borderRadius={4}
						transition={"transform .15s ease-in-out"}
						_hover={{
							transform: "scale(1.05)",
						}}
					></OpenableImage>
					<OpenableImage
						width={100}
						image={blahajInside}
						alt="Blahaj Inside"
						borderRadius={4}
						transition={"transform .15s ease-in-out"}
						_hover={{
							transform: "scale(1.05)",
						}}
					></OpenableImage>
				</VStack>
				<Box fontSize="0.65em" lineHeight={1.2} width="280px">
					<Text fontWeight={600}>
						Everything on this site is hosted here!
						<br />
						Last updated:{" "}
						<chakra.span fontWeight={800}>May 30, 2022</chakra.span>
						<br />
						<br />
					</Text>
					<Text>From top to bottom...</Text>
					<UnorderedList listStyleType={"disc"}>
						<ListItem>
							Protectli Vault 6 Port, i7 quad core
						</ListItem>
						<UnorderedList listStyleType={"circle"}>
							<ListItem fontStyle={"italic"}>
								Currently turned off. I&apos;ve been playing
								with OPNsense every once in a while
							</ListItem>
						</UnorderedList>
						<ListItem>Ubiquiti Dream Machine Pro</ListItem>
						<UnorderedList listStyleType={"circle"}>
							<ListItem>Network router and IPS</ListItem>
							<ListItem>
								NVR for 3 x G4 Pro cameras and a G3 Instant
							</ListItem>
						</UnorderedList>
						<ListItem>Ubiquiti Switch 16 PoE</ListItem>
						<ListItem>Mac Mini M1, 16 GB</ListItem>
						<UnorderedList listStyleType={"circle"}>
							<ListItem>Personal build server</ListItem>
							<ListItem>{linksToListItem("", macMini)}</ListItem>
						</UnorderedList>
						<ListItem>
							Blåhaj - Ryzen Threadripper 2970WX, 128 GB DDR4
							3200MHz, RTX 3060 Ti and GTX 1060
						</ListItem>
						<UnorderedList listStyleType={"circle"}>
							{linksToListItem("Social", blahajSocial)}
							{linksToListItem("Media", blahajMedia)}
							{linksToListItem("Files", blahajFiles)}
							{linksToListItem("Home", blahajHome)}
							{linksToListItem("Dev", blahajDev)}
							{linksToListItem("Personal", blahajPersonal)}
						</UnorderedList>
						<ListItem>
							CyberPower OR1500LCDRM1U UPS, 1500VA/900W
						</ListItem>
					</UnorderedList>
				</Box>
			</Flex>
		</HomeCard>
	);
}
