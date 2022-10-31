import { Box } from "@chakra-ui/react";

export default function Card(props: { children?: any }) {
	return (
		<Box shadow={"2xl"} borderRadius={16} padding={8}>
			{props.children}
		</Box>
	);
}
