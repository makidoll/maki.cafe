import { HStack, Link, Text, VStack } from "@chakra-ui/react";
import Emoji from "./ui/Emoji";

export default function Social() {
	return (
		<VStack spacing={1}>
			<HStack spacing={1}>
				{/* <Emoji>🌺</Emoji>
				<Emoji>🦊</Emoji>
				<Emoji>🦋</Emoji> */}
				<Emoji>🦊</Emoji>
				<Emoji>🍃</Emoji>
				<Emoji>✨</Emoji>
				<Text
					opacity={0.5}
					fontWeight={700}
					fontSize="2xl"
					letterSpacing="-0.05em"
					paddingLeft={2}
					paddingRight={1}
				>
					game dev fox girl
				</Text>
				<Text
					opacity={0.4}
					fontWeight={700}
					fontSize="md"
					letterSpacing="-0.05em"
					paddingRight={2}
				>
					she/they
				</Text>
				<Emoji>🏳️‍⚧️</Emoji>
				<Emoji>lesbian-flag</Emoji>
				{/* <Emoji>t4t-flag-better</Emoji>  */}
			</HStack>
			<Link
				href="https://xn--3h8h64hda.ws"
				textDecor="none"
				color="#000"
				fontSize="xs"
				fontFamily='"Minecraft"'
			>
				<HStack spacing={0.5} justifyContent="center">
					<Text opacity={0.3}>now available at www.</Text>
					<Emoji width={14} height={14} opacity={0.6}>
						🌺
					</Emoji>
					<Emoji width={14} height={14} opacity={0.6}>
						🦊
					</Emoji>
					<Emoji width={14} height={14} opacity={0.6}>
						🦋
					</Emoji>
					<Text opacity={0.3}>.ws!</Text>
				</HStack>
			</Link>
			{/* <HStack>
				<p>hi</p>
			</HStack> */}
		</VStack>
	);
}
