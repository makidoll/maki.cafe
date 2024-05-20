import { Text } from "@chakra-ui/react";

export default function HomeCardFailedToLoad() {
	return (
		<Text opacity={0.25} marginTop={4} marginBottom={3} marginX={12}>
			{"failed to load :("}
		</Text>
	);
}
