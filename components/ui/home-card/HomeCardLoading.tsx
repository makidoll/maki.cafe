import { Spinner } from "@chakra-ui/react";

export default function HomeCardLoading() {
	return (
		<Spinner
			thickness="4px"
			speed="1s"
			emptyColor="gray.200"
			color="gray.400"
			size="xl"
			marginTop={4}
			marginBottom={3}
			marginX={12}
		/>
	);
}
