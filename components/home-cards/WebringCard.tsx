import { Grid, GridItem, Image, Text, chakra } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import Link from "next/link";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import anonfilly from "./webring/anonfilly.png";
import parfait from "./webring/parfait.gif";
import yno from "./webring/yno.png";

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
				mt={3}
				opacity={0.4}
			>
				...will eventually make a button
			</Text>
		</HomeCard>
	);
}
