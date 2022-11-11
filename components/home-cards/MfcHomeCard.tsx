import {
	Box,
	Center,
	Grid,
	GridItem,
	HStack,
	Link,
	Text,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { config } from "../../utils/config";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import { MfcIcon } from "../ui/social-icons/MfcIcon";
import { mfcData } from "./mfc-info";
import mfcSpritesheet from "./mfc-spritesheet.jpg";

export default function MfcHomeCard() {
	const colors = {
		owned: "#8bc34a",
		ordered: "#ffc107",
		wished: "#ff8a65",
	};

	return (
		<HomeCard>
			<Center flexDir={"column"}>
				<HomeCardHeading
					mr={3}
					icon={MfcIcon}
					href={config.socialLinks.mfc}
				>
					my figure collection
				</HomeCardHeading>
				<HStack mt={4}>
					{Object.keys(colors).map((type, i, arr) => (
						<Fragment key={i}>
							<Box
								w={3}
								h={3}
								borderRadius={999}
								background={colors[type]}
								mt={0.5}
							></Box>
							<Text color={colors[type]}>{type}</Text>
							{i < arr.length - 1 ? <Box px={1}></Box> : <></>}
						</Fragment>
					))}
				</HStack>
				<Grid templateColumns={"repeat(7, 1fr)"} gap={2} mt={4}>
					{mfcData.map((figure, i) => (
						<GridItem key={i}>
							<Link href={figure.link}>
								<Box
									w={45}
									h={45}
									borderRadius={4}
									border="2px solid white"
									boxShadow={
										"0 0 0 2px " + colors[figure.type]
									}
									sx={{ imageRendering: "optimizeQuality" }}
									backgroundSize={"600% 400%"}
									backgroundImage={mfcSpritesheet.src}
									backgroundPosition={figure.position}
									transition="transform .15s ease-in-out"
									_hover={{ transform: "scale(1.05)" }}
								></Box>
							</Link>
						</GridItem>
					))}
				</Grid>
			</Center>
		</HomeCard>
	);
}
