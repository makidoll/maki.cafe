import { Center, Flex, Link, Text } from "@chakra-ui/react";
import useSWR from "swr";
import { GithubGistsResponse } from "../../pages/api/github-gists";
import { swrFetcher } from "../../utils/api/swr-fetcher";
import { config } from "../../utils/config";
import HomeCard from "../ui/home-card/HomeCard";
import HomeCardFooterLink from "../ui/home-card/HomeCardFooterLink";
import HomeCardHeading from "../ui/home-card/HomeCardHeading";
import HomeCardLoading from "../ui/home-card/HomeCardLoading";
import { GitHubIcon } from "../ui/social-icons/GitHubIcon";

export default function GithubGistsHomeCard() {
	const { data, error, isLoading } = useSWR<GithubGistsResponse>(
		"/api/github-gists",
		swrFetcher,
	);

	if (isLoading || error || data == null) {
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
				{data.map((post, i) => (
					<Link
						key={i}
						mb={i == data.length - 1 ? 0 : 3}
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
