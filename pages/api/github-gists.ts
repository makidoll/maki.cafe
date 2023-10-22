import type { NextApiRequest, NextApiResponse } from "next";
import { getBrowser } from "../../utils/api/playwright-browser";
import { RouterCache } from "../../utils/api/router-cache";
import { config } from "../../utils/config";

interface Snippet {
	url: string;
	name: string;
	description: string;
}

export type GithubGistsResponse = Snippet[];

const cache = new RouterCache<GithubGistsResponse>("github");

async function fetchGithubGists(): Promise<GithubGistsResponse> {
	const browser = await getBrowser();
	const page = await browser.newPage();

	// without /models, shows most popular
	await page.goto(config.socialLinks.githubGist, {
		waitUntil: "networkidle",
	});

	const snippetEls = await page.$$("div.gist-snippet > div:first-of-type");

	const snippets: GithubGistsResponse = [];

	for (const snippetEl of snippetEls) {
		const snippetText = await snippetEl.textContent();
		if (snippetText == null) continue;

		const lines = snippetText
			.split(config.socialIds.github)[1]
			.split("\n\n\n")[0]
			.trim()
			.split(/\n\s+\n\s+\n/)
			.map(l => l.trim());

		const name = config.socialIds.github + " " + lines[0];
		const description = lines[2];

		const aEl = await snippetEl.$("a:nth-child(1)");
		const url =
			"https://gist.github.com" + (await aEl?.getAttribute("href"));

		snippets.push({ url, name, description });
	}

	page.close();

	return snippets.slice(0, 8);
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<GithubGistsResponse>,
) {
	try {
		const data = await cache.get(fetchGithubGists);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: "something happened sorry" } as any);
		console.error(error);
	}
}
