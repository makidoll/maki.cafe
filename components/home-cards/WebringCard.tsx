import { Grid, GridItem, Image, Link, Text } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import { config } from "../../utils/config";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import anonfilly from "./webring/anonfilly.png";
import parfait from "./webring/parfait.gif";
import pea from "./webring/pea.png";
import yno from "./webring/yno.png";
import { FaGlobeAmericas } from "react-icons/fa";

interface Button {
	image?: StaticImageData;
	name?: string;
	url: string;
}

const columns = 3;

function Buttons(props: {
	title: string;
	buttons: Button[];
	mt?: string;
	mb?: string;
}) {
	return (
		<>
			<Text
				fontSize={20}
				fontWeight={700}
				lineHeight={1.2}
				mb={2}
				mt={props.mt}
			>
				{props.title}
			</Text>
			<Grid
				templateColumns={"repeat(" + columns + ", 1fr)"}
				gap={2}
				mb={props.mb}
			>
				{props.buttons.map((button, i) => (
					<GridItem key={i}>
						<Link
							minW={"88px"}
							maxW={"88px"}
							minH={"32px"}
							maxH={"32px"}
							borderRadius={4}
							backgroundColor={"rgba(255,255,255,0.06)"}
							overflow={"hidden"}
							display={"flex"}
							alignItems={"center"}
							justifyContent={"center"}
							_hover={{
								transform: `scale(1.05)`,
							}}
							href={button.url}
						>
							{button.image != null ? (
								<Image
									src={button.image.src}
									w={"100%"}
									h={"100%"}
									style={{ imageRendering: "pixelated" }}
								/>
							) : (
								<Text
									opacity={0.6}
									lineHeight={1}
									fontSize={12}
									fontWeight={700}
									color={"white"}
									// textShadow={"2px 2px 0 rgba(0,0,0,0.1)"}
								>
									{button.name}
								</Text>
							)}
						</Link>
					</GridItem>
				))}
			</Grid>
		</>
	);
}

export default function WebringCard() {
	const frens: Button[] = [
		{
			image: pea,
			url: "https://pea.moe",
		},
		{
			image: parfait,
			url: "https://parfaitcake.art",
		},
		{
			image: anonfilly,
			url: "https://anonfilly.horse",
		},
		{
			name: "ironsm4sh",
			url: "https://blog.ironsm4sh.nl",
		},
	];

	const other: Button[] = [
		{
			image: yno,
			url: "https://ynoproject.net",
		},
		{ name: "pony.town", url: "https://pony.town" },
		{ name: "wetmares.org", url: "http://wetmares.org" },
	];

	return (
		<HomeCard>
			<HomeCardHeading mb={2} icon={FaGlobeAmericas}>
				webring
			</HomeCardHeading>
			<Text
				textAlign={"center"}
				fontSize={14}
				fontWeight={500}
				lineHeight={1.2}
				opacity={0.8}
				mb={1}
			>
				content warning for some of the sites
			</Text>
			<Buttons title="frens" buttons={frens} />
			<Text
				textAlign={"center"}
				fontSize={14}
				fontWeight={500}
				lineHeight={1.2}
				mt={2}
				mb={2}
				opacity={0.4}
			>
				...will eventually make a button
			</Text>
			<Buttons title="other" buttons={other} />
		</HomeCard>
	);
}
