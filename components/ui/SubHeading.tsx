import { Heading, HeadingProps } from "@chakra-ui/react";

export default function SubHeading(props: HeadingProps) {
	return (
		<Heading
			fontWeight={700}
			letterSpacing={"-0.05em"}
			{...(props as any)}
		/>
	);
}
