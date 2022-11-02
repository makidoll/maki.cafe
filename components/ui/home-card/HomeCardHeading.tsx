import { Heading, HeadingProps } from "@chakra-ui/react";

export default function HomeCardHeading(props: HeadingProps) {
	return (
		<Heading
			fontFamily={`'KG Always A Good Time', cursive`}
			fontWeight={400}
			fontSize={"24px"}
			mt={-2}
			{...props}
		/>
	);
}
