import { Heading, HeadingProps } from "@chakra-ui/react";

export default function SubHeading(props: HeadingProps) {
	return (
		<Heading
			fontFamily={`'Inter', sans-serif`}
			fontWeight={700}
			letterSpacing={"-0.05em"}
			{...(props as any)}
		/>
	);
}
