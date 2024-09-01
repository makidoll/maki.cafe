import { Box } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { config } from "../../utils/config";

export function Button(props: {
	children?: string;
	disabled?: boolean;
	onClick?: () => any;
	icon?: IconType;
}) {
	return (
		<Box
			background={"rgba(255,255,255,0.15)"}
			px={2}
			py={1}
			m={1}
			borderRadius={8}
			textAlign={"center"}
			fontWeight={700}
			cursor={props.disabled ? null : "pointer"}
			opacity={props.disabled ? 0.4 : 1}
			transition={config.styles.hoverTransition}
			transformOrigin={"center center"}
			_hover={{
				transform: props.disabled ? "" : "scale(1.05)",
			}}
			onClick={() => {
				if (props.disabled) return;
				props.onClick();
			}}
			userSelect={"none"}
			display={"flex"}
			alignItems={"center"}
			justifyContent={"center"}
			gap={1}
		>
			{props.icon ? <props.icon size={14} /> : <></>}
			{props.children ? <Box>{props.children}</Box> : <></>}
		</Box>
	);
}
