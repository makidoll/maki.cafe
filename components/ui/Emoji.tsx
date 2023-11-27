import { chakra, ChakraProps } from "@chakra-ui/react";

import archLinuxEmoji from "./custom-emojis/arch-linux.png";
import babaDroneEmoji from "./custom-emojis/baba-drone.gif";
import babaIsEmoji from "./custom-emojis/baba-is.gif";
import babaEmoji from "./custom-emojis/baba.gif";
import bastionComfyEmoji from "./custom-emojis/bastion-comfy.png";
import blahajChocolateEmoji from "./custom-emojis/blahaj-chocolate.png";
import blahajPetPetEmoji from "./custom-emojis/blahaj-pet-pet.gif";
import blahajTransEmoji from "./custom-emojis/blahaj-trans.png";
import cyberHeartEmoji from "./custom-emojis/cyber-heart.gif";
import droneComfyEmoji from "./custom-emojis/drone-comfy.png";
import frogPogEmoji from "./custom-emojis/frog-pog.png";
import latexHeartEmoji from "./custom-emojis/latex-heart.png";
import lesbianFlagEmoji from "./custom-emojis/lesbian-flag.svg";
import maddyHeartEmoji from "./custom-emojis/maddy-heart.png";
import maddyHugEmoji from "./custom-emojis/maddy-hug.png";
import pleadingHypnoEmoji from "./custom-emojis/pleading-hypno.gif";
import shaderlabEmoji from "./custom-emojis/shaderlab.gif";
import t4tFlagBetterEmoji from "./custom-emojis/t4t-flag-better.svg";
import t4tFlagEmoji from "./custom-emojis/t4t-flag.svg";
import transHeartEmoji from "./custom-emojis/trans-heart.png";

const customEmojis = {
	"arch-linux": archLinuxEmoji,
	"baba-drone": babaDroneEmoji,
	"baba-is": babaIsEmoji,
	baba: babaEmoji,
	"bastion-comfy": bastionComfyEmoji,
	"blahaj-chocolate": blahajChocolateEmoji,
	"blahaj-pet-pet": blahajPetPetEmoji,
	"blahaj-trans": blahajTransEmoji,
	"cyber-heart": cyberHeartEmoji,
	"drone-comfy": droneComfyEmoji,
	"frog-pog": frogPogEmoji,
	"latex-heart": latexHeartEmoji,
	"lesbian-flag": lesbianFlagEmoji,
	"maddy-heart": maddyHeartEmoji,
	"maddy-hug": maddyHugEmoji,
	"pleading-hypno": pleadingHypnoEmoji,
	shaderlab: shaderlabEmoji,
	"t4t-flag-better": t4tFlagBetterEmoji,
	"t4t-flag": t4tFlagEmoji,
	"trans-heart": transHeartEmoji,
};

type CustomEmoji = keyof typeof customEmojis;

// https://unpkg.com/twemoji/dist/twemoji.js

function toCodePoint(unicodeSurrogates: string, sep: string = "-") {
	let r: string[] = [],
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
	return r.join(sep || "-");
}

export default function Emoji(
	props: {
		children?: string;
		custom?: CustomEmoji;
		size?: number;
		opacity?: number;
		font?: "twemoji" | "noto";
	} & ChakraProps,
) {
	const emoji = (props.children ?? "").trim();

	props = { ...props };
	delete props.children;

	let emojiUrl = "";

	if (props.custom != null) {
		const customEmoji = customEmojis[props.custom];
		if (customEmoji != null) emojiUrl = customEmoji.src;
	} else {
		if (props.font == null || props.font == "twemoji") {
			// "https://twemoji.maxcdn.com/v/14.0.2/svg/"
			emojiUrl =
				"https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/" +
				toCodePoint(emoji, "-") +
				".svg";
		} else if (props.font == "noto") {
			emojiUrl =
				// "https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/emoji_u" +
				"https://cdn.statically.io/gh/googlefonts/noto-emoji/main/svg/emoji_u" +
				toCodePoint(emoji, "_").replaceAll("_fe0f", "") +
				".svg";
		}
	}

	return (
		<chakra.img
			display="inline"
			// width={props.size ? props.size + "px" : "24px"}
			height={props.size ? props.size + "px" : "24px"}
			opacity={props.opacity ? props.opacity : 1}
			marginX="0.1em"
			marginBottom="-0.15em"
			src={emojiUrl}
			alt={emoji}
			{...props}
		/>
	);
}
