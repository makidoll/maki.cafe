import { Flex, Heading, HeadingProps, Link } from "@chakra-ui/react";
import { IconType } from "react-icons";

export default function HomeCardHeading(
	props: HeadingProps & { icon?: IconType; href?: string },
) {
	const mt = -2;

	let H = (
		<Heading
			fontFamily={`'KG Always A Good Time', cursive`}
			fontWeight={400}
			fontSize={"24px"}
			textAlign={"center"}
			textTransform={"lowercase"}
			mt={props.icon ? 0 : mt}
			mr={props.icon ? 2 : 0}
			{...(props as any)}
		/>
	);

	if (props.icon) {
		H = (
			<Flex flexDir={"row"} mt={mt}>
				{H}
				<props.icon size={24} />
			</Flex>
		);
	}

	if (props.href) {
		H = (
			<Link
				color="#000"
				href={props.href}
				transition="transform .15s ease-in-out"
				transformOrigin="center"
				_hover={{ transform: "scale(1.05)" }}
			>
				{H}
			</Link>
		);
	}

	return H;
}
