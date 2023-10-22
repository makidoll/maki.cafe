import { Box, Center, Grid, GridItem, Link } from "@chakra-ui/react";
import Image from "next/image";
import useSWR from "swr";
import { FlickrResponse } from "../../pages/api/flickr";
import { swrFetcher } from "../../utils/api/swr-fetcher";
import { config } from "../../utils/config";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardFooterLink from "../ui/home-card/HomeCardFooterLink";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import HomeCardLoading from "../ui/home-card/HomeCardLoading";
import { FlickrIcon } from "../ui/social-icons/FlickrIcon";

export default function FlickrHomeCard() {
	const { data, error, isLoading } = useSWR<FlickrResponse>(
		"/api/flickr",
		swrFetcher,
	);

	if (isLoading || error || data == null) {
		return (
			<HomeCard>
				<HomeCardLoading />
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
					icon={FlickrIcon}
					href={config.socialLinks.flickr}
				>
					flickr
				</HomeCardHeading>
				<Grid
					templateColumns={"repeat(" + columns + ", 1fr)"}
					gap={1}
					mt={4}
				>
					{data.map((post, i) => (
						<GridItem
							key={i}
							transition={config.styles.hoverTransition}
							_hover={{
								transform: "scale(1.05)",
							}}
						>
							<Link href={post.link}>
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
										alt={post.title}
										src={post.media.m}
										fill={true}
										sizes={
											imageWidth * imageAspectRatio + "px"
										}
										style={{
											objectFit: "cover",
										}}
									/>
								</Box>
							</Link>
						</GridItem>
					))}
				</Grid>
				<HomeCardFooterLink href={config.socialLinks.flickr}>
					View more
				</HomeCardFooterLink>
			</Center>
		</HomeCard>
	);
}
