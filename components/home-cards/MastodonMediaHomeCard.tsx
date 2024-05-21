import {
	Box,
	Center,
	Flex,
	Grid,
	GridItem,
	HStack,
	Link,
	Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { MastodonDataResponse } from "../../data/sources/mastodon";
import { config } from "../../utils/config";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardFailedToLoad from "../ui/home-card/HomeCardFailedToLoad";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import { MastodonIcon } from "../ui/social-icons/MastodonIcon";

export default function MastodonMediaHomeCard(props: {
	data: MastodonDataResponse;
}) {
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

	const socials = [
		// {
		// 	name: "Twitter",
		// 	url: config.socialLinks.twitter,
		// 	icon: TwitterIcon,
		// },
		{
			name: "Mastodon",
			url: config.socialLinks.mastodon,
			icon: MastodonIcon,
		},
	];

	return (
		<HomeCard>
			<Center flexDir={"column"}>
				<HomeCardHeading
					icon={MastodonIcon}
					href={config.socialLinks.mastodon + "/media"}
				>
					mastodon media
				</HomeCardHeading>
				<Grid
					templateColumns={"repeat(" + columns + ", 1fr)"}
					gap={1}
					mt={4}
				>
					{props.data.map((image, i) => (
						<GridItem
							key={i}
							transition={config.styles.hoverTransition}
							_hover={{
								transform: "scale(1.05)",
							}}
						>
							<Link href={image.url}>
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
										alt={""}
										src={image.image_url}
										fill={true}
										sizes={
											imageWidth * imageAspectRatio + "px"
										}
										style={{
											objectFit: "cover",
											filter: image.sensitive
												? "blur(12px)"
												: "",
										}}
									/>
								</Box>
							</Link>
						</GridItem>
					))}
				</Grid>
				<HStack spacing={6} justifyContent={"center"}>
					{socials.map((social, i) => (
						<Link
							key={i}
							href={social.url}
							textDecor="none"
							color="#fff"
						>
							<Flex
								width="100%"
								alignItems="center"
								justifyContent="center"
								opacity={0.4}
								mt={3}
								mb={-2}
							>
								<social.icon size={18} color="#fff" />
								<Text ml={1} fontWeight={500}>
									{social.name}
								</Text>
							</Flex>
						</Link>
					))}
				</HStack>
			</Center>
		</HomeCard>
	);
}
