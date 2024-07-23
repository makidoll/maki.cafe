import {
	Box,
	Grid,
	GridItem,
	Image,
	Link,
	Text,
	chakra,
} from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import anonfilly from "./webring/anonfilly.png";
import parfait from "./webring/parfait.gif";
import yno from "./webring/yno.png";
import { config } from "../../utils/config";

export default function WebringCard() {
	const columns = 3;

	const buttons: { image: StaticImageData; url: string }[] = [
		{
			image: anonfilly,
			url: "https://anonfilly.horse",
		},
		{
			image: yno,
			url: "https://ynoproject.net",
		},
		{
			image: parfait,
			url: "https://parfaitcake.art",
		},
	];

	const others = ["https://pony.town", "http://wetmares.org"];

	return (
		<HomeCard>
			<HomeCardHeading mb={2}>webring</HomeCardHeading>
			<Text
				textAlign={"center"}
				fontSize={14}
				fontWeight={500}
				lineHeight={1.2}
				mb={3}
				opacity={0.8}
			>
				content warning for some of the sites
			</Text>
			<Grid templateColumns={"repeat(" + columns + ", 1fr)"} gap={2}>
				{buttons.map((button, i) => (
					<GridItem key={i}>
						<Link href={button.url}>
							<Image
								src={button.image.src}
								borderRadius={4}
								style={{ imageRendering: "pixelated" }}
								transition={config.styles.hoverTransition}
								_hover={{
									transform: `scale(1.05)`,
								}}
							/>
						</Link>
					</GridItem>
				))}
			</Grid>
			<Text
				textAlign={"center"}
				fontSize={14}
				fontWeight={500}
				lineHeight={1.2}
				mt={2}
				opacity={0.3}
			>
				...will eventually make a button
			</Text>
			<Text
				textAlign={"center"}
				fontSize={14}
				fontWeight={700}
				lineHeight={1.2}
				mt={4}
				mb={2}
				opacity={1}
			>
				other cute sites
			</Text>
			<Grid templateColumns="repeat(3, 1fr)" gap={2}>
				{others.map((url, i) => (
					<GridItem key={i}>
						<Link
							maxW={"88px"}
							minW={"88px"}
							h={6}
							borderRadius={8}
							lineHeight={1}
							fontSize={12}
							fontWeight={700}
							backgroundColor={"rgba(255,255,255,0.06)"}
							overflow={"hidden"}
							display={"flex"}
							alignItems={"center"}
							justifyContent={"center"}
							_hover={{
								transform: `scale(1.03)`,
							}}
							href={url}
							color={"white"}
							// textShadow={"2px 2px 0 rgba(0,0,0,0.1)"}
						>
							<Text opacity={0.5}>
								{url.replace(/^https?:\/\//i, "")}
							</Text>
						</Link>
					</GridItem>
				))}
			</Grid>
		</HomeCard>
	);
}
