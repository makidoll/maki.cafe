import { Box, Center, Grid, GridItem, Link } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { config } from "../../utils/config";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardFooterLink from "../ui/home-card/HomeCardFooterLink";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import HomeCardLoading from "../ui/home-card/HomeCardLoading";
import { MastodonIcon } from "../ui/social-icons/MastodonIcon";

interface MastodonStatus {
	content: string;
	created_at: string;
	emojis: { shortcode: string; url: string }[];
	account: {
		acct: string;
		avatar: string;
		display_name: string;
	};
	url: string;
	media_attachments: {
		url: string;
		preview_url: string;
		type: "image";
	}[];
}

interface Image {
	url: string;
	image_url: string;
}

export default function MastodonMediaHomeCard() {
	const [images, setImages] = useState<Image[]>();

	useEffect(() => {
		// https://docs.joinmastodon.org/methods/accounts/#statuses

		const statusesUrl = new URL(
			"https://mastodon.hotmilk.space/api/v1/accounts/110755825766915676/statuses",
		);

		statusesUrl.searchParams.set("pinned", "false");
		statusesUrl.searchParams.set("only_media", "true");
		statusesUrl.searchParams.set("exclude_replies", "true");
		statusesUrl.searchParams.set("exclude_reblogs", "true");

		axios<MastodonStatus[]>(statusesUrl.href)
			.then(res => {
				const images: Image[] = [];

				for (const status of res.data) {
					for (const media_attachment of status.media_attachments) {
						if (media_attachment.type != "image") continue;

						images.push({
							url: status.url,
							image_url: media_attachment.preview_url,
						});
					}
				}

				setImages(images.slice(0, 20));
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	if (images == null) {
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
					icon={MastodonIcon}
					href={config.socialLinks.mastodon}
				>
					mastodon media
				</HomeCardHeading>
				<Grid
					templateColumns={"repeat(" + columns + ", 1fr)"}
					gap={1}
					mt={4}
				>
					{images.map((image, i) => (
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
