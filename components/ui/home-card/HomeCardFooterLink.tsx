import { Flex, Text, Link } from "@chakra-ui/react";
import { MdOpenInNew } from "react-icons/md";

export default function HomeCardFooterLink(props: {
	href?: string;
	children?: string;
}) {
	return (
		<Link href={props.href} textDecor="none" color="#fff">
			<Flex
				width="100%"
				alignItems="center"
				justifyContent="center"
				opacity={0.4}
				mt={3}
				mb={-3}
			>
				<Text mr={1} fontWeight={500}>
					{props.children}
				</Text>
				<MdOpenInNew size={24} color="#fff" />
			</Flex>
		</Link>
	);
}
