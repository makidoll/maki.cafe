import {
	Box,
	Flex,
	Link,
	Text,
	Tooltip,
	VStack,
	chakra,
} from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";
import useSWR from "swr";
import { UptimeResponse, UptimeStatus } from "../../pages/api/uptime";
import { swrFetcher } from "../../utils/api/swr-fetcher";
import { config } from "../../utils/config";
import OpenableImage from "../ui/OpenableImage";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import HomeCardLoading from "../ui/home-card/HomeCardLoading";
import blahajInside from "./homelab/blahaj-inside.jpg";
import blahajOutside from "./homelab/blahaj-outside-2.jpg";

export enum OlderHomelab {
	None,
	Cutelab_Blahaj_Nov_11_2022,
	Cutelab_Yeti_Feb_21_2022,
}

const statusColorMap: { [status in UptimeStatus]: string } = {
	[UptimeStatus.Online]: "#689F38", // light green 700
	// [orange]: "#FF9800", // orange 500
	[UptimeStatus.Offline]: "#F44336", // red 500
	[UptimeStatus.None]: "hsl(0deg,0%,25%)",
};

const statusLabelMap: { [status in UptimeStatus]: string } = {
	[UptimeStatus.Online]: "Up",
	[UptimeStatus.Offline]: "Down",
	[UptimeStatus.None]: "Unknown",
};

export default function HomelabHotmilkBlahajHomeCard(props: {
	onOlder: (type: OlderHomelab) => any;
}) {
	const { data, error, isLoading } = useSWR<UptimeResponse>(
		"/api/uptime",
		swrFetcher,
	);

	const What =
		isLoading || error || data == undefined ? (
			<HomeCardLoading />
		) : (
			<>
				<chakra.table style={{ borderCollapse: "collapse" }}>
					<chakra.tbody>
						{data.map((monitor, i) => {
							const serviceTooltip =
								config.selfHostedLinkTooltipMap[monitor.name];

							const serviceLabel = (
								<Flex pr={3} pl={1}>
									{monitor.url == null ? (
										monitor.name
									) : (
										<Link
											href={monitor.url}
											display={"flex"}
											flexDir={"row"}
											alignItems={"center"}
											color={"#fff"}
										>
											<MdArrowForward
												size={12}
												style={{
													marginRight: "2px",
												}}
											/>
											{monitor.name}
										</Link>
									)}
								</Flex>
							);

							return (
								<chakra.tr
									key={i}
									backgroundColor={
										i % 2 == 1
											? "rgba(255,255,255,0.05)"
											: "transparent"
									}
								>
									<chakra.td>
										{serviceTooltip == null ? (
											serviceLabel
										) : (
											<Tooltip label={serviceTooltip}>
												{serviceLabel}
											</Tooltip>
										)}
									</chakra.td>
									<chakra.td>
										<Flex
											color={"#fff"}
											alignItems={"center"}
											justifyContent={"center"}
											gap={0.5}
										>
											{monitor.heartbeat
												.slice(-14)
												.map((status, i) => (
													<Box
														key={i}
														w={1}
														h={3.5}
														borderRadius={999}
														backgroundColor={
															statusColorMap[
																status
															]
														}
													></Box>
												))}
										</Flex>
									</chakra.td>
									<chakra.td>
										<Flex
											alignItems={"center"}
											justifyContent={"flex-start"}
											gap={0.5}
											pl={1}
											pr={1}
											textAlign={"center"}
										>
											<Box
												w={3}
												h={3}
												backgroundColor={
													statusColorMap[
														monitor.heartbeat[
															monitor.heartbeat
																.length - 1
														]
													]
												}
												borderRadius={999}
												mr={0.5}
											></Box>
											{
												statusLabelMap[
													monitor.heartbeat[
														monitor.heartbeat
															.length - 1
													]
												]
											}{" "}
											<chakra.span opacity={0.5} pl="1">
												(
												{monitor.uptime24h == 1
													? 100
													: (
															monitor.uptime24h *
															100
													  ).toFixed(1)}
												%)
											</chakra.span>
										</Flex>
									</chakra.td>
								</chakra.tr>
							);
						})}
					</chakra.tbody>
				</chakra.table>
				<Flex
					backgroundColor={"brand.500"}
					fontFamily={"var(--chakra-fonts-monospace)"}
					display={"inline-flex"}
					flexDir={"row"}
					mt={4}
					borderRadius={"999px"}
					overflow={"hidden"}
					fontWeight={500}
				>
					<Box px={2} py={0.5} pb={1} fontWeight={800}>
						{(
							(data.reduce(
								(prev, curr) => prev + curr.uptime24h,
								0,
							) /
								data.length) *
							100
						).toFixed(2)}
						% uptime
					</Box>
					<Link
						px={2}
						py={0.5}
						pb={1}
						background={"#444"}
						color={"white"}
						href={config.socialLinks.uptime}
					>
						See more here
					</Link>
				</Flex>
			</>
		);

	return (
		<HomeCard>
			<Flex flexDir={"row"}>
				<VStack width="100px" mr={4}>
					<HomeCardHeading mt={-1.5} mb={0}>
						<chakra.span fontSize={14}>hotmilk blahaj</chakra.span>{" "}
						homelab
					</HomeCardHeading>
					<Box
						borderRadius={4}
						overflow="hidden"
						transition={config.styles.hoverTransition}
						_hover={{
							transform: "scale(1.05)",
						}}
					>
						<OpenableImage
							src={blahajOutside}
							alt="Blahaj Outside"
						></OpenableImage>
					</Box>
					<Box
						borderRadius={4}
						overflow="hidden"
						transition={config.styles.hoverTransition}
						_hover={{
							transform: "scale(1.05)",
						}}
					>
						<OpenableImage
							src={blahajInside}
							alt="Blahaj Inside"
						></OpenableImage>
					</Box>
				</VStack>
				<Box fontSize="0.65em" lineHeight={1.2}>
					<Text fontWeight={600}>
						Everything on this site is hosted here!
						<br />
						Last updated:{" "}
						<chakra.span fontWeight={800}>Feb 11, 2024</chakra.span>
						<br />
						<br />
						Older homelab:
					</Text>
					<Flex flexDir={"column"}>
						<Link
							onClick={() =>
								props.onOlder(
									OlderHomelab.Cutelab_Blahaj_Nov_11_2022,
								)
							}
						>
							<MdArrowForward
								size={16}
								style={{
									display: "inline",
									verticalAlign: "middle",
									marginRight: "4px",
									marginLeft: "-4px",
								}}
							/>
							Cutelab Blahaj (Nov 11, 2022)
						</Link>
						<Link
							onClick={() =>
								props.onOlder(
									OlderHomelab.Cutelab_Yeti_Feb_21_2022,
								)
							}
						>
							<MdArrowForward
								size={16}
								style={{
									display: "inline",
									verticalAlign: "middle",
									marginRight: "4px",
									marginLeft: "-4px",
								}}
							/>
							Cutelab Yeti (Feb 21, 2022)
						</Link>
					</Flex>
					<br />
					{What}
				</Box>
			</Flex>
		</HomeCard>
	);
}
