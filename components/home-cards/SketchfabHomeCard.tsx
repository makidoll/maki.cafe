import { Box, Center, Grid, GridItem, Link } from "@chakra-ui/react";
import Image from "next/image";
import { SketchfabData } from "../../data/sketchfab";
import { config } from "../../utils/config";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardFooterLink from "../ui/home-card/HomeCardFooterLink";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import { SketchfabIcon } from "../ui/social-icons/SketchfabIcon";
import HomeCardFailedToLoad from "../ui/home-card/HomeCardFailedToLoad";

export default function SketchfabHomeCard(props: { data: SketchfabData }) {
	if (props.data == null) {
		return (
			<HomeCard>
				<HomeCardFailedToLoad />
			</HomeCard>
		);
	}

	const columns = 4;
	const imageWidth = 80;
	const imageAspectRatio = 4 / 3;

	return (
		<HomeCard>
			<Center flexDir={"column"}>
				<HomeCardHeading
					icon={SketchfabIcon}
					href={config.socialLinks.sketchfab}
				>
					sketchfab
				</HomeCardHeading>
				<Grid
					templateColumns={"repeat(" + columns + ", 1fr)"}
					gap={1}
					mt={4}
				>
					{props.data.map((model, i) => (
						<GridItem key={i}>
							<Link href={model.url}>
								<Box
									width={imageWidth + "px"}
									height={
										imageWidth * (1 / imageAspectRatio) +
										"px"
									}
									overflow="hidden"
									borderRadius={4}
									position="relative"
								>
									<Image
										alt={model.alt}
										src={model.src}
										fill={true}
										sizes={
											imageWidth * imageAspectRatio + "px"
										}
										style={{ objectFit: "cover" }}
									/>
								</Box>
							</Link>
						</GridItem>
					))}
				</Grid>
				<HomeCardFooterLink href={config.socialLinks.sketchfab}>
					View more
				</HomeCardFooterLink>
			</Center>
		</HomeCard>
	);
}
