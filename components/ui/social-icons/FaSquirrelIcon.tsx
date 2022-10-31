import { IconBaseProps, IconType } from "react-icons";

export const FaSquirrelIcon: IconType = (props: IconBaseProps) => (
	<svg
		viewBox="-10 0 532 512"
		fill={props.color}
		width={props.size || "1em"}
		height={props.size || "1em"}
		{...props}
	>
		<path d="M464 448h-15q29-29 30-64-1-20-14-37-14-17-34-24l1-99h48q16-1 25-12t6-27q-8-37-32-63-25-25-63-26V64q-35 2-57 37-21 35-32 71l-39 116V144q-2-61-42-102Q205 2 145 0 84 2 43 42 2 83 0 144q1 52 32 90t80 50q-16 32-16 71 3 68 51 112 49 43 117 45h232q14-1 16-16-1-20-14-34-14-13-34-14zm-49-288q2-15 15-16 15 1 16 16-1 15-15 16-14-1-16-16z" />
	</svg>
);
