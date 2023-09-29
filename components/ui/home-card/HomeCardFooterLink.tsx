import { Flex, Text, Link, HStack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";

export default function HomeCardFooterLink(props: {
	href?: string;
	children?: string;
	multi?: {
		name: string;
		icon: IconType;
		url: string;
	}[];
}) {
	function makeButton(
		text: string,
		beforeIcon?: JSX.Element,
		afterIcon?: JSX.Element,
	) {
		return (
			<Flex
				width="100%"
				alignItems="center"
				justifyContent="center"
				opacity={0.4}
				mt={3}
				mb={-3}
			>
				{beforeIcon}
				<Text
					ml={beforeIcon == null ? 0 : 1.5}
					mr={afterIcon == null ? 0 : 1.5}
					fontWeight={500}
				>
					{text}
				</Text>
				{afterIcon}
			</Flex>
		);
	}

	if (props.multi != null) {
		return (
			<HStack spacing={6} justifyContent={"center"}>
				{props.multi.map((link, i) => (
					<Link key={i} href={link.url} textDecor="none" color="#fff">
						{makeButton(
							link.name,
							<link.icon size={18} color="#fff" />,
							undefined,
						)}
					</Link>
				))}
			</HStack>
		);
	}

	return (
		<Link href={props.href} textDecor="none" color="#fff">
			{makeButton(
				props.children as string,
				undefined,
				<FaArrowRight size={16} color="#fff" />,
			)}
		</Link>
	);
}
