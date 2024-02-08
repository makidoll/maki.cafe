import {
	ChakraComponent,
	Flex,
	FlexProps,
	Heading,
	HeadingProps,
	Link,
	LinkProps,
	chakra,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { kgAlwaysAGoodTime } from "../../../fonts/fonts";
import { config } from "../../../utils/config";

export default function HomeCardHeading(
	props: FlexProps & { icon?: IconType; href?: string },
) {
	const mt = -2;

	const Icon = props.icon;
	const href = props.href;
	const children = props.children;

	props = { ...props };
	delete props.icon;
	delete props.href;
	delete props.children;

	const linkProps = {
		href,
		color: "#fff",
		transition: config.styles.hoverTransition,
		transformOrigin: "center",
		_hover: {
			transform: "scale(1.05)",
		},
	};

	return (
		<Flex
			flexDir={"row"}
			width={"100%"}
			mt={mt}
			alignItems={"center"}
			justifyContent={"center"}
			as={href ? "a" : "div"}
			{...(href ? linkProps : {})}
			{...props}
		>
			{Icon ? <Icon size={24} color="#fff" /> : <></>}
			<Heading
				fontFamily={kgAlwaysAGoodTime.style.fontFamily}
				fontWeight={400}
				fontSize={"24px"}
				textAlign={"center"}
				textTransform={"lowercase"}
				ml={Icon ? 2 : 0}
				mt={0}
				mb={0}
			>
				{children}
			</Heading>
		</Flex>
	);
}
