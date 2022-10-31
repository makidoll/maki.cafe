import { Box, Flex } from "@chakra-ui/react";

export default function HomeCard(props: { children?: any }) {
	return (
		<Flex width={450} alignItems="center" justifyContent="center">
			<Box
				boxShadow="0 0 64px #0000001a,0 0 32px #0000001a"
				borderRadius={16}
				padding={6}
				display="inline-block"
			>
				{props.children}
			</Box>
		</Flex>
	);
}
