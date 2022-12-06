import { IconBaseProps, IconType } from "react-icons";

export const SketchfabIcon: IconType = (props: IconBaseProps) => (
	<svg
		viewBox="0 0 2000 2000"
		fill={props.color}
		width={props.size || "1em"}
		height={props.size || "1em"}
		{...props}
	>
		<path d="m1000 0c-552.32 0-1000 447.72-1000 1000s447.68 1000 1000 1000 1000-447.72 1000-1000-447.6-1000-1000-1000zm-86.88 1595.07-431.12-248.86v-502l431.12 232.79zm76.8-636.19-510.08-270.38 510.08-294.5 510.16 294.5zm510.48 388.29-429.52 248v-516.17l429.52-232z" />
	</svg>
);
