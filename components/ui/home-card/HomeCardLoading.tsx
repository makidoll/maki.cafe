import { Spinner } from "@chakra-ui/react";

export default function HomeCardLoading() {
	return (
		<Spinner
			thickness="4px"
			speed="1s"
			emptyColor={`rgba(255,255,255,0.1)`}
			color={`rgba(255,255,255,0.2)`}
			size="xl"
			marginTop={4}
			marginBottom={3}
			marginX={12}
		/>
	);
}
