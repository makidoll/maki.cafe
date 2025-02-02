import { Flex, HStack, Link, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa6";

export default function HomeCardFooterLink(props: {
	href?: string;
	children?: string;
	multi?: {
		name: string;
		icon: IconType;
		url: string;
	}[];
	altIcon?: IconType;
	onClick?: () => any;
	mt?: number;
	mb?: number;
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
				mt={2}
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
			<HStack
				spacing={6}
				justifyContent={"center"}
				mt={props.mt}
				mb={props.mb}
			>
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
		<Link
			display={"block"}
			href={props.href}
			textDecor="none"
			color="#fff"
			onClick={props.onClick}
			mt={props.mt}
			mb={props.mb}
		>
			{makeButton(
				props.children as string,
				undefined,
				props.altIcon ? (
					<props.altIcon size={14} color="#fff" opacity={0.8} />
				) : (
					<FaArrowRight size={14} color="#fff" opacity={0.8} />
				),
			)}
		</Link>
	);
}
