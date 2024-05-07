import { Box, Grid, GridItem, Link } from "@chakra-ui/react";
import useSWR from "swr";
import { SlMarketplaceResponse } from "../../pages/api/sl-marketplace";
import { swrFetcher } from "../../utils/api/swr-fetcher";
import { config } from "../../utils/config";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardFooterLink from "../ui/home-card/HomeCardFooterLink";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import HomeCardLoading from "../ui/home-card/HomeCardLoading";
import { SecondLifeIcon } from "../ui/social-icons/SecondLifeIcon";

const steamHorizontalAspectRatio = "700 / 525";

function MarketplaceItem(props: { item: { url: string; imageUrl: string } }) {
	return (
		<GridItem
			transition={config.styles.hoverTransition}
			_hover={{
				transform: "scale(1.05)",
			}}
		>
			<Link aria-label="Marketplace Item" href={props.item.url}>
				<Box
					borderRadius={12}
					sx={{
						imageRendering: "optimizeQuality",
						aspectRatio: steamHorizontalAspectRatio,
					}}
					// backgroundImage={slSpritesheet.src}
					// backgroundPosition={props.item.position}
					// backgroundRepeat={"no-repeat"}
					// backgroundSize={slMarketplaceInfo.cssSize}
					backgroundImage={props.item.imageUrl}
					backgroundPosition={"0 0"}
					backgroundSize={"100% 100%"}
				/>
			</Link>
		</GridItem>
	);
}

export default function SlMarketplaceHomeCard() {
	const { data, error, isLoading } = useSWR<SlMarketplaceResponse>(
		"/api/sl-marketplace",
		swrFetcher,
	);

	if (isLoading || error || data == null) {
		return (
			<HomeCard>
				<HomeCardLoading />
			</HomeCard>
		);
	}

	return (
		<HomeCard>
			<HomeCardHeading mb={4} icon={SecondLifeIcon}>
				second life marketplace
			</HomeCardHeading>
			<Grid templateColumns="repeat(3, 1fr)" gap={1} w={400} maxW={400}>
				{data.map((item, i) => (
					<MarketplaceItem item={item} key={i} />
				))}
			</Grid>
			<HomeCardFooterLink href={config.socialLinks.slMarketplace}>
				View more
			</HomeCardFooterLink>
		</HomeCard>
	);
}
