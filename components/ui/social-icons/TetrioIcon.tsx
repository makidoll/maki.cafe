import { IconBaseProps, IconType } from "react-icons";

export const TetrioIcon: IconType = (props: IconBaseProps) => (
	<svg
		viewBox="0 0 60 60"
		fill={props.color}
		width={props.size || "1em"}
		height={props.size || "1em"}
		{...props}
	>
		<path d="M0 0v10h10v10h10V10h10V0Zm41 12v9h-9v29h19v-9h9V12Zm-31 9v39h10V21Zm11 0v39h10V21Zm20.5.667h9v18.666h-9z" />
	</svg>
);
