import { IconBaseProps, IconType } from "react-icons";
import shaderToyIconImage from "./shadertoy-gray-32.png";

export const ShaderToyIcon: IconType = (props: IconBaseProps) => (
	<img
		src={shaderToyIconImage.src}
		width={props.size || "1em"}
		height={props.height || "1em"}
		// {...props}
	/>
);
