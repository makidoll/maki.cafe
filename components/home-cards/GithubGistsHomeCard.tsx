import { Box, Center, Flex, Link, Text } from "@chakra-ui/react";
import { config } from "../../utils/config";
import { trpc } from "../../utils/trpc";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import { GitHubIcon } from "../ui/social-icons/GitHubIcon";
import HomeCardFooterLink from "../ui/home-card/HomeCardFooterLink";
import HomeCardLoading from "../ui/home-card/HomeCardLoading";

export default function GithubGistsHomeCard() {
	const posts = trpc.githubGist.all.useQuery();

	if (!posts.data) {
		return (
			<HomeCard>
				<HomeCardLoading />
			</HomeCard>
		);
	}

	return (
		<HomeCard>
			<Center>
				<HomeCardHeading
					icon={GitHubIcon}
					href={config.socialLinks.githubGist}
					mb={4}
				>
					github gists
				</HomeCardHeading>
			</Center>
			<Flex flexDir={"column"} w={350}>
				{posts.data.map((post, i) => (
					<Link
						key={i}
						mb={i == posts.data.length - 1 ? 0 : 3}
						fontSize={11}
						lineHeight={1.1}
						color={"white"}
						href={post.url}
					>
						<Text color={"brand.500"}>{post.name}</Text>
						<Text>{post.description}</Text>
					</Link>
				))}
				<HomeCardFooterLink href={config.socialLinks.githubGist}>
					View more
				</HomeCardFooterLink>
			</Flex>
		</HomeCard>
	);
}
