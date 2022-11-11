import { Flex, Heading, HeadingProps, Link } from "@chakra-ui/react";
import { IconType } from "react-icons";

export default function HomeCardHeading(
	props: HeadingProps & { icon?: IconType; href?: string },
) {
	const mt = -2;

	const Icon = props.icon;
	const href = props.href;

	props = { ...props };
	delete props.icon;
	delete props.href;

	let H = (
		<Heading
			fontFamily={`'KG Always A Good Time', cursive`}
			fontWeight={400}
			fontSize={"24px"}
			textAlign={"center"}
			textTransform={"lowercase"}
			mt={Icon ? 0 : mt}
			mr={Icon ? 2 : 0}
			{...(props as any)}
		/>
	);

	if (Icon) {
		H = (
			<Flex flexDir={"row"} mt={mt}>
				{H}
				<Icon size={24} />
			</Flex>
		);
	}

	if (href) {
		H = (
			<Link
				color="#000"
				href={href}
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
