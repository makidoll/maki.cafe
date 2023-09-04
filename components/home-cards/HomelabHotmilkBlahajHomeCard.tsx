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
import { jetBrainsMono } from "../../fonts/fonts";
import { config } from "../../utils/config";
import { trpc } from "../../utils/trpc";
import OpenableImage from "../ui/OpenableImage";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import HomeCardLoading from "../ui/home-card/HomeCardLoading";
import blahajInside from "./homelab/blahaj-inside.jpg";
import blahajOutside from "./homelab/blahaj-outside.jpg";

export enum OlderHomelab {
	None,
	Cutelab_Blahaj_Nov_11_2022,
	Cutelab_Yeti_Feb_21_2022,
}

const colors = {
	green: "#689F38", // light green 700
	orange: "#FF9800", // orange 500
	red: "#F44336", // red 500
};

export default function HomelabHotmilkBlahajHomeCard(props: {
	onOlder: (type: OlderHomelab) => any;
}) {
	const uptimeRobot = trpc.uptimeRobot.all.useQuery();

	const What =
		uptimeRobot == null ? (
			<HomeCardLoading />
		) : (
			<>
				<chakra.table style={{ borderCollapse: "collapse" }}>
					<chakra.tbody>
						{uptimeRobot.data?.psp.monitors.map((service, i) => {
							const serviceLink =
								config.selfHostedLinkMap[service.name];

							const serviceTooltip =
								config.selfHostedLinkTooltipMap[service.name];

							const serviceLabel = (
								<Flex pr={3} pl={1}>
									{serviceLink == null ? (
										service.name
									) : (
										<Link
											href={serviceLink}
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
											{service.name}
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
											{service.dailyRatios
												.slice(0, 14)
												.reverse()
												.map((b, i) => (
													<Box
														key={i}
														w={1}
														h={4}
														borderRadius={999}
														backgroundColor={(() => {
															var ratio = Number(
																b.ratio,
															);
															switch (b.label) {
																case "success":
																	return colors.green;
																case "warning":
																	return ratio <
																		90
																		? colors.red
																		: colors.orange;
																default:
																case "black":
																	return "hsl(0deg,0%,25%)";
															}
														})()}
													></Box>
												))}
										</Flex>
									</chakra.td>
									<chakra.td>
										<Flex
											alignItems={"center"}
											justifyContent={"center"}
											gap={0.5}
											pl={3}
											pr={1}
										>
											<Box
												w={3}
												h={3}
												backgroundColor={
													service.statusClass ==
													"success"
														? colors.green
														: colors.red
												}
												borderRadius={999}
												mr={0.5}
											></Box>
											{service.statusClass == "success"
												? "Up"
												: "Down"}
										</Flex>
									</chakra.td>
								</chakra.tr>
							);
						})}
					</chakra.tbody>
				</chakra.table>
				<Flex
					backgroundColor={"brand.500"}
					fontFamily={jetBrainsMono.style.fontFamily}
					display={"inline-flex"}
					flexDir={"row"}
					mt={4}
					borderRadius={"999px"}
					overflow={"hidden"}
					fontWeight={500}
				>
					<Box px={1.5} py={0.5} fontWeight={800}>
						{uptimeRobot.data?.statistics.uptime.l90.ratio}% uptime
					</Box>
					<Link
						px={1.5}
						py={0.5}
						background={"#444"}
						color={"white"}
						href={config.socialLinks.homelabUptimeRobot}
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
						<chakra.span fontWeight={800}>
							July 27, 2023
						</chakra.span>
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
