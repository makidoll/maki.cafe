import { chakra, Flex, Text } from "@chakra-ui/react";
import { MdOpenInNew } from "react-icons/md";

export default function HomeCardFooterLink(props: {
	href?: string;
	children?: string;
}) {
	return (
		<chakra.a href={props.href} textDecor="none">
			<Flex
				width="100%"
				alignItems="center"
				justifyContent="center"
				opacity={0.4}
				mt={3}
				mb={-2}
			>
				<Text mr={1} fontWeight={500}>
					{props.children}
				</Text>
				<MdOpenInNew size={24} />
			</Flex>
		</chakra.a>
	);
}
