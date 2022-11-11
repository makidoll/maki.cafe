import { Box, Center, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { config } from "../../utils/config";
import { trpc } from "../../utils/trpc";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardFooterLink from "../ui/home-card/HomeCardFooterLink";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import HomeCardLoading from "../ui/home-card/HomeCardLoading";
import { FlickrIcon } from "../ui/social-icons/FlickrIcon";

export default function FlickrHomeCard() {
	// const [posts, setPosts] = useState<Post[]>([]);
	const posts = trpc.flickr.all.useQuery();

	if (!posts.data) {
		return (
			<HomeCard>
				<HomeCardLoading />
			</HomeCard>
		);
	}

	return (
		<HomeCard>
			<Center flexDir={"column"}>
				<HomeCardHeading
					icon={FlickrIcon}
					href={config.socialLinks.flickr}
				>
					flickr
				</HomeCardHeading>
				<Grid templateColumns={"repeat(4, 1fr)"} gap={1} mt={4}>
					{posts.data.map((post, i) => (
						<GridItem key={i}>
							<Box
								w={80 + "px"}
								h={80 * (3 / 4) + "px"}
								backgroundPosition="center"
								backgroundImage={post.media.m}
								backgroundSize="cover"
								backgroundRepeat="no-repeat"
								borderRadius={4}
							></Box>
						</GridItem>
					))}
				</Grid>
			</Center>
		</HomeCard>
	);
}
