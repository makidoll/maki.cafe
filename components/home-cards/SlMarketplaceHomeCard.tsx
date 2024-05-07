import { Box, Grid, GridItem, Link } from "@chakra-ui/react";
import { config } from "../../utils/config";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardFooterLink from "../ui/home-card/HomeCardFooterLink";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import { SecondLifeIcon } from "../ui/social-icons/SecondLifeIcon";
import { slMarketplaceInfo } from "./sl-info";
import slSpritesheet from "./sl-spritesheet.png";

const steamHorizontalAspectRatio = "700 / 525";

function MarketplaceItem(props: { item: { url: string; position: string } }) {
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
					backgroundImage={slSpritesheet.src}
					backgroundPosition={props.item.position}
					backgroundRepeat={"no-repeat"}
					backgroundSize={slMarketplaceInfo.cssSize}
				/>
			</Link>
		</GridItem>
	);
}

export default function SlMarketplaceHomeCard() {
	return (
		<HomeCard>
			<HomeCardHeading mb={4} icon={SecondLifeIcon}>
				second life marketplace
			</HomeCardHeading>
			<Grid templateColumns="repeat(3, 1fr)" gap={1} w={400} maxW={400}>
				{slMarketplaceInfo.items.map((item, i) => (
					<MarketplaceItem item={item} key={i} />
				))}
			</Grid>
			<HomeCardFooterLink href={config.socialLinks.slMarketplace}>
				View more
			</HomeCardFooterLink>
		</HomeCard>
	);
}
