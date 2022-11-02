import { chakra, ChakraProps } from "@chakra-ui/react";
import lesbianFlag from "./custom-emojis/lesbian-flag.svg";
import t4tFlagBetter from "./custom-emojis/t4t-flag-better.svg";
import t4tFlag from "./custom-emojis/t4t-flag.svg";

const customEmojis: { [key: string]: { src: string } } = {
	"lesbian-flag": lesbianFlag,
	"t4t-flag": t4tFlag,
	"t4t-flag-better": t4tFlagBetter,
};

// https://twemoji.maxcdn.com/v/latest/twemoji.js
function toCodePoint(unicodeSurrogates: string, sep: string = "-") {
	let r = [],
		c = 0,
		p = 0,
		i = 0;
	while (i < unicodeSurrogates.length) {
		c = unicodeSurrogates.charCodeAt(i++);
		if (p) {
			r.push(
				(0x10000 + ((p - 0xd800) << 10) + (c - 0xdc00)).toString(16),
			);
			p = 0;
		} else if (0xd800 <= c && c <= 0xdbff) {
			p = c;
		} else {
			r.push(c.toString(16));
		}
	}
	return r.join(sep);
}

export default function Emoji(
	props: {
		children?: string;
		size?: number;
		opacity?: number;
	} & ChakraProps,
) {
	const emoji = props.children ?? "";

	props = { ...props };
	delete props.children;

	const customEmoji = customEmojis[emoji];

	return (
		<chakra.img
			display="inline"
			width={props.size ? props.size + "px" : "24px"}
			height={props.size ? props.size + "px" : "24px"}
			opacity={props.opacity ? props.opacity : 1}
			marginX="0.1em"
			marginBottom="-0.15em"
			src={
				customEmoji != null
					? customEmoji.src
					: "https://twemoji.maxcdn.com/v/latest/svg/" +
					  toCodePoint(emoji, "-") +
					  ".svg"
			}
			alt={emoji}
			{...props}
		/>
	);
}
