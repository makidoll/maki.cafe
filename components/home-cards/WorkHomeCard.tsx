import { Link, Text, VStack } from "@chakra-ui/react";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";

export default function WorkHomeCard() {
	return (
		<HomeCard>
			<VStack spacing={4}>
				<HomeCardHeading>stuff ive made</HomeCardHeading>
				{/* <Text textAlign="center">
					Currently working on new things with Unity.
				</Text>
				<Text textAlign="center">
					I&apos;ll update this with more info later.
				</Text>
				<Text textAlign="center">
					Oh, here&apos;s a thing:{" "}
					<Link href="https://blahaj.quest">
						https://blahaj.quest
					</Link>
				</Text> */}
			</VStack>
		</HomeCard>
	);
}
